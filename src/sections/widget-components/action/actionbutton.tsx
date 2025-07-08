import { useCallback } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { IWidget } from 'src/types/product';
import CButton from 'src/sections/custom-components/c-button';
import CHeading from 'src/sections/custom-components/c-heading';
import { useDesign } from 'src/hooks/use-design';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview: boolean;
};

export default function ActionButton({ widget, langIndex, preview }: Props) {
  const theme = useTheme();
  const design = useDesign();
  const attributes = widget.childs[0].attributes;
  const name = attributes.ButtonName;
  const url = attributes.ButtonUrl;

  const orientation = widget.style?.Orientation?.value[0];
  const margin = widget.style?.YMargin?.value[0];

  // Design
  const colorPrimary = design.style.colors.primaryColor || theme.palette.primary.main;
  const colorSecondary = design.style.colors.secondaryColor || theme.palette.secondary.main;
  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || colorPrimary;
  const buttonTextColor = design.style.buttons.textColor || colorSecondary;
  const buttonSize = design.style.buttons.size;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const sizeHeadlines = design.typography.headlines.size;

  const handleUrl = useCallback(() => {
    if (!preview) {
      // Open each document in a new tab/window
      window.open(url.value[langIndex].val[0], '_blank');
    }
  }, [preview, url, langIndex]);

  return (
    <Stack flexDirection="row" sx={{ justifyContent: orientation }}>
      <Box>
        <CButton
          onClick={handleUrl}
          variant={buttonStyle}
          buttonColor={buttonColor}
          textColor={buttonTextColor}
          size={buttonSize as 'small' | 'medium' | 'large'}
        >
          <CHeading
            value={name.value[langIndex].val[0]}
            fontHeadlines={fontHeadlines}
            colorHeadlines={buttonTextColor}
            variant="h4"
            size={sizeHeadlines}
            fontWeight={weightHeadlines}
          />
        </CButton>
      </Box>
    </Stack>
  );
}
