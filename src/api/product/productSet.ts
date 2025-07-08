import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { ICompany } from 'src/types/company';
// types
import { IBackProduct, IProduct, IWidget } from 'src/types/product';
import { updateOrder } from 'src/utils/apiUtils';
import { fDate } from 'src/utils/format-time';
import { fetchProductWidgets } from './productGet';
import { FIRESTORE } from 'src/lib/firebase';
// ----------------------------------------------------------------------

export function setNewProduct(product: IProduct, company: ICompany): [string, boolean] {
  const prodNum = company.numberRange + 1;
  const productId = company.productId + prodNum;
  product.id = productId;
  product.company = company.name;
  product.companyId = company.id;
  let loading = true;
  let error = '';
  if (product.name.includes('/')) {
    return ['No / in identifier!', false];
  }
  if (product.tags.find((tag) => tag.includes('/'))) {
    return ['No / in identifier!', false];
  }
  try {
    const docu = doc(FIRESTORE, 'products', productId);
    setDoc(docu, product).then(() => {
      const changeCompany = company;
      changeCompany.numberRange += 1;
      const docum = doc(FIRESTORE, 'company', company.id);
      setDoc(docum, changeCompany).then(() => {
        const backendProd: IBackProduct = {
          gtin: product.gtin,
          company: company.id,
          name: product.name,
          customerId: product.secondary,
          tags: product.tags.join(';'),
          labelLanguage: product.defaultLang,
          labelTemplate: product.template,
          qrTemplate: product.qrTemplate,
          redirect: product.redirect,
          redirectURL: product.redirectURL,
        };
        // addProduct(backendProd, product.id);
        loading = false;
      });
    });
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }

  return [error, loading];
}

export async function setProduct(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  const widgets: IWidget[] = [...product.pass.widgets];
  updateOrder(widgets);
  productCol.pass.widgets.length = 0;
  let loading = true;
  let error = '';
  if (productCol.name.includes('/')) {
    return ['No / in identifier!', false];
  }
  if (productCol.tags.find((tag) => tag.includes('/'))) {
    return ['No / in identifier!', false];
  }
  try {
    const docu = doc(FIRESTORE, 'products', product.id);
    await setDoc(docu, productCol);
    const backendProd: IBackProduct = {
      gtin: productCol.gtin,
      company: productCol.companyId,
      name: productCol.name,
      customerId: productCol.secondary,
      tags: productCol.tags.join(';'),
      labelLanguage: productCol.defaultLang,
      labelTemplate: productCol.template,
      qrTemplate: productCol.qrTemplate,
      redirect: productCol.redirect,
      redirectURL: productCol.redirectURL,
    };
    // updateProduct(backendProd, productCol.id);

    // Step 1: Query existing widgets
    const widgetsQuery = query(
      collection(FIRESTORE, 'productWidgets'),
      where('__name__', '>=', product.id),
      where('__name__', '<=', `${product.id}\uf8ff`)
    );

    const querySnapshot = await getDocs(widgetsQuery);
    const existingWidgetIds = new Set(querySnapshot.docs.map((d) => d.id));

    // Step 2: Write new widgets
    const newWidgetIds = new Set();
    let writeCount = 0;
    const savePromises = widgets.map(async (widget) => {
      const widgetId = product.id + widget.id;
      newWidgetIds.add(widgetId);
      const docum = doc(FIRESTORE, 'productWidgets', widgetId);
      await setDoc(docum, widget);
      writeCount += 1;
    });
    await Promise.all(savePromises);

    // Step 3: Delete old widgets that are no longer in use
    if (writeCount > 1) {
      const deletePromises = querySnapshot.docs
        .filter((queryDoc) => !newWidgetIds.has(queryDoc.id)) // Only delete widgets not in the new list
        .map(async (queryDoc) => {
          await deleteDoc(queryDoc.ref);
        });
      await Promise.all(deletePromises);
    }

    loading = false;
  } catch (fbError:any) {
    error = fbError.message || fbError.toString();
    console.log(error);
    loading = false;
  }

  return [error, loading];
}

export async function setProductDetails(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  let loading = true;
  let error = '';
  if (productCol.name.includes('/')) {
    return ['No / in identifier!', false];
  }
  if (productCol.tags.find((tag) => tag.includes('/'))) {
    return ['No / in identifier!', false];
  }
  try {
    const docum = doc(FIRESTORE, 'products', product.id);
    await setDoc(docum, productCol);
    const backendProd: IBackProduct = {
      gtin: productCol.gtin,
      company: productCol.companyId,
      name: productCol.name,
      customerId: productCol.secondary,
      tags: productCol.tags.join(';'),
      labelLanguage: productCol.defaultLang,
      labelTemplate: productCol.template,
      qrTemplate: productCol.qrTemplate,
      redirect: productCol.redirect,
      redirectURL: productCol.redirectURL,
    };
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function publishProduct(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  const updatedProduct = await fetchProductWidgets(productCol);
  const widgets: IWidget[] = [...updatedProduct.pass.widgets];
  updatedProduct.live = { ...updatedProduct.pass };
  updatedProduct.live.widgets.length = 0;
  let newVersion = updatedProduct.version;
  if (updatedProduct.status !== 'new' && updatedProduct.change === 'X') {
    newVersion = (+updatedProduct.version + 1).toString();
  }
  updatedProduct.version = newVersion;
  updatedProduct.publishedAt = fDate(new Date());
  updatedProduct.change = '';
  updatedProduct.status = 'online';
  updatedProduct.liveLang = updatedProduct.availLang;
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'products', product.id);
    setDoc(docu, updatedProduct).then(() => {
      const widgetsQuery = query(
        collection(FIRESTORE, 'productLive'),
        where('__name__', '>=', product.id),
        where('__name__', '<=', `${product.id}\uf8ff`)
      );
      getDocs(widgetsQuery).then((querySnapshot) => {
        // Use map directly for implicit return of deleteDoc promises
        const deletePromises = querySnapshot.docs.map((queryDoc) => deleteDoc(queryDoc.ref));

        // Use implicit return for Promise.all
        Promise.all(deletePromises).then(() => {
          widgets.forEach((widget) => {
            // firestore
            //   .collection('productLive')
            //   .doc(product.id + widget.id)
            //   .set(widget);
            const docum = doc(FIRESTORE, 'productLive', product.id + widget.id);
            setDoc(docum, widget);
          });
          loading = false;
        });
      });
    });
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function archiveProduct(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  productCol.status = 'offline';
  productCol.archived = 'X';
  productCol.archivedDate = fDate(new Date());
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'products', product.id);
    await setDoc(docu, productCol);
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function offlineProduct(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  productCol.status = 'offline';
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'products', product.id);
    await setDoc(docu, productCol);
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function onlineProduct(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  productCol.status = 'online';
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'products', product.id);
    await setDoc(docu, productCol);
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

export async function errorProduct(product: IProduct): Promise<[string, boolean]> {
  const productCol: IProduct = { ...product };
  productCol.status = 'error';
  let loading = true;
  let error = '';
  try {
    const docu = doc(FIRESTORE, 'products', product.id);
    await setDoc(docu, productCol);
  } catch (fbError:any) {
    error = fbError;
    console.log(error);
    loading = false;
  }
  return [error, loading];
}

// ----------------------------------------------------------------------
