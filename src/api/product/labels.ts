import { addDoc, collection, doc, documentId, query, setDoc, where, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from 'src/lib/firebase';
import { ICustomCert } from 'src/types/certificates';
// ----------------------------------------------------------------------

type GetLabel = {
  labels: ICustomCert[];
  isLoading: boolean;
  error: string;
  isEmpty: boolean;
};

const InitialGetLabel: GetLabel = {
  labels: [],
  isLoading: true,
  error: '',
  isEmpty: false,
};

export function useGetLabelsById(companyId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetLabel>(InitialGetLabel);

  const [values, loading, error] = useCollectionData(
    companyId
      ? query(collection(FIRESTORE, 'labels'), where(documentId(), '==', companyId))
      : null
  );

  useEffect(() => {
    setMemoizedValue({
      labels: !values || values.length < 1 ? [] : (values[0].labels as ICustomCert[]),
      isLoading: loading,
      error: error?.message || '',
      isEmpty: !loading && !values?.length,
    });
  }, [values, loading, error]);

  return memoizedValue;
}
