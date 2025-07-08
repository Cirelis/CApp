import { useState, useEffect } from 'react';
import axios from 'axios';
// types
import { IAnalytics, IEvents, IViewsPrev } from 'src/types/matomo';
import { getKeycloak } from './auth';
import { CONFIG } from 'src/global-config';
// ----------------------------------------------------------------------

type GetEvents = {
  events: IEvents;
  viewsLoading: boolean;
  viewsError: string;
  viewsEmpty: boolean;
};

type GetViewsPrev = {
  viewsPrev: IViewsPrev;
  viewsLoading: boolean;
  viewsError: string;
  viewsEmpty: boolean;
};

type GetAnalytics = {
  data: IAnalytics;
  dataLoading: boolean;
  dataError: string;
  dataEmpty: boolean;
};

export function useGetEvents(matomoId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetEvents>({
    events: {
      views: 0,
      rebuys: 0,
      date: '',
    },
    viewsLoading: true,
    viewsError: '',
    viewsEmpty: false,
  });
  useEffect(() => {
    if (matomoId) {
      getEvents(matomoId).then(([views, isLoading, error]) => {
        setMemoizedValue({
          events: (views as IEvents) || [],
          viewsLoading: isLoading,
          viewsError: error,
          viewsEmpty: !isLoading && !views,
        });
      });
    }
  }, [matomoId]);

  return memoizedValue;
}

export async function getEvents(matomoId: string): Promise<[IEvents, boolean, string]> {
  let views: IEvents = {
    views: 0,
    rebuys: 0,
    date: '',
  };
  let isLoading: boolean = false;
  let error: string = '';
  try {
    const key = await getKeycloak();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
    };
    const url: string = `${CONFIG.backendServer}/analytics/${matomoId}/events`;
    const response = await axios.get(url, { headers });
    // Return the translated text
    if (response.status === 200) {
      views = response.data.views;
      isLoading = false;
    } else {
      console.log(`Error: ${response.status} - ${response.statusText}`);
      error = `Error: ${response.status} - ${response.statusText}`;
      isLoading = false;
    }
    return [views, isLoading, error];
  } catch (requestError:any) {
    console.error('Error during translation:', requestError);
    return [views, isLoading, requestError];
  }
}

// ----------------------------------------------------------------------

export function useGetViewsPrev(matomoId: string) {
  const [memoizedValue, setMemoizedValue] = useState<GetViewsPrev>({
    viewsPrev: {},
    viewsLoading: true,
    viewsError: '',
    viewsEmpty: false,
  });
  useEffect(() => {
    if (matomoId) {
      getViewsPrev(matomoId).then(([views, isLoading, error]) => {
        setMemoizedValue({
          viewsPrev: (views as IViewsPrev) || [],
          viewsLoading: isLoading,
          viewsError: error,
          viewsEmpty: !isLoading && !views,
        });
      });
    }
  }, [matomoId]);

  return memoizedValue;
}

export async function getViewsPrev(matomoId: string): Promise<[IViewsPrev, boolean, string]> {
  let views: IViewsPrev = {};
  let isLoading: boolean = false;
  let error: string = '';
  try {
    const key = await getKeycloak();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
    };
    const url: string = `${CONFIG.backendServer}/analytics/${matomoId}/views/last6`;
    const response = await axios.get(url, { headers });
    // Return the translated text
    if (response.status === 200) {
      views = response.data;
      isLoading = false;
    } else {
      console.log(`Error: ${response.status} - ${response.statusText}`);
      error = `Error: ${response.status} - ${response.statusText}`;
      isLoading = false;
    }
    return [views, isLoading, error];
  } catch (requestError:any) {
    console.error('Error during translation:', requestError);
    return [views, isLoading, requestError];
  }
}

// ----------------------------------------------------------------------

export function useGetAnalyticsData(
  matomoId: string,
  products: string[],
  tags: string[],
  datefrom: Date,
  dateto: Date
) {
  const [memoizedValue, setMemoizedValue] = useState<GetAnalytics>({
    data: { data: [] },
    dataLoading: true,
    dataError: '',
    dataEmpty: false,
  });
  useEffect(() => {
    if (matomoId) {
      GetAnalyticsData(matomoId, products, tags, datefrom, dateto).then(([data, isLoading, error]) => {
        setMemoizedValue({
          data: (data as IAnalytics) || [],
          dataLoading: isLoading,
          dataError: error,
          dataEmpty: !isLoading && !data,
        });
      });
    }
  }, [matomoId, products, tags, datefrom, dateto]);

  return memoizedValue;
}

export async function GetAnalyticsData(
  matomoId: string,
  products: string[],
  tags: string[],
  datefrom: Date,
  dateto: Date
): Promise<[IAnalytics, boolean, string]> {
  let data: IAnalytics = { data: [] };
  let isLoading: boolean = false;
  let error: string = '';
  try {
    if(matomoId) {
      const key = await getKeycloak();
      const headers: Record<string, string> = {
        Authorization: `Bearer ${key}`,
      };
      const productString: string = products.join(";");
      const tagString: string = tags.join(";");
      const formatDateFrom: string = datefrom.toISOString().slice(0, 10);
      const formatDateTo: string = dateto.toISOString().slice(0, 10);
      const url: string = `${CONFIG.backendServer}/analytics/${matomoId}/all/${formatDateFrom}/${formatDateTo}?product=${productString}&tag=${tagString}`
      const response = await axios.get(url, { headers });
      // Return the translated text
      if (response.status === 200) {
        data = response.data;
        isLoading = false;
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        error = `Error: ${response.status} - ${response.statusText}`;
        isLoading = false;
      }
    }
    return [data, isLoading, error];
  } catch (requestError:any) {
    console.error('Error:', requestError);
    return [data, isLoading, requestError];
  }
}

export async function deleteEvents(
  category: string,
): Promise<string> {
  try {
    const key = await getKeycloak();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
    };
    // Construct the URL for the translation API
    const url: string = `${CONFIG.backendServer}/analytics/events/delete?event_category=${category}`;
    // Wait for the translation response
    const response = await axios.delete(url, { headers });
    // Return the translated text
    return response.data;
  } catch (error:any) {
    console.error('Error during translation:', error);
    return ''; // Return empty string in case of an error
  }
}
