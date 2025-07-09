import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'src/routes/hooks';
import { useGetProductId } from 'src/api/product/productGet';
import { offlineCompany, onlineCompany, useGetCompanyId } from 'src/api/company';
import { getProductLive } from 'src/api/product/live';
import { useGetEvents } from 'src/api/matomo';
import { _paymentPlans } from 'src/_mock/_paymentPlans';
import { paths } from 'src/routes/paths';
import FunnelView from 'src/sections/funnel/funnel-view';
import { IProduct } from 'src/types/product';
import { Box, GlobalStyles } from '@mui/material';
import { useBoolean } from 'minimal-shared/hooks';

// ----------------------------------------------------------------------

function isSameMonth(t1: string, t2: string): boolean {
  const date1 = new Date(t1);
  const date2 = new Date(t2);

  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();

  return year1 === year2 && month1 === month2;
}

const metadata = {
  title: 'Cirelis',
  description:
    'The starting point for your Story',
};

export default function FunnelPage() {
  const params = useParams();
  const router = useRouter();
  const [liveProduct, setLiveProduct] = useState<IProduct | null>(null);
  // const [productNoWidgets, setProduct] = useState<IProduct | null>(null);

  let id: string = '';
  if (params?.labelId) {
    id = params.labelId;
  }

  const { product: productNoWidgets } = useGetProductId(id);
  const [availLanguage, setAvailLanguage] = useState<string[]>(productNoWidgets?.liveLang);
  const { company } = useGetCompanyId(productNoWidgets?.companyId || '');
  const { events, viewsLoading } = useGetEvents(productNoWidgets?.companyId || '');

  const show = useBoolean(true);
  const analytics = useBoolean(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (company.id) {
        const tmstmp = new Date().toISOString();
        if (company.disabled === 'X' && isSameMonth(company.lastScan, tmstmp)) {
          show.onFalse();
          router.push(paths.page403);
        } else if (!liveProduct) {
          // const productData = await getProduct(id);
          // setProduct(productData);
          // if (productNoWidgets && productNoWidgets?.id !== '') {
          const liveProductData = await getProductLive(productNoWidgets);
          setLiveProduct(liveProductData);
          // }
        }
      }
    };
    fetchProduct();
    setAvailLanguage(productNoWidgets.liveLang);
  }, [id, productNoWidgets, liveProduct, company, company.id, router, show]);

  useEffect(() => {
    if (
      productNoWidgets?.id !== '' &&
      company.id !== '' &&
      (productNoWidgets?.status === 'online' || productNoWidgets?.status === 'changed')
    ) {
      show.onTrue();
      let viewsNotAvailable = {
        subscription: '',
        price: 0,
        primary: false,
        scans: 1,
        analytics: false,
      };
      viewsNotAvailable =
        _paymentPlans.find(
          (paymentPlan) =>
            paymentPlan.subscription === company.abo && events.views > paymentPlan.scans
        ) ?? viewsNotAvailable;

      const analyticsAvailable = _paymentPlans.find(
        (paymentPlan) => paymentPlan.subscription === company.abo && paymentPlan.analytics
      );
      const tmstmp = new Date().toISOString();

      if (company.disabled === 'X' && isSameMonth(company.lastScan, tmstmp)) {
        show.onFalse();
        router.push(paths.page403);
      }
      if (company.disabled === 'X' && !isSameMonth(company.lastScan, tmstmp)) {
        onlineCompany(company);
      }
      if (viewsNotAvailable.scans > 1 && company.disabled === '') {
        show.onFalse();
        offlineCompany(company);
        router.push(paths.page403);
      }
      if (analyticsAvailable) {
        analytics.onTrue();
      }
    } else {
      show.onFalse();
    }
  }, [productNoWidgets, company, events, viewsLoading, router, show, analytics]);

  const [pos, setPos] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const update = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
  //   window.addEventListener('mousemove', update);
  //   return () => window.removeEventListener('mousemove', update);
  // }, []);

  return (
    <Box sx={{ p: 0 }}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {show.value && liveProduct && (
        <>
          <GlobalStyles
            styles={{
              '.recording-mode *': {
                cursor: 'none !important',
              },
            }}
          />
          <div className="recording-mode" style={{ cursor: 'none', height: '100vh' }}>
            <FunnelView
              productPass={liveProduct.live}
              companyId={productNoWidgets?.companyId || ''}
              productId={productNoWidgets?.id || ''}
              availLang={availLanguage || []}
              language={productNoWidgets?.defaultLang || 'en'}
              tags={productNoWidgets?.tags}
              analytics={analytics.value}
              redirect={productNoWidgets?.redirect || ''}
              redirectURL={productNoWidgets?.redirectURL || ''}
            />
          </div>
          <div
            style={{
              position: 'fixed',
              top: pos.y,
              left: pos.x,
              width: 10,
              height: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.03)', // fast transparent
              borderRadius: '50%',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          />
        </>
      )}
    </Box>
  );
}
