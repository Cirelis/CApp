import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import {
  signOut as _signOut,
  signInWithPopup as _signInWithPopup,
  GoogleAuthProvider as _GoogleAuthProvider,
  GithubAuthProvider as _GithubAuthProvider,
  TwitterAuthProvider as _TwitterAuthProvider,
  sendEmailVerification as _sendEmailVerification,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

import { AUTH, FIRESTORE } from 'src/lib/firebase';
import { ICompany } from 'src/types/company';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: Partial<ICompany>;
};

export type ForgotPasswordParams = {
  email: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    await _signInWithEmailAndPassword(AUTH, email, password);

    const user = AUTH.currentUser;

    if (!user?.emailVerified) {
      throw new Error('Email not verified!');
    }
  } catch (error: any) {
    console.error('Error during sign in with password:', error);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new _GoogleAuthProvider();
  await _signInWithPopup(AUTH, provider);
};

export const signInWithGithub = async (): Promise<void> => {
  const provider = new _GithubAuthProvider();
  await _signInWithPopup(AUTH, provider);
};

export const signInWithTwitter = async (): Promise<void> => {
  const provider = new _TwitterAuthProvider();
  await _signInWithPopup(AUTH, provider);
};

/** **************************************
 * Sign up
 *************************************** */

function generateRandomId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 5; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

const newCompany = async (
  newUser: UserCredential,
  email: string,
  firstName: string,
  lastName: string,
  company: Partial<ICompany>
) => {
  const now = new Date();
  const productId = generateRandomId();
  const userId = newUser.user.uid;
  const companyData = {
    abo: company.abo,
    name: company.name,
    disabled: true,
    branche: company.branche,
    city: company.city,
    country: company.country,
    state: company.state,
    plz: company.plz,
    street: company.street,
    housenumber: company.housenumber,
    size: company.size,
    userAvail: 0,
    numberRange: 0,
    productId,
    user: [
      {
        uid: userId,
        role: 'admin',
      },
    ],
    id: '',
    createdAt: now,
  };

  const companyRef = await addDoc(collection(FIRESTORE, 'company'), companyData);
  companyData.id = companyRef.id;

  await setDoc(doc(FIRESTORE, 'company', companyData.id), companyData);

  const userProfileNew = {
    uid: userId,
    email,
    displayName: `${firstName} ${lastName}`,
    photo: '',
    company: companyData.id,
    companys: [companyData.id],
  };

  await setDoc(doc(FIRESTORE, 'users', userId), userProfileNew);
};

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
  company,
}: SignUpParams): Promise<void> => {
  try {
    const newUser = await _createUserWithEmailAndPassword(AUTH, email, password);

    await _sendEmailVerification(newUser.user);

    await newCompany(newUser, email, firstName, lastName, company);

    const userProfile = doc(collection(FIRESTORE, 'users'), newUser.user?.uid);

    await setDoc(userProfile, {
      uid: newUser.user?.uid,
      email,
      displayName: `${firstName} ${lastName}`,
    });
  } catch (error: any) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  await _signOut(AUTH);
};

/** **************************************
 * Reset password
 *************************************** */
export const sendPasswordResetEmail = async ({ email }: ForgotPasswordParams): Promise<void> => {
  await _sendPasswordResetEmail(AUTH, email);
};
