import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { _components } from 'src/_mock';
import { IWidget } from 'src/types/product';
import { modifyTemplateMapWidget, modifyProductWidget } from './passViewUtils';

export function sortByOrder(arr: Array<any>): void {
  arr.sort((a, b) => a.order - b.order);
}

export function updateOrder(arr: IWidget[]): void {
  arr.forEach((item, index) => {
    if (item.drop === 1) {
      item.order = index + 1000;
    } else if (item.label.id !== 'hoverButton') {
      item.order = index + 1;
    }
  });
}

export async function handleUploadMulti(
  files: File[],
  path: string
): Promise<{ name: string; downloadURL: string }[]> {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  // Use array map to create an array of Promises for each file upload
  const uploadPromises = files.map(async (file) => {
    if (file instanceof File) {
      const fileRef = ref(storageRef, file.name);
      try {
        await uploadBytes(fileRef, file); // Upload the file
        const downloadURL = await getDownloadURL(fileRef); // Get the download URL
        return { name: file.name, downloadURL }; // Return file name and URL
      } catch (error:any) {
        console.error('Error uploading file:', error);
        throw error; // Throw the error for this file if upload fails
      }
    } else {
      throw new Error('Invalid file provided');
    }
  });

  // Wait for all uploads to finish and return the results
  return Promise.all(uploadPromises);
}

export async function handleUploadSingle(
  file: File,
  path: string
): Promise<{ name: string; downloadURL: string }> {
  const storage = getStorage();
  const storageRef = ref(storage, path);
  const fileRef = ref(storageRef, file.name); // Reference for the specific file

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(fileRef);

    // Return the name and the download URL
    return { name: file.name, downloadURL };
  } catch (error:any) {
    console.error('Error uploading file:', error);
    throw error; // Propagate the error
  }
}

export async function resizePhoto(file: File): Promise<File | null> {
  const MAX_SIZE = 250000; // Maximum size in bytes

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target?.result) {
        reject(new Error('File could not be read.'));
        return;
      }

      const img = new Image();
      img.src = event.target.result as string;

      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context.'));
          return;
        }

        const checkSize = () => {
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob.'));
              return;
            }

            if (blob.size <= MAX_SIZE) {
              // Create resized file
              const resizedFile = new File([blob], file.name, { type: file.type });
              resolve(resizedFile);
            } else {
              // Reduce dimensions iteratively
              const scaleFactor = Math.sqrt(MAX_SIZE / (blob?.size || MAX_SIZE));
              width *= scaleFactor;
              height *= scaleFactor;
              checkSize();
            }
          }, file.type);
        };

        checkSize();
      };

      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('FileReader encountered an error.'));
    };

    reader.readAsDataURL(file);
  });
}

export function mapProductTemplate(
  productWidgets: IWidget[],
  templateWidgets: IWidget[]
): IWidget[] {
  const components = _components.map((component) => component.label.id);
  const returnWidgets: IWidget[] = [];
  templateWidgets.forEach((tempWidget) => {
    let prodWidget: IWidget | undefined = {
      id: '',
      name: '',
      order: 0,
      drop: 0,
      category: '',
      company: '',
      label: {
        id: '',
        name: '',
        color: '',
      },
      open: false,
      childs: [],
      style: {},
    };
    if (tempWidget.label.id === 'customwidget') {
      prodWidget = productWidgets.find(
        (pW) =>
          pW.childs[0]?.attributes?.Custom_ID?.value?.[0].val?.[0] ===
          tempWidget.childs[0].attributes.Custom_ID.value[0].val[0]
      );
    } else if (tempWidget.label.id === 'labels') {
      if(tempWidget.childs[0].attributes.Label_ID.value[0].val[0] !== undefined){
      prodWidget = productWidgets.find(
        (pW) =>
          pW.childs[0]?.attributes?.Label_ID?.value?.[0].val?.[0] ===
          tempWidget.childs[0].attributes.Label_ID.value[0].val[0]
      );
      }
    } else if (components.includes(tempWidget.label.id)) {
      prodWidget = productWidgets.find((pW) => pW.id === tempWidget.id);
    } else {
      prodWidget = productWidgets.find((pW) => pW.label.id === tempWidget.label.id);
    }
    if (prodWidget !== undefined) {
      const modWidget = modifyTemplateMapWidget(prodWidget, tempWidget);
      returnWidgets.push(modWidget);
    } else {
      const newWidget = modifyProductWidget(tempWidget);
      returnWidgets.push(newWidget);
    }
  });
  return returnWidgets;
}
