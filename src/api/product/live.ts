import {
  query,
  collection,
  where,
  getDocs,
  documentId,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from 'src/lib/firebase';
// types
import { IProduct, IQRCode, IWidget } from 'src/types/product';
import { sortByOrder, updateOrder } from 'src/utils/apiUtils';
// ----------------------------------------------------------------------

type GetProduct = {
  product: IProduct;
  productLoading: boolean;
  productError: string;
  productEmpty: boolean;
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


export async function fetchProductLive(product: IProduct): Promise<IProduct> {
  if (!product.id) {
    throw new Error('Product ID is required');
  }

  const widgetsQuery = query(
    collection(FIRESTORE, 'productLive'),
    where('__name__', '>=', product.id),
    where('__name__', '<=', `${product.id}\uf8ff`)
  );

  try {
    const querySnapshot = await getDocs(widgetsQuery);
    const widgets = querySnapshot.docs.map((queryDoc) => queryDoc.data() as IWidget);
    sortByOrder(widgets);
    // Assuming product.pass exists and we can add widgets to it
    const updatedProduct = {
      ...product,
      live: {
        ...product.live,
        widgets,
      },
    };

    return updatedProduct;
  } catch (error:any) {
    console.error('Failed to fetch widgets:', error);
    throw error;
  }
}

export async function fetchProductSaved(product: IProduct): Promise<IProduct> {
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
    sortByOrder(widgets);
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

export function useGetProductGtin(gtin: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetProduct>(InitialGetProduct);
  const isGtin13 = gtin.length === 13;
  const queryRef = gtin
    ? query(
        collection(FIRESTORE, 'products'),
        isGtin13 ? where('gtin', '==', gtin) : where(documentId(), '==', gtin)
      )
    : null;

  // Fetch data using the appropriate query
  const [values = [], loading, error] = useCollectionData(queryRef);

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

export async function getProductLive(product: IProduct): Promise<IProduct> {
  const productCol: IProduct = { ...product };
  let updatedProduct: IProduct = { ...product };
  if (product.redirect === '') {
    updatedProduct = await fetchProductLive(productCol);
  }
  return updatedProduct;
}

export async function getProductSaved(product: IProduct): Promise<IProduct> {
  const productCol: IProduct = { ...product };
  let updatedProduct: IProduct = { ...product };
  if (product.redirect === '') {
    updatedProduct = await fetchProductSaved(productCol);
  }
  return updatedProduct;
}


// ----------------------------------------------------------------------
