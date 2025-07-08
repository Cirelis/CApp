import axios from 'axios';
import { query, collection, where, documentId, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// types
import { ICompany } from 'src/types/company';
import { IUserItem } from 'src/types/user';
import { getKeycloak } from './auth';
import { CONFIG } from 'src/global-config';
import { UserType } from 'src/auth/types';
import { FIRESTORE } from 'src/lib/firebase';

// ----------------------------------------------------------------------

type GetCompany = {
  companys: ICompany[];
  companysLoading: boolean;
  companysError: string;
  companysEmpty: boolean;
};

type GetCompanyId = {
  company: ICompany;
  companyLoading: boolean;
  companyError: string;
  companyEmpty: boolean;
};

type GetUsers = {
  users: IUserItem[];
  usersLoading: boolean;
  usersError: string;
  usersEmpty: boolean;
};

function getCompByUid(
  users: { role: string; uid: string }[],
  targetUid: string
): boolean | undefined {
  return users.some((user) => user.uid === targetUid);
}

export function useGetCompanys(open: boolean, user: UserType) {
  const [memoizedValue, setMemoizedValue] = useState<GetCompany>({
    companys: [],
    companysLoading: true,
    companysError: '',
    companysEmpty: false,
  });
  const [values, loading, error] = useCollectionData(
    open ? query(collection(FIRESTORE, 'company'), where('id', 'in', user?.companys)) : null
  );
  useEffect(() => {
    // const user = firebase.auth().currentUser;
    const companys: ICompany[] = [];
    values?.forEach((company) => {
      if (company) {
        const uid = user?.uid || '';
        const found = getCompByUid(company.user, uid);
        if (found) {
          companys.push(company as ICompany);
        }
      }
    });
    setMemoizedValue({
      companys: (companys as ICompany[]) || [],
      companysLoading: loading,
      companysError: error?.message || '',
      companysEmpty: !loading && !companys?.length,
    });
  }, [values, loading, error, user]);

  return memoizedValue;
}

export function useGetCompanyId(companyId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetCompanyId>({
    company: {
      id: '',
      name: '',
      street: '',
      housenumber: '',
      city: '',
      plz: '',
      country: '',
      state: '',
      abo: '',
      size: '',
      branche: '',
      user: [],
      legal: {
        phoneC: '',
        emailC: '',
        nameAR: '',
        titleAR: '',
        numberCRI: '',
        courtCRI: '',
        infoVAT: '',
      },
      userAvail: 0,
      numberRange: 0,
      productId: '',
      createdAt: '',
      disabled: '',
      lastScan: '',
    },
    companyLoading: true,
    companyError: '',
    companyEmpty: false,
  });

  const [values, loading, error] = useCollectionData(
    companyId ? query(collection(FIRESTORE, 'company'), where(documentId(), '==', companyId)) : null
  );

  useEffect(() => {
    setMemoizedValue({
      company: (values?.[0] as ICompany) || {},
      companyLoading: loading,
      companyError: error?.message || '',
      companyEmpty: !loading && !values?.length,
    });
  }, [values, loading, error]);

  return memoizedValue;
}


export async function offlineCompany(company: ICompany): Promise<[string, boolean]> {
  let loading = true;
  let error = '';
  try {
    const key = await getKeycloak();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
    };
    const url: string = `${CONFIG.backendServer}/offline/${company.id}`;
    const response = await axios.post(url, null, { headers });
    loading = false;
  } catch (requestError:any) {
    error = requestError;
    console.log(requestError);
    loading = false;
  }
  return [error, loading];
}

export async function onlineCompany(company: ICompany): Promise<[string, boolean]> {
  let loading = true;
  let error = '';
  try {
    const key = await getKeycloak();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
    };
    const url: string = `${CONFIG.backendServer}/online/${company.id}`;
    const response = await axios.post(url, null, { headers });
    loading = false;
  } catch (requestError:any) {
    error = requestError;
    console.log(requestError);
    loading = false;
  }
  return [error, loading];
}

// ----------------------------------------------------------------------
