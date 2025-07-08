import React, { useEffect, useState } from 'react';
import { Stack, useTheme } from '@mui/material';
import { IDesign, IWidget } from 'src/types/product';
import { _nutriReference } from 'src/_mock/_nutriReference';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { useBoolean } from 'src/hooks/use-boolean';
import { Image } from 'src/components/image';
import { InitiativeIcon } from 'src/assets/icons/custom/sustainability';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import { spacing, subAccIconSize } from 'src/styleguide';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
};

const Initiatives: React.FC<Props> = ({ design, widget, langIndex, onAccExpandWidget }) => {
  const theme = useTheme();

  // Content
  const initiativesIndex = widget.childs.findIndex((accordion) => accordion.id === 'Initiatives');
  const initiatives = widget.childs[initiativesIndex].attributes;

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

  // ----------------------------------------------------------------------

  // State für Toggle-Button
  const accOpen = useBoolean();
  // ----------------------------------------------------------------------

  // Check if Accordion is open
  useEffect(() => {
    accOpen.setValue(widget.childs[initiativesIndex].open);
  }, [widget, langIndex, initiativesIndex, accOpen]);

  // ----------------------------------------------------------------------

  const handleAccordionChange = (expanded: boolean) => {
    // accOpen.setValue(expanded);
    onAccExpandWidget(expanded, 'Initiatives');
  };

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <InitiativeIcon
            key="initiative"
            color={colorSubIcons}
            width={subAccIconSize}
            height={subAccIconSize}
          />
          <CHeading
            value={initiatives.WidgetHeadline_Initiatives.value[langIndex]?.val[0]}
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
      <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
        <CHeading
          value={initiatives.SubheadlineInitiatives.value[langIndex]?.val[0]}
          fontHeadlines={fontHeadlines}
          colorHeadlines={colorHeadlines}
          variant="h4"
          size={sizeHeadlines}
          fontWeight={weightHeadlines}
        />
        {initiatives.InitiativeShowPicture.value[langIndex]?.val[0] === 'X' && (
          <Image
            src={initiatives.InitiativePicture.value[langIndex]?.val[0]}
            ratio="16/9"
            // borderRadius={design.style.cards.borderradius}
          />
        )}
        <CPara
          value={initiatives.InitiativeDesc.value[langIndex]?.val[0]}
          variant="caption"
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
      </Stack>
    </CAccordionSub>
  );
};

export default Initiatives;
