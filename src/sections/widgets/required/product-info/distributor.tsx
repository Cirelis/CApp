import { Stack, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import ManufacturerIcon from 'src/assets/icons/custom/productinfo/ic_manufacturer';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import CPara from 'src/sections/custom-components/c-para';
import { spacing, subAccIconSize } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
};

const producedInArr = [
  'Produced in', // en
  'Hergestellt in', // de
  'Producido en', // es
  'Produit en', // fr
  'Prodotto in', // it
];

const DistributorAccordionPreview: React.FC<Props> = ({
  design,
  widget,
  langIndex,
  onAccExpandWidget,
}) => {
  const theme = useTheme();

  // Content
  const distributorIndex = widget.childs.findIndex((accordion) => accordion.id === 'Distributor');
  const distributor = widget.childs[distributorIndex].attributes;

  // Style
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  // Design
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

  const text1 = producedInArr[langIndex];

  // Check if Accordion is open
  const accOpen = useBoolean();

  useEffect(() => {
    accOpen.setValue(widget.childs[distributorIndex].open);
  }, [widget, langIndex, distributorIndex, accOpen]);

  const handleAccordionChange = (expanded: boolean) => {
    onAccExpandWidget(expanded, 'Distributor');
  };

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <ManufacturerIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
          <CHeading
            value={distributor.WidgetHeadline_Distributor.value[langIndex]?.val[0]}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h3"
            size={sizeHeadlines}
            fontWeight={weightHeadlines}
          />
        </>
      }
      expanded={accOpen.value}
      onExpandAccordion={handleAccordionChange}
    >
      <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <CPara
            value="Distributor"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={distributor.ProductInfoResponsibleDistributor.value[langIndex]?.val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
        {/* ----- ADRESS -----*/}
        <Stack alignItems="flex-end">
          <CPara
            value={distributor.Street.value[langIndex]?.val[0]}
            variant="caption"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CPara
            value={`${distributor.City.value[langIndex]?.val[0]} ${distributor.PostalCode.value[langIndex]?.val[0]}`}
            variant="caption"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
        </Stack>
        {/* ----- CONTACT -----*/}
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <CPara
            value="Website"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            lowercase
            value={distributor.Link.value[langIndex]?.val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>

        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <CPara
            value="E-Mail"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            lowercase
            value={distributor.Email.value[langIndex]?.val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>

        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <CPara
            value={text1}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={distributor.ProducedIn.value[langIndex]?.val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
      </Stack>
    </CAccordionSub>
  );
};

export default DistributorAccordionPreview;
