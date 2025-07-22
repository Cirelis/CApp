import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useEffect, useState } from 'react';
import { _design } from 'src/_mock';
import { AppProviders } from 'src/hooks/app-providers';
import { IProductPass } from 'src/types/product';
import Funnel from './funnel';

type Props = {
  productPass: IProductPass | undefined;
  companyId: string;
  productId: string;
  availLang: string[];
  language: string;
  tags: string[] | undefined;
  analytics: boolean;
  redirect: string;
  redirectURL: string;
};

export default function FunnelView({
  productPass,
  companyId,
  productId,
  availLang,
  language,
  tags,
  analytics,
  redirect,
  redirectURL,
}: Props) {
  const [langIndex, setLangIndex] = useState<number>(0);

  const trackId = `${companyId}/${productId}/${tags?.sort().join('/')}`;
  const { trackPageView, trackEvent } = useMatomo();

  useEffect(() => {
    if (trackId && trackId !== '//' && trackId !== '/') {
      trackEvent({ category: trackId, action: 'view', value: 1 });
      // if (analytics) {
      //   trackPageView({
      //     documentTitle: trackId,
      //     customDimensions: [
      //       {
      //         id: 1,
      //         value: 'loggedIn',
      //       },
      //     ],
      //   });
      // }
    }
    if (redirect === 'X') {
      window.location.href = redirectURL;
    }

    switch (language) {
      case 'en':
        setLangIndex(0);
        break;
      case 'de':
        setLangIndex(1);
        break;
      case 'es':
        setLangIndex(2);
        break;
      case 'fr':
        setLangIndex(3);
        break;
      default:
        setLangIndex(0); // Default to English if language is unknown
    }
  }, [trackId, analytics, trackEvent, trackPageView, redirect, redirectURL, language]);

  return (
    <>
      {redirect ? null : (
        <AppProviders
          availLanguage={availLang}
          companyId={companyId}
          productId={productId}
          design={productPass?.design || _design}
        >
          <Funnel
            productPass={productPass}
            language={langIndex}
            tags={tags}
            analytics={analytics}
          />
        </AppProviders>
      )}
    </>
  );
}
