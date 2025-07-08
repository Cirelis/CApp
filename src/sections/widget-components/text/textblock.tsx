import { Stack, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDesign } from 'src/hooks/use-design';
import CPara from 'src/sections/custom-components/c-para';
import { IWidget } from 'src/types/product';

type Props = {
  widget: IWidget;
  langIndex: number;
};

export default function Textblock({ widget, langIndex }: Props) {
  const theme = useTheme();
  const design = useDesign();
  const textblock = widget.childs[0].attributes.TextBlockContent.value[langIndex].val[0];
  const orientation = widget.style?.Orientation?.value[0];
  const margin = widget.style?.YMargin?.value[0];

  // Design
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const fontPara = design.typography.paragraphs.font;
  const size = design.typography.paragraphs.size;
  const weight = design.typography.paragraphs.weight;

  return (
    <Stack>
      <CPara
        value={textblock}
        font={fontPara}
        color={colorPara}
        size={size}
        orientation={orientation as 'left' | 'center' | 'right'}
        fontWeight={weight as 'regular' | 'bold'}
      />
    </Stack>
  );
}
