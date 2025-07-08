import { Box, Stack, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { SustainabilityIcon } from 'src/assets/icons/custom';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CCard from 'src/sections/custom-components/c-card';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { accIconSize, spacing } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';
import Co2 from './co2';
import Initiatives from './initiatives';
import Truecost from './truecost';
import Water from './water';

type Props = {
  preview?: boolean;
  widget: IWidget;
  langIndex: number;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

// Hauptkomponente
export default function Sustainability({
  preview,
  widget,
  langIndex,
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
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

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
              <SustainabilityIcon
                color={design.style.icons.iconColor}
                width={accIconSize}
                height={accIconSize}
              />
            </Stack>
            <CHeading
              value={head.WidgetHeadline_Sustainability.value[langIndex]?.val[0]}
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
          <CPara
            value={head.SustainabilityDescription.value[langIndex]?.val[0]}
            variant="caption"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          {/* <StackedBarChart /> */}
          <Box>
            {childs
              .slice(1)
              .map(
                (accordion: { show: any; id: string }, index: any) =>
                  accordion?.show && (
                    <CustomAccordion
                      id={accordion.id}
                      key={`accordion-${index}`}
                      design={design}
                      widget={widget}
                      langIndex={langIndex}
                      onAccExpandSubWidget={onAccExpandSubWidget}
                      preview={preview}
                    />
                  )
              )}
          </Box>
        </Stack>
      </CAccordion>
    </CCard>
  );
}

type CustomAccordionProps = {
  id: string;
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  preview?: boolean;
};

function CustomAccordion({
  id,
  design,
  widget,
  langIndex,
  onAccExpandSubWidget,
  preview,
}: CustomAccordionProps) {
  switch (id) {
    case 'Initiatives':
      return (
        <Initiatives
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandSubWidget}
        />
      );
    case 'Truecost':
      return (
        <Truecost
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandSubWidget}
          preview={preview}
        />
      );
    case 'Co2':
      return (
        <Co2
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandSubWidget}
          preview={preview}
        />
      );
    case 'Water':
      return (
        <Water
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandSubWidget}
          preview={preview}
        />
      );

    default:
      return null;
  }
}
