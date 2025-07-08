import {
  query,
  collection,
  where,
  documentId,
  getDocs,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from 'src/lib/firebase';
// types
import { IProduct, IQRCode, IWidget } from 'src/types/product';
import { sortByOrder, updateOrder } from 'src/utils/apiUtils';
import { fDate } from 'src/utils/format-time';
// ----------------------------------------------------------------------

export type GetProducts = {
  products: IProduct[];
  productsLoading: boolean;
  productsError: string;
  productsEmpty: boolean;
};

type GetProduct = {
  product: IProduct;
  productLoading: boolean;
  productError: string;
  productEmpty: boolean;
};

type GetQrTemplates = {
  qrTemplates: IQRCode[];
  qrTemplatesLoading: boolean;
  qrTemplatesError: string;
  qrTemplatesEmpty: boolean;
};

const InitialGetProduct: GetProduct = {
  product: {
    id: '',
    name: '',
    gtin: '',
    secondary: '',
    img: '',
    tags: [],
    status: '',
    change: '',
    changeClosed: '',
    url: '',
    version: '',
    publishedAt: '',
    template: '',
    templateId: '',
    tempChangeAt: '',
    redirect: '',
    redirectURL: '',
    company: '',
    companyId: '',
    defaultLang: '',
    availLang: [],
    liveLang: [],
    archived: '',
    archivedDate: '',
    changedBy: '',
    changedAt: '',
    createdBy: '',
    createdAt: '',
    qrTemplate: '',
    qr: {
      id: '',
      qrTemplate: '',
      ecLevel: '',
      shape: '',
      bgColor: '',
      fgColor: '',
      logoImage: '',
      logoSize: 0,
      qrStyle: '',
      cornerStyle: '',
      eyeColor: '',
    },
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
    live: {
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
  productLoading: true,
  productError: '',
  productEmpty: false,
};

export function useGetProducts(compId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetProducts>({
    products: [],
    productsLoading: true,
    productsError: '',
    productsEmpty: false,
  });
  const [productValues, loading, error] = useCollectionData(
    compId
      ? query(
          collection(FIRESTORE, 'products'),
          where('__name__', '>=', compId),
          where('__name__', '<=', `${compId}\uf8ff`)
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

export function GetDataProducts(compId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetProducts>({
    products: [],
    productsLoading: true,
    productsError: '',
    productsEmpty: false,
  });
  const [productValues, loading, error] = useCollectionData(
    compId
      ? query(
          collection(FIRESTORE, 'products'),
          where('__name__', '>=', compId),
          where('__name__', '<=', `${compId}\uf8ff`)
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

export function useGetProductWidgets(product: IProduct) {
  const [memoizedValue, setMemoizedValue] = useState<GetProduct>(InitialGetProduct);
  const [widgetValues, loading, error] = useCollectionData(
    product.id
      ? query(
          collection(FIRESTORE, 'productWidgets'),
          where('__name__', '>=', product.id),
          where('__name__', '<=', `${product.id}\uf8ff`)
        )
      : null
  );
  if (widgetValues) {
    sortByOrder(widgetValues);
    product.pass.widgets = widgetValues as IWidget[];
  }
  useEffect(() => {
    setMemoizedValue({
      product: (product as IProduct) || {},
      productLoading: loading,
      productError: error?.message || '',
      productEmpty: !loading && !product,
    });
  }, [product, loading, error]);

  return memoizedValue;
}

export function useGetQRTemplates(compId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetQrTemplates>({
    qrTemplates: [],
    qrTemplatesLoading: true,
    qrTemplatesError: '',
    qrTemplatesEmpty: false,
  });
  const [qrValues, loading, error] = useCollectionData(
    compId
      ? query(
          collection(FIRESTORE, 'qrTemplates'),
          where('__name__', '>=', compId),
          where('__name__', '<=', `${compId}\uf8ff`)
        )
      : null
  );
  // After retrieving the products, filter out the archived ones

  useEffect(() => {
    setMemoizedValue({
      qrTemplates: (qrValues as IQRCode[]) || [],
      qrTemplatesLoading: loading,
      qrTemplatesError: error?.message || '',
      qrTemplatesEmpty: !loading && !qrValues?.length,
    });
  }, [qrValues, loading, error]);

  return memoizedValue;
}

export function useGetProductId(productId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetProduct>(InitialGetProduct);

  const [values, loading, error] = useCollectionData(
    productId
      ? query(collection(FIRESTORE, 'products'), where(documentId(), '==', productId))
      : null
  );
  useEffect(() => {
    const filteredProductValues = values
      ? values.filter((product) => product.archived !== 'X')
      : [];
    setMemoizedValue({
      product: (filteredProductValues?.[0] as IProduct) || {},
      productLoading: loading,
      productError: error?.message || '',
      productEmpty: !loading && !filteredProductValues?.length,
    });
  }, [values, loading, error]);

  return memoizedValue;
}

export async function fetchProductWidgets(product: IProduct): Promise<IProduct> {
  if (!product.id) {
    throw new Error('Product ID is required');
  }

  const widgetsQuery = query(
    collection(FIRESTORE, 'productWidgets'),
    where('__name__', '>=', product.id),
    where('__name__', '<=', `${product.id}\uf8ff`)
  );

  try {
    const querySnapshot = await getDocs(widgetsQuery);
    const widgets = querySnapshot.docs.map((queryDoc) => queryDoc.data() as IWidget);

    // Assuming product.pass exists and we can add widgets to it
    const updatedProduct = {
      ...product,
      pass: {
        ...product.pass,
        widgets,
      },
    };

    return updatedProduct;
  } catch (error:any) {
    console.error('Failed to fetch widgets:', error);
    throw error;
  }
}

export async function getProduct(productId: string): Promise<IProduct> {
  const productQuery = query(
    collection(FIRESTORE, 'products'),
    where(documentId(), '>=', productId)
  );
  try {
    const querySnapshot = await getDocs(productQuery);
    const updatedProduct = querySnapshot.docs.map((queryDoc) => queryDoc.data() as IProduct);
    return updatedProduct[0];
  } catch (error:any) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
}


export async function fetchAttributesWidgets(productId: string): Promise<IWidget[]> {
  if (!productId) {
    throw new Error('Product ID is required');
  }

  const widgetsQuery = query(
    collection(FIRESTORE, 'productWidgets'),
    where('__name__', '>=', productId),
    where('__name__', '<=', `${productId}\uf8ff`)
  );

  try {
    const querySnapshot = await getDocs(widgetsQuery);
    const widgets = querySnapshot.docs.map((queryDoc) => queryDoc.data() as IWidget);

    return widgets;
  } catch (error:any) {
    console.error('Failed to fetch widgets:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
