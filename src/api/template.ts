import { query, collection, where, documentId, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IProduct, IWidget } from 'src/types/product';
// types
import { ITemplate } from 'src/types/templates';
import { sortByOrder, updateOrder } from 'src/utils/apiUtils';
import { GetProducts } from './product/productGet';
import { FIRESTORE } from 'src/lib/firebase';
// ----------------------------------------------------------------------

type GetTemplates = {
  templates: ITemplate[];
  templatesLoading: boolean;
  templatesError: string;
  templatesEmpty: boolean;
};

type GetTemplate = {
  template: ITemplate;
  templateLoading: boolean;
  templateError: string;
  templateEmpty: boolean;
};

const InitialGetTemplate: GetTemplate = {
  template: {
    id: '',
    name: '',
    createdAt: '',
    createdBy: '',
    industry: '',
    changeProduct: '',
    tempChangeAt: '',
    products: [],
    pass: {
      mode: '',
      widgets: [],
      design: {
        style: {
          general: {
            topButton: true,
            widgetSpacing: 'S',
            spacing: 'S'
          },
          buttons: {
            variant: '',
            size: '',
            textColor: '',
            buttonColor: '',
          },
          cards: {
            cardDesign: true,
            borderradius: 0,
            color: '',
          },
          icons: {
            showIcons: true,
            iconColor: '',
            showSubIcons: true,
            subIconColor: '',
          },
          colors: {
            primaryColor: '',
            secondaryColor: '',
            backgroundColor: '',
            generalTextColor: '',
            elementsColor: '',
          },
        },
        typography: {
          headlines: {
            font: '',
            weight: '',
            color: '',
            size: '',
          },
          paragraphs: {
            font: '',
            weight: '',
            color: '',
            size: '',
          },
          tags: {
            font: '',
            weight: '',
            color: '',
            tagColor: '',
          },
          table: {
            font: '',
            weight: '',
            color: '',
          },
        },
      },
    },
  },
  templateLoading: true,
  templateError: '',
  templateEmpty: false,
};

export function useGetTemplates(compId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetTemplates>({
    templates: [],
    templatesLoading: true,
    templatesError: '',
    templatesEmpty: false,
  });
  const [templateValues, loading, error] = useCollectionData(
    compId
      ? query(
          collection(FIRESTORE, 'templates'),
          where('__name__', '>=', compId),
          where('__name__', '<=', `${compId}\uf8ff`)
        )
      : null
  );
  useEffect(() => {
    setMemoizedValue({
      templates: (templateValues as ITemplate[]) || [],
      templatesLoading: loading,
      templatesError: error?.message || '',
      templatesEmpty: !loading && !templateValues?.length,
    });
  }, [templateValues, loading, error]);

  return memoizedValue;
}

export function useGetTemplateWidgets(template: ITemplate) {
  const [memoizedValue, setMemoizedValue] = useState<GetTemplate>(InitialGetTemplate);
  const [widgetValues, loading, error] = useCollectionData(
    template.id
      ? query(
          collection(FIRESTORE, 'templateWidgets'),
          where('__name__', '>=', template.id),
          where('__name__', '<=', `${template.id}\uf8ff`)
        )
      : null
  );
  if (widgetValues && template?.pass?.widgets) {
    sortByOrder(widgetValues);
    template.pass.widgets = widgetValues as IWidget[];
  }
  useEffect(() => {
    setMemoizedValue({
      template: (template as ITemplate) || {},
      templateLoading: loading,
      templateError: error?.message || '',
      templateEmpty: !loading && !template,
    });
  }, [template, loading, error]);

  return memoizedValue;
}

export function useGetTemplateId(templateId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetTemplate>(InitialGetTemplate);
  const [values, loading, error] = useCollectionData(
    templateId
      ? query(collection(FIRESTORE, 'templates'), where(documentId(), '==', templateId))
      : null
  );
  useEffect(() => {
    setMemoizedValue({
      template: (values?.[0] as ITemplate) || {},
      templateLoading: loading,
      templateError: error?.message || '',
      templateEmpty: !loading && !values?.length,
    });
  }, [values, loading, error]);

  return memoizedValue;
}

export function useGetProductsTemp(tempId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetProducts>({
    products: [],
    productsLoading: true,
    productsError: '',
    productsEmpty: false,
  });
  const [productValues, loading, error] = useCollectionData(
    tempId
      ? query(
          collection(FIRESTORE, 'products'),
          where('templateId', '==', tempId),
        )
      : null
  );
  // After retrieving the products, filter out the archived ones

  useEffect(() => {
    const filteredProductValues = productValues
      ? productValues.filter((product) => product.archived !== 'X')
      : [];
    setMemoizedValue({
      products: (filteredProductValues as IProduct[]) || [],
      productsLoading: loading,
      productsError: error?.message || '',
      productsEmpty: !loading && !filteredProductValues?.length,
    });
  }, [productValues, loading, error]);

  return memoizedValue;
}

// ----------------------------------------------------------------------


export async function setTemplate(product: IProduct, template: ITemplate): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  const prodWidgets: IWidget[] = [...product.pass.widgets];
  productCol.img = '';
  const img = prodWidgets.find((element) => element.name === 'ProductHead')?.childs[0].attributes.ProductPicture.value[0];
  if (img) {
    if (img.val[0]){
      productCol.img = img.val[0];
    }
  }
  const tempCol: ITemplate = { ...template };
  const tempWidgets: IWidget[] = [...template.pass.widgets];
  updateOrder(prodWidgets);
  updateOrder(tempWidgets);
  productCol.pass.widgets.length = 0;
  tempCol.pass.widgets.length = 0;

  try {
    // Set product
    const docu = doc(FIRESTORE, 'products', product.id);
    await setDoc(docu, productCol);
    // Delete product widgets
    const widgetsQuery = query(
      collection(FIRESTORE, 'productWidgets'),
      where('__name__', '>=', product.id),
      where('__name__', '<=', `${product.id}\uf8ff`)
    );
    await getDocs(widgetsQuery).then((querySnapshot) => {
      querySnapshot.docs.map(snapshotDoc => deleteDoc(snapshotDoc.ref));
    });
    await Promise.all(prodWidgets.map(async (prodWidget) => {
      const docum = doc(FIRESTORE, 'productWidgets', product.id + prodWidget.id);
      await setDoc(docum, prodWidget);
    }));

    // Set template
    const docume = doc(FIRESTORE, 'templates', template.id);
    await setDoc(docume, tempCol);
    // Delete Template widgets
    const tempQuery = query(
      collection(FIRESTORE, 'templateWidgets'),
      where('__name__', '>=', template.id),
      where('__name__', '<=', `${template.id}\uf8ff`)
    );
    await getDocs(tempQuery).then((querySnapshot) => {
      querySnapshot.docs.map(snapshotDoc => deleteDoc(snapshotDoc.ref));
    });
    await Promise.all(tempWidgets.map(async (tempWidget) => {
      const documen = doc(FIRESTORE, 'templateWidgets', template.id + tempWidget.id);
      await setDoc(documen, tempWidget);
    }));

    // If all operations are successful
    return ['', false];  // No error, loading false
  } catch (fbError:any) {
    console.log(fbError);
    return [fbError.message || 'An error occurred', false];  // Error message, loading false
  }
}

export async function deleteTemplate(
  template: ITemplate,
): Promise<[string, boolean]> {
  let loading = true;
  let error = '';
  try {
    const tempQuery = query(
      collection(FIRESTORE, 'templates'),
      where('__name__', '>=', template.id),
      where('__name__', '<=', `${template.id}\uf8ff`)
    );
    await getDocs(tempQuery).then((querySnapshot) => {
      querySnapshot.docs.map(snapshotDoc => deleteDoc(snapshotDoc.ref));
    });
    const tempWidgetsQuery = query(
      collection(FIRESTORE, 'templateWidgets'),
      where('__name__', '>=', template.id),
      where('__name__', '<=', `${template.id}\uf8ff`)
    );
    await getDocs(tempWidgetsQuery).then((querySnapshot) => {
      querySnapshot.docs.map(snapshotDoc => deleteDoc(snapshotDoc.ref));
    });
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function fetchTemplateWidgets(template: ITemplate): Promise<ITemplate> {
  if (!template.id) {
    throw new Error('Product ID is required');
  }

  const widgetsQuery = query(
    collection(FIRESTORE, 'templateWidgets'),
    where('__name__', '>=', template.id),
    where('__name__', '<=', `${template.id}\uf8ff`)
  );

  try {
    const querySnapshot = await getDocs(widgetsQuery);
    const widgets = querySnapshot.docs.map((queryDoc) => queryDoc.data() as IWidget);
    sortByOrder(widgets);

    // Assuming product.pass exists and we can add widgets to it
    const updatedTemplate = {
      ...template,
      pass: {
        ...template.pass,
        widgets,
      },
    };

    return updatedTemplate;
  } catch (error:any) {
    console.error('Failed to fetch widgets:', error);
    throw error;
  }
}
