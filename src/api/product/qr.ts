import { setDoc, doc } from 'firebase/firestore';
import { FIRESTORE } from 'src/lib/firebase';
// types
import { IQRCode } from 'src/types/product';
// ----------------------------------------------------------------------

export async function setQrTemplate(
  qrTemplate: IQRCode,
  companyId: string
): Promise<[string, boolean]> {
  const qrTemplateCol: IQRCode = { ...qrTemplate };
  const qrId = companyId + qrTemplateCol.id;
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'qrTemplates', qrId);
    await setDoc(docu, qrTemplateCol);
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

// ----------------------------------------------------------------------
