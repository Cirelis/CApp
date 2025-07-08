import { addDoc, collection, doc, documentId, query, setDoc, where, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from 'src/lib/firebase';
import { ICustomCert } from 'src/types/certificates';
// ----------------------------------------------------------------------

export async function setLabels(
  labels: ICustomCert[],
  companyId: string
): Promise<[string, boolean]> {
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'labels', companyId);
    await setDoc(docu, { labels });
  } catch (fbError:any) {
    error = fbError.message || fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function setLabel(
  label: ICustomCert,
  companyId: string
): Promise<[string, boolean]> {
  let loading = true;
  let error = '';

  try {
    const docRef = doc(FIRESTORE, 'labels', companyId);
    const docSnap = await getDoc(docRef);

    let updatedLabels: ICustomCert[] = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      const existingLabels = (data.labels || []) as ICustomCert[];

      // Remove any existing label with the same id
      updatedLabels = existingLabels.filter(l => l.id !== label.id);
    }

    updatedLabels.push(label); // Add the new label

    await setDoc(docRef, { labels: updatedLabels }, { merge: true });
  } catch (fbError: any) {
    error = fbError.message || fbError;
    loading = false;
    console.error(error);
  }

  return [error, loading];
}

export async function deleteLabel(
  labelId: string,
  companyId: string
): Promise<[string, boolean]> {
  let loading = true;
  let error = '';

  try {
    const docRef = doc(FIRESTORE, 'labels', companyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      error = 'Document does not exist.';
      loading = false;
      return [error, loading];
    }

    const data = docSnap.data();
    const existingLabels = (data.labels || []) as ICustomCert[];

    // Filter out the label with the specified id
    const updatedLabels = existingLabels.filter(label => label.id !== labelId);

    // Update the Firestore document
    await setDoc(docRef, { labels: updatedLabels }, { merge: true });
  } catch (fbError: any) {
    error = fbError.message || fbError;
    loading = false;
    console.error(error);
  }

  return [error, loading];
}

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
