import { collection, doc, documentId, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from 'src/lib/firebase';
// ----------------------------------------------------------------------

export async function setStorefinderStores(
  stores: IStore[],
  companyId: string
): Promise<[string, boolean]> {
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'storefinder', companyId);
    await setDoc(docu, { stores });
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

// ----------------------------------------------------------------------

type GetStorefinder = {
  stores: IStore[];
  isLoading: boolean;
  error: string;
  isEmpty: boolean;
};

const InitialGetStorefinder: GetStorefinder = {
  stores: [],
  isLoading: true,
  error: '',
  isEmpty: false,
};

export function useGetStorefinderStoresById(companyId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetStorefinder>(InitialGetStorefinder);

  const [values, loading, error] = useCollectionData(
    companyId
      ? query(collection(FIRESTORE, 'storefinder'), where(documentId(), '==', companyId))
      : null
  );

  useEffect(() => {
    setMemoizedValue({
      stores: !values || values.length < 1 ? [] : (values[0].stores as IStore[]),
      isLoading: loading,
      error: error?.message || '',
      isEmpty: !loading && !values?.length,
    });
  }, [values, loading, error]);

  return memoizedValue;
}
