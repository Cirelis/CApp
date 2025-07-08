import { Stack, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import StorageIcon from 'src/assets/icons/custom/productinfo/ic_storage';
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

const StorageAccordionPreview: React.FC<Props> = ({
  design,
  widget,
  langIndex,
  onAccExpandWidget,
}) => {
  const theme = useTheme();

  // Content
  const storageIndex = widget.childs.findIndex((accordion) => accordion.id === 'Storage');
  const storage = widget.childs[storageIndex].attributes;

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

  // Check if Accordion is open
  const accOpen = useBoolean();

  useEffect(() => {
    accOpen.setValue(widget.childs[storageIndex].open);
  }, [widget, langIndex, storageIndex, accOpen]);

  const handleAccordionChange = (expanded: boolean) => {
    onAccExpandWidget(expanded, 'Storage');
  };

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <StorageIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
          <CHeading
            value={storage.WidgetHeadline_Storage.value[langIndex]?.val[0]}
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
        {storage.ProductInfoStorageFields.value[langIndex]?.val.map(
          (info: { key: string; value: string }) => (
            <Stack
              key={`${info.key}-${info.value}`}
              direction="row"
              alignItems="center"
              sx={{ justifyContent: 'space-between' }}
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
    </CAccordionSub>
  );
};

export default StorageAccordionPreview;
