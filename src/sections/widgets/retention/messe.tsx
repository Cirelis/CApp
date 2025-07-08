import { useMatomo } from '@datapunt/matomo-tracker-react';
import { alpha, Button, Card, Stack, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CHeading from 'src/sections/custom-components/c-heading';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { accIconSize, spacing } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';

type Props = {
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  preview: boolean;
  tags?: string[] | undefined;
  analytics?: boolean;
};

const head1Arr = [
  'Use QR-Labels now!', // en
  'Jetzt QR-Labels nutzen!', // de
  '¡Utiliza las etiquetas QR ahora!', // es
  'Utilisez les étiquettes QR maintenant !', // fr
  'Usa subito le etichette QR!', // it
];

const button1Arr = [
  'Take part in the pilot phase', // en
  'Kontaktiere uns für dein Pilotlabel', // de
  'Participa en la fase piloto', // es
  'Participez à la phase pilote', // fr
  'Partecipa alla fase pilota', // it
];

const button2Arr = [
  'Cirelis Website', // en
  'Cirelis Website', // de
  'Sitio web de Cirelis', // es
  'Site Web de Cirelis', // fr
  'Sito web di Cirelis', // it
];

const button3Arr = [
  'Create QR-Labels with ease', // en
  'QR-Labels ganz einfach erstellen', // de
  'Crea etiquetas QR fácilmente', // es
  'Créez des étiquettes QR en toute simplicité', // fr
  'Crea facilmente QR-Labels', // it
];

const text1Arr = [
  'Want to find out more about Cirelis QR labels or our editor and CMS?',
  'Du willst mehr über Cirelis QR-Labels oder unseren Editor und CMS erfahren?',
  '¿Quieres saber más sobre las etiquetas QR de Cirelis o nuestro editor y CMS?',
  'Vous souhaitez en savoir plus sur les étiquettes QR de Cirelis ou notre éditeur et CMS ?',
  'Vuoi saperne di più sulle etichette QR di Cirelis o sul nostro editor e CMS?',
];

export default function Messe({
  widget,
  langIndex,
  preview,
  onAccExpandWidget,
  tags,
  analytics,
}: Props) {
  const theme = useTheme();
  const design = useDesign();
  const companyId = useCompanyId();
  const productId = useProductId();
  const { open } = widget;
  const accOpen = useBoolean(open);

  // Matomo
  const { trackEvent } = useMatomo();
  const trackId = `${companyId}/${productId}/${tags?.sort().join('/')}`;
  const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here
  const matomoPath = `widget/${widget.label.id}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const sessiontrackId = `widget/${widget.label.id}/null/${productId}`;

  const borderradius = design.style.cards.borderradius;
  const modDesign: IDesign = JSON.parse(JSON.stringify(design));
  const cardColor = '#E3F4EC';
  modDesign.style.cards.color = cardColor;

  const primaryColor = '#00AB55';

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const head1 = head1Arr[langIndex];
  const button1 = button1Arr[langIndex];
  const button2 = button2Arr[langIndex];
  const button3 = button3Arr[langIndex];
  const text1 = text1Arr[langIndex];

  const handleAccordionChange = (expanded: boolean) => {
    accOpen.setValue(expanded);
    if (analytics) {
      if (expanded) {
        sessionTrackerRef.current?.startSession();
      } else {
        sessionTrackerRef.current?.endSession();
      }
    }
    onAccExpandWidget(expanded, widget.id);
  };

  useEffect(() => {
    if (accOpen.value === true && widget.open === false && analytics) {
      sessionTrackerRef.current?.endSession();
    }
    accOpen.setValue(widget.open);
  }, [accOpen, widget.open, analytics]);

  const handleEmailClick = () => {
    if (!preview) {
      trackEvent({ category: trackId, action: 'messeEmail', value: 1 });
      window.location.href = `mailto:team@cirelis.de`;
    }
  };

  const handleWebsiteClick = () => {
    if (!preview) {
      trackEvent({ category: trackId, action: 'messeWebsite', value: 1 });
      window.location.assign('https://www.cirelis.de');
    }
  };

  const handleVideoClick = () => {
    if (!preview) {
      trackEvent({ category: trackId, action: 'messeVideo', value: 1 });
      window.location.assign('https://www.youtube.com/watch?v=kTiye_E_gpI');
    }
  };

  return (
    <Card sx={{ backgroundColor: cardColor, borderRadius: borderradius, border: 0, boxShadow: 3 }}>
      {analytics && (
        <SessionTracker
          ref={sessionTrackerRef}
          matomoPath={matomoPath}
          trackId={sessiontrackId}
          onSessionEnd={(time) => ({})}
          onSessionTimeUpdate={(time) => ({})}
        />
      )}
      <CAccordion
        preview={preview}
        design={modDesign}
        summary={
          <>
            <Iconify
              icon="mdi:qrcode-scan"
              color={primaryColor}
              width={accIconSize}
              height={accIconSize}
            />
            <CHeading
              value={head1}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h2"
              size={sizeHeadlines}
              fontWeight={weightHeadlines}
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        <Stack alignItems="center" spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <Iconify
            icon="mdi:rocket-launch-outline"
            color={primaryColor}
            width="55px"
            sx={{ mt: spacing.contentSpacingM[design.style.general.spacing] / 2 }}
          />
          <CHeading
            value={text1}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h3"
            size="s"
            fontWeight={weightHeadlines}
            orientation="center"
          />
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            <Button
              onClick={handleEmailClick}
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                '&:hover': {
                  backgroundColor: alpha(primaryColor, 0.8),
                },
                width: '100%',
              }}
            >
              <Iconify
                icon="mdi:email-outline"
                width={24}
                sx={{ mr: spacing.inlineSpacing[design.style.general.spacing] }}
              />
              {button1}
            </Button>
            <Button
              onClick={handleWebsiteClick}
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                '&:hover': {
                  backgroundColor: alpha(primaryColor, 0.8),
                },
                width: '100%',
              }}
            >
              <Iconify
                icon="mdi:web-asset"
                width={24}
                sx={{ mr: spacing.inlineSpacing[design.style.general.spacing] }}
              />
              {button2}
            </Button>
            <Button
              onClick={handleVideoClick}
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                '&:hover': {
                  backgroundColor: alpha(primaryColor, 0.8),
                },
                width: '100%',
              }}
            >
              <Iconify
                icon="mdi:library-video"
                width={24}
                sx={{ mr: spacing.inlineSpacing[design.style.general.spacing] }}
              />
              {button3}
            </Button>
          </Stack>
        </Stack>
      </CAccordion>
    </Card>
  );
}
