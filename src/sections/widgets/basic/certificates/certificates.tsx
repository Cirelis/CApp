import { Box, Card, Stack, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { _certificatesContent } from 'src/_mock/_certificatesContent';
import { useGetLabelsById } from 'src/api/product/labels';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';
import { Image } from 'src/components/image';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CPara from 'src/sections/custom-components/c-para';
import { getVariant } from 'src/sections/custom-components/get-variant';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { spacing } from 'src/styleguide';
import { ICertificate, ICustomCert } from 'src/types/certificates';
import { IDesign, IWidget } from 'src/types/product';
import CertificateDialog from './certificates-dialog';
import CertificateDialogCustom from './certificates-dialog-custom';
import CertificatePopover from './certificates-popover';
import CertificatePopoverCustom from './certificates-popover-custom';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview?: boolean;
  tags?: string[] | undefined;
  analytics?: boolean;
};

export default function Labels({ widget, langIndex, preview, tags, analytics }: Props) {
  const theme = useTheme();
  const design = useDesign();
  const companyId = useCompanyId();
  const productId = useProductId();
  const { labels } = useGetLabelsById(companyId || '');
  const matomoPath = `widget/${widget?.childs?.[0]?.attributes?.Label_ID}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const trackId = `widget/${widget?.childs?.[0]?.attributes?.Label_ID}/null/${productId}`;
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;

  const modDesign: IDesign = JSON.parse(JSON.stringify(design));
  const cardColor = design.style.colors.backgroundColor;
  modDesign.style.cards.color = cardColor;
  // Content

  const childsChange = JSON.stringify(widget.childs);
  const customChange = JSON.stringify(
    widget.childs.find((c) => c.id === 'Custom')?.attributes.Custom_Ids.value[langIndex].val
  );

  const [validCerts, setValidcerts] = useState<ICertificate[]>([]);
  const [validCustoms, setValidCustoms] = useState<ICustomCert[]>([]);

  const [popover, setPopover] = useState(false);
  const [popoverCustom, setPopoverCustom] = useState(false);

  useEffect(() => {
    const certs: ICertificate[] = [];
    let customs: ICustomCert[] = [];
    widget.childs.forEach((child) => {
      if (child.show) {
        const cert = _certificatesContent.find((certItem) => certItem.id === child.id);
        if (cert) {
          certs.push(cert);
        }
      }
      if (child.id === 'Custom') {
        const customSelected: string[] = child.attributes.Custom_Ids.value[langIndex].val.map(
          (item: string) => item
        );
        customs = labels.filter((customCert) => customSelected.includes(customCert.id));
      }
    });
    setValidcerts(certs);
    setValidCustoms(customs);
  }, [widget.childs, labels, childsChange, customChange, langIndex]);

  const totalItems = validCerts.length + validCustoms.length;

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: totalItems > 3 ? 3 : totalItems,
  });

  const getItemWidth = (count: number) => {

    if (count > 3) {
      return 70;
    }
    return 80;
  };

  const [selectedSiegel, setSelectedSiegel] = useState<ICertificate>();

  const handleOpenPopover = (siegel: ICertificate) => {
    setPopoverCustom(false);
    setSelectedSiegel(siegel);
    setPopover(true);
  };

  const [selectedCustomSiegel, setSelectedCustomSiegel] = useState<ICustomCert>();

  const handleOpenPopoverCustom = (siegel: ICustomCert) => {
    setPopover(false);
    setSelectedCustomSiegel(siegel);
    if (!siegel.redirect) {
      setPopoverCustom(true);
    }
  };

  const handleCancelPopover = () => {
    setPopover(false);
    setPopoverCustom(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel carousel={carousel}>
        {validCerts.map((item) => (
          <CarouselItem
            key={item.id}
            item={item}
            widgetProps={{ widget, design, langIndex, matomoPath, trackId, analytics, preview }}
            itemWidth={getItemWidth(totalItems)}
            onOpenPopover={handleOpenPopover}
          />
        ))}
        {validCustoms.map((item) => (
          <CarouselItemCustom
            key={item.id}
            item={item}
            widgetProps={{ widget, design, langIndex, matomoPath, trackId, analytics, preview }}
            itemWidth={getItemWidth(totalItems)}
            onOpenPopover={handleOpenPopoverCustom}
          />
        ))}
      </Carousel>
      {totalItems > 3 && (
        <Box
          sx={{
            mt: 0.5,
            display: 'flex',
            borderRadius: 2,
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <CarouselDotButtons
            variant="rounded"
            scrollSnaps={carousel.dots.scrollSnaps}
            selectedIndex={carousel.dots.selectedIndex}
            onClickDot={carousel.dots.onClickDot}
            sx={{ color: primaryColor }}
          />
        </Box>
      )}

      {popover && (
        <CertificatePopover
          widget={widget}
          langIndex={langIndex}
          onClose={handleCancelPopover}
          certificate={selectedSiegel}
          design={modDesign}
        />
      )}
      {popoverCustom && (
        <CertificatePopoverCustom
          onClose={handleCancelPopover}
          langIndex={langIndex}
          certificate={selectedCustomSiegel}
          design={modDesign}
        />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

type WidgetProps = {
  widget: IWidget;
  design: IDesign;
  langIndex: number;
  matomoPath: string;
  trackId: string;
  analytics?: boolean;
  preview?: boolean;
};

const CarouselItem = React.memo(
  ({
    item,
    widgetProps,
    itemWidth,
    onOpenPopover,
  }: {
    item: ICertificate;
    widgetProps: WidgetProps;
    itemWidth: number;
    onOpenPopover: (selectedSiegel: ICertificate) => void;
  }) => {
    const theme = useTheme();
    const design = useDesign();
    const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here

    // Style
    const modDesign: IDesign = JSON.parse(JSON.stringify(widgetProps.design));
    const cardColor = widgetProps.design.style.colors.backgroundColor;
    modDesign.style.cards.color = cardColor;

    const { coverUrl, title } = item;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSiegel, setSelectedSiegel] = useState<ICertificate>();

    const handleOpenDialog = (siegel: ICertificate, widget: IWidget) => {
      if (!widgetProps.preview) {
        sessionTrackerRef.current?.startSession();
        setSelectedSiegel(siegel);
        setDialogOpen(true);
      } else {
        onOpenPopover(siegel);
      }
    };

    const handleCancelDialog = () => {
      if (!widgetProps.preview) {
        sessionTrackerRef.current?.endSession();
        setDialogOpen(false);
      }
    };

    return (
      <>
        {widgetProps.analytics && (
          <SessionTracker
            ref={sessionTrackerRef}
            matomoPath={widgetProps.matomoPath}
            trackId={widgetProps.trackId}
            onSessionEnd={(time) => ({})}
            onSessionTimeUpdate={(time) => ({})}
          />
        )}
        <m.div
          variants={getVariant('bounceIn')}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Card
            onClick={() => handleOpenDialog(item, widgetProps.widget)}
            sx={{
              height: 65,
              width: itemWidth,
              display: 'flex',
              borderRadius: widgetProps.design.style.cards.borderradius,
              boxShadow: 5,
              justifyContent: 'center',
              alignItems: 'center',
              p: spacing.containerPadding[design.style.general.spacing],
            }}
          >
            <Image
              alt={title}
              src={coverUrl}
              sx={{
                width: 60,
                height: 1,
                '& img': {
                  objectFit: 'contain !important',
                },
              }}
            />
          </Card>
          {/* </IconButton> */}
        </m.div>
        <CertificateDialog
          widget={widgetProps.widget}
          langIndex={widgetProps.langIndex}
          open={dialogOpen}
          onClose={handleCancelDialog}
          certificate={selectedSiegel}
          design={modDesign}
        />
      </>
    );
  }
);

// ----------------------------------------------------------------------

const CarouselItemCustom = React.memo(
  ({
    item,
    widgetProps,
    itemWidth,
    onOpenPopover,
  }: {
    item: ICustomCert;
    widgetProps: WidgetProps;
    itemWidth: number;
    onOpenPopover: (selectedSiegel: ICustomCert) => void;
  }) => {
    const theme = useTheme();
    const design = useDesign();
    const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here

    // Style
    const modDesign: IDesign = JSON.parse(JSON.stringify(widgetProps.design));
    const cardColor = widgetProps.design.style.colors.backgroundColor;
    const fontPara = widgetProps.design.typography.paragraphs.font;
    const weightPara = widgetProps.design.typography.paragraphs.weight as 'regular' | 'bold';
    const colorPara = widgetProps.design.typography.paragraphs.color || theme.palette.text.primary;
    const sizePara = widgetProps.design.typography.paragraphs.size;
    modDesign.style.cards.color = cardColor;

    const { labelPicture, title, showTitle } = item;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSiegel, setSelectedSiegel] = useState<ICustomCert>();

    const handleOpenDialog = (siegel: ICustomCert, widget: IWidget) => {
      if (!widgetProps.preview) {
        if (siegel.redirect) {
          window.location.href = siegel.redirectURL;
        }
        sessionTrackerRef.current?.startSession();
        setSelectedSiegel(siegel);
        setDialogOpen(true);
      } else {
        onOpenPopover(siegel);
      }
    };

    const handleCancelDialog = () => {
      if (!widgetProps.preview) {
        sessionTrackerRef.current?.endSession();
        setDialogOpen(false);
      }
    };

    return (
      <Stack spacing={spacing.inlineSpacing[design.style.general.spacing]}>
        {widgetProps.analytics && (
          <SessionTracker
            ref={sessionTrackerRef}
            matomoPath={widgetProps.matomoPath}
            trackId={widgetProps.trackId}
            onSessionEnd={(time) => ({})}
            onSessionTimeUpdate={(time) => ({})}
          />
        )}
        <m.div
          variants={getVariant('bounceIn')}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: 100, // TODO: Set this to the desired height
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Card
            onClick={() => handleOpenDialog(item, widgetProps.widget)}
            sx={{
              height: 65,
              width: itemWidth,
              display: 'flex',
              borderRadius: widgetProps.design.style.cards.borderradius,
              boxShadow: 5,
              justifyContent: 'center',
              alignItems: 'center',
              p: spacing.containerPadding[design.style.general.spacing],
            }}
          >
            <Image
              src={labelPicture}
              sx={{
                width: 60,
                height: 1,
                '& img': {
                  objectFit: 'contain !important',
                },
              }}
            />
          </Card>
          {/* </IconButton> */}
        </m.div>
        {showTitle && (
          <Stack>
            <CPara
              value={title[widgetProps.langIndex].val}
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
              orientation="center"
            />
          </Stack>
        )}
        <CertificateDialogCustom
          open={dialogOpen}
          onClose={handleCancelDialog}
          langIndex={widgetProps.langIndex}
          certificate={selectedSiegel}
          design={modDesign}
        />
      </Stack>
    );
  }
);
