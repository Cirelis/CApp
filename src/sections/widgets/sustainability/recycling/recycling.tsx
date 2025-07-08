import { Stack, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { RecyclingIcon } from 'src/assets/icons/custom';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import CCard from 'src/sections/custom-components/c-card';
import CButton from 'src/sections/custom-components/c-button';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { IDesign, IWidget } from 'src/types/product';
import { Image } from 'src/components/image';
import { useDesign } from 'src/hooks/use-design';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useProductId } from 'src/hooks/use-product-id';
import { accIconSize, spacing } from 'src/styleguide';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview: boolean;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

const text1Arr = [
  'Empty the beaker and separate the components.', // en
  'Becher restentleeren und Bestandteile voneinander trennen.', // de
  'Vacía el vaso y separa los componentes.', // es
  'Videz le gobelet et séparez les composants.', // fr
  'Svuota il bicchiere e separa i componenti.', // it
];

const text2Arr = [
  'Dispose of components in yellow garbage can or recycling garbage can.', // en
  'Bestandteile in Gelber Tonne oder Wertstofftonne entsorgen.', // de
  'Desecha los componentes en el contenedor amarillo o en el contenedor de reciclaje.', // es
  'Jetez les composants dans la poubelle jaune ou la poubelle de recyclage.', // fr
  'Smaltisci i componenti nel bidone giallo o nel bidone per la raccolta differenziata.', // it
];

const step1Arr = [
  'Step 1', // en
  'Schritt 1', // de
  'Paso 1', // es
  'Étape 1', // fr
  'Fase 1', // it
];

const step2Arr = [
  'Step 2', // en
  'Schritt 2', // de
  'Paso 2', // es
  'Étape 2', // fr
  'Fase 2', // it
];

const button1Arr = [
  'Which trash bin do I have at home?', // en
  'Welche Tonne habe ich Zuhause?', // de
  '¿Qué contenedor tengo en casa?', // es
  'Quelle poubelle ai-je à la maison ?', // fr
  'Quale bidone ho a casa?', // it
];

const button2Arr = [
  'What is allowed in which trash bin?', // en
  'Was darf in welche Tonne?', // de
  '¿Qué se puede tirar en cada contenedor?', // es
  'Que peut-on mettre dans chaque poubelle ?', // fr
  'Cosa è consentito in ciascun bidone?', // it
];

const button3Arr = [
  'The initiative "Mülltrennung-wirkt"', // en
  'Die Initiative "Mülltrennung-wirkt"', // de
  'La iniciativa "Mülltrennung-wirkt"', // es
  'L’initiative « Mülltrennung-wirkt »', // fr
  'L’iniziativa "Mülltrennung-wirkt"', // it
];

export default function Recycling({
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
  const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here
  const matomoPath = `widget/${widget.label.id}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const trackId = `widget/${widget.label.id}/null/${productId}`;

  const { childs } = widget;
  const head = childs[0].attributes;

  const cardColor = design.style.cards.color;
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor || secondaryColor;
  const buttonSize = (design.style.buttons.size as 'small' | 'large' | 'medium') || 'small';

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];
  const sizePara = design.typography.paragraphs.size;

  const text1 = text1Arr[langIndex];
  const text2 = text2Arr[langIndex];
  const step1 = step1Arr[langIndex];
  const step2 = step2Arr[langIndex];
  const button1 = button1Arr[langIndex];
  const button2 = button2Arr[langIndex];
  const button3 = button3Arr[langIndex];

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

  const handle1 = () => {
    if (!preview) {
      window.location.assign('https://www.nuernberg.de/internet/abfallwirtschaft/');
    }
  };

  const handle2 = () => {
    if (!preview) {
      window.location.assign(
        'https://www.muelltrennung-wirkt.de/de/muelltrennung/was-gehoert-in-welche-tonne/'
      );
    }
  };

  const handle3 = () => {
    if (!preview) {
      window.location.assign('https://www.muelltrennung-wirkt.de/');
    }
  };

  return (
    <CCard design={design}>
      {analytics && (
        <SessionTracker
          ref={sessionTrackerRef}
          matomoPath={matomoPath}
          trackId={trackId}
          onSessionEnd={() => {}}
          onSessionTimeUpdate={() => {}}
        />
      )}
      <CAccordion
        preview={preview}
        design={design}
        summary={
          <>
            <Stack sx={{ p: 0.1 }}>
              <RecyclingIcon
                color={design.style.icons.iconColor}
                width={accIconSize}
                height={accIconSize}
              />
            </Stack>
            <CHeading
              value={head.WidgetHeadline_Recycling.value[langIndex]?.val[0]}
              fontHeadlines={design.typography.headlines.font}
              colorHeadlines={colorHeadlines}
              variant="h2"
              size={design.typography.headlines.size}
              fontWeight={design.typography.headlines.weight as 'regular' | 'bold'}
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <Stack
            sx={{ alignItems: 'center' }}
            spacing={spacing.contentSpacingS[design.style.general.spacing]}
          >
            <Image
              src="/assets/recycling/1.png"
              sx={{
                width: 250,
              }}
            />
            <CLabel
              value={step1}
              color={colorLabel}
              textColor={colorTextLabel}
              font={fontLabel}
              fontWeight={weightLabel}
              size={sizePara}
            />
            <CHeading
              value={text1}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h4"
              size="m"
              fontWeight={weightHeadlines}
              orientation="center"
            />
          </Stack>
          <Stack
            sx={{
              alignItems: 'center',
            }}
            spacing={spacing.contentSpacingS[design.style.general.spacing]}
          >
            <Image
              src="/assets/recycling/2.png"
              sx={{
                width: 250,
              }}
            />
            <CLabel
              value={step2}
              color={colorLabel}
              textColor={colorTextLabel}
              font={fontLabel}
              fontWeight={weightLabel}
              size={sizePara}
            />
            <CHeading
              value={text2}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h4"
              size="m"
              fontWeight={weightHeadlines}
              orientation="center"
            />
          </Stack>
          <CButton
            onClick={handle1}
            variant={buttonStyle}
            buttonColor={buttonColor}
            textColor={buttonTextColor}
            size={buttonSize}
          >
            <Iconify icon="mdi:location-radius-outline" width={24} sx={{ mr: 1 }} />
            {button1}
          </CButton>
          <CButton
            onClick={handle2}
            variant={buttonStyle}
            buttonColor={buttonColor}
            textColor={buttonTextColor}
            size={buttonSize}
          >
            <Iconify icon="mdi:trash-variant" width={24} sx={{ mr: 1 }} />
            {button2}
          </CButton>
          <CButton
            onClick={handle3}
            variant={buttonStyle}
            buttonColor={buttonColor}
            textColor={buttonTextColor}
            size={buttonSize}
          >
            <Iconify icon="mdi:web-asset" width={24} sx={{ mr: 1 }} />
            {button3}
          </CButton>
        </Stack>
      </CAccordion>
    </CCard>
  );
}
