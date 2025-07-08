import { Stack, useTheme } from '@mui/material';
import { useDesign } from 'src/hooks/use-design';
import CHeading from 'src/sections/custom-components/c-heading';
import { IWidget } from 'src/types/product';

type Props = {
  widget: IWidget;
  langIndex: number;
};

export default function Heading({ widget, langIndex }: Props) {
  const theme = useTheme();
  const design = useDesign();
  const attributes = widget.childs[0].attributes;
  const heading = attributes.HeadingText.value[langIndex].val[0];
  const orientation = widget.style?.Orientation?.value[0];
  const margin = widget.style?.YMargin?.value[0];

  // Design
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const fontHeadlines = design.typography.headlines.font;
  const size = design.typography.headlines.size;
  const weight = design.typography.headlines.weight;

  return (
    <Stack>
      <CHeading
        value={heading}
        fontHeadlines={fontHeadlines}
        colorHeadlines={colorHeadlines}
        variant="h2"
        size={size}
        orientation={orientation}
        fontWeight={weight as 'regular' | 'bold'}
      />
    </Stack>
  );
}
