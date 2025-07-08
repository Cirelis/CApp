import { Box, Stack, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { ProductInformationIcon } from 'src/assets/icons/custom';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CCard from 'src/sections/custom-components/c-card';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import CPara from 'src/sections/custom-components/c-para';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { accIconSize, spacing } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';
import DistributorAccordionPreview from './distributor';
import IngredientsAccordionPreview from './ingredients';
import NutrientsAccordionPreview from './nutrients';
import StorageAccordionPreview from './storage';

type Props = {
  widget: IWidget;
  langIndex: number;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  preview?: boolean;
  tags?: string[] | undefined;
  analytics?: boolean;
};

// Hauptkomponente
export default function ProductInfo({
  widget,
  langIndex,
  onAccExpandSubWidget,
  onAccExpandWidget,
  preview,
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

  const colorIcons = design.style.icons.iconColor || theme.palette.primary.main;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

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
          onSessionEnd={(time) => ({})}
          onSessionTimeUpdate={(time) => ({})}
        />
      )}
      <CAccordion
        preview={preview}
        design={design}
        summary={
          <>
            <Stack sx={{ p: 0.1 }}>
              <ProductInformationIcon color={colorIcons} width={accIconSize} height={accIconSize} />
            </Stack>
            <CHeading
              value={head.WidgetHeadline_ProductInformation.value[langIndex]?.val[0]}
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
        <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <CPara
            value={head.ProductInfoDescription.value[langIndex]?.val[0]}
            variant="caption"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            {head.ProductInfoBasicInformation.value[langIndex]?.val.map(
              (info: { key: string; value: string }, index: any) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ justifyContent: 'space-between' }}
                  key={`info-${index}`}
                  spacing={2}
                >
                  <CPara
                    value={info.key}
                    font={fontPara}
                    color={colorPara}
                    size={sizePara}
                    fontWeight={weightPara}
                  />
                  <CLabel
                    value={info.value}
                    color={colorLabel}
                    textColor={colorTextLabel}
                    font={fontLabel}
                    fontWeight={weightLabel}
                    size={sizePara}
                  />
                </Stack>
              )
            )}
          </Stack>
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
                      onAccExpandWidget={onAccExpandSubWidget}
                    />
                  )
              )}
          </Box>
        </Stack>
      </CAccordion>
    </CCard>
  );
}

// Verschiebung der inneren Komponenten nach außen
type CustomAccordionProps = {
  id: string;
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
};

function CustomAccordion({
  id,
  design,
  widget,
  langIndex,
  onAccExpandWidget,
}: CustomAccordionProps) {
  switch (id) {
    case 'Nutrients':
      return (
        <NutrientsAccordionPreview
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandWidget}
        />
      );
    case 'Ingredients':
      return (
        <IngredientsAccordionPreview
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandWidget}
        />
      );
    case 'Distributor':
      return (
        <DistributorAccordionPreview
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandWidget}
        />
      );
    case 'Storage':
      return (
        <StorageAccordionPreview
          design={design}
          widget={widget}
          langIndex={langIndex}
          onAccExpandWidget={onAccExpandWidget}
        />
      );
    default:
      return null;
  }
}
