import { useMatomo } from '@datapunt/matomo-tracker-react';
import { alpha, Button, Card, Stack, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { PatosIcon } from 'src/assets/icons/custom';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { accIconSize, spacing } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview: boolean;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

// 2. Create arrays for each text
const button1Arr = [
  'Request an appointment now!', // en
  'Jetzt Termin anfragen!', // de
  '¡Solicita una cita ahora!', // es
  'Demander un rendez-vous dès maintenant !', // fr
  'Richiedi un appuntamento ora!', // it
];

const button2Arr = [
  'Learn more about Patos', // en
  'Mehr über Patos erfahren', // de
  'Conoce más sobre Patos', // es
  'En savoir plus sur Patos', // fr
  'Scopri di più su Patos', // it
];

const button3Arr = [
  'True-cost study at Penny', // en
  'True-Cost Studie bei Penny', // de
  'Estudio de costes reales en Penny', // es
  'Étude True-Cost chez Penny', // fr
  'Studio True-Cost da Penny', // it
];

const text1Arr = [
  'Do you want to educate your customers about True Cost or the ecological footprint?', // en
  'Du willst deine Kunden über True-Cost oder den ökologischen Fußabdruck aufklären?', // de
  '¿Quieres informar a tus clientes sobre True-Cost o la huella ecológica?', // es
  'Voulez-vous informer vos clients sur le True-Cost ou l’empreinte écologique ?', // fr
  'Vuoi informare i tuoi clienti su True-Cost o l’impronta ecologica?', // it
];

const text2Arr = [
  'With our partner PATOS, we determine and communicate the ecological impact of your products!', // en
  'Mit unserem Partner PATOS ermitteln und kommunizieren wir die ökologischen Auswirkungen eurer Produkte!', // de
  '¡Con nuestro socio PATOS, determinamos y comunicamos el impacto ecológico de tus productos!', // es
  'Avec notre partenaire PATOS, nous déterminons et communiquons l’impact écologique de vos produits !', // fr
  'Con il nostro partner PATOS, determiniamo e comunichiamo l’impatto ecologico dei tuoi prodotti!', // it
];

export default function Patos({
  widget,
  langIndex,
  preview,
  onAccExpandSubWidget,
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
  const cardColor = '#E8E8FF';
  modDesign.style.cards.color = cardColor;

  const primaryColor = '#3F3F58';

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const sizePara = design.typography.paragraphs.size;

  const button1 = button1Arr[langIndex];
  const button2 = button2Arr[langIndex];
  const button3 = button3Arr[langIndex];
  const text1 = text1Arr[langIndex];
  const text2 = text2Arr[langIndex];

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
      trackEvent({ category: trackId, action: 'patosEmail', value: 1 });
      window.location.href = `mailto:info@patos-solutions.de`;
    }
  };

  const handleWebsite = () => {
    if (!preview) {
      trackEvent({ category: trackId, action: 'patosWebsite', value: 1 });
      window.location.assign('https://www.patos-solutions.de/');
    }
  };

  const handleStudy = () => {
    if (!preview) {
      trackEvent({ category: trackId, action: 'patosStudy', value: 1 });
      window.location.assign(
        'https://www.uni-greifswald.de/forschung/nachrichten-aus-der-forschung/detail/n/wunsch-nach-transparenz-von-lebensmitteln-ist-messbar-gewachsen-ergebnisse-der-wahre-kosten-kampagne-mit-penny-liegen-vor-new65af6b3d5440e125960425/'
      );
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
            <PatosIcon color={primaryColor} width={accIconSize} height={accIconSize} />
            <CHeading
              value="True-Cost Marketing"
              fontHeadlines={fontHeadlines}
              colorHeadlines={primaryColor}
              variant="h2"
              size={sizeHeadlines}
              fontWeight={weightHeadlines}
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        <Stack
          spacing={spacing.contentSpacingM[design.style.general.spacing]}
          sx={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <Image src="/logo/cirelis_patos.png" />
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            <CHeading
              value={text1}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h3"
              size="s"
              fontWeight={weightHeadlines}
              orientation="center"
            />
            <CPara
              value={text2}
              font={fontPara}
              color={primaryColor}
              size={sizePara}
              fontWeight={weightPara}
              orientation="center"
            />
          </Stack>
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
              onClick={handleWebsite}
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
              onClick={handleStudy}
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
                icon="mdi:shop-find-outline"
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
