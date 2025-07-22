import { query, collection, where, documentId, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from 'src/lib/firebase';
// types
import { IOrigin } from 'src/types/origin';

// ----------------------------------------------------------------------

type GetOrigin = {
  origin: IOrigin;
  originLoading: boolean;
  originError: string;
  originEmpty: boolean;
};

const InitialGetOrigin: GetOrigin = {
  origin: {
    Production: [],
    Ressources: [],
    Packaging: [],
  },
  originLoading: true,
  originError: '',
  originEmpty: false,
};

export function useGetOriginId(originId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetOrigin>(InitialGetOrigin);
  const [values, loading, error] = useCollectionData(
    originId ? query(collection(FIRESTORE, 'origin'), where(documentId(), '==', originId)) : null
  );
  useEffect(() => {
    setMemoizedValue({
      origin: (values?.[0] as IOrigin) || {},
      originLoading: loading,
      originError: error?.message || '',
      originEmpty: !loading && !values?.length,
    });
  }, [values, loading, error]);

  return memoizedValue;
}
