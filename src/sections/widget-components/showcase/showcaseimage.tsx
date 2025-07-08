import { Stack } from '@mui/material';
import { IWidget } from 'src/types/product';
import { useDesign } from 'src/hooks/use-design';
import { Image } from 'src/components/image';

type Props = {
  widget: IWidget;
  langIndex: number;
};

export default function ShowcaseImage({ widget, langIndex }: Props) {
  const design = useDesign();
  const ratio = widget.style.Ratio.value[0] as `${number}/${number}`;

  const img = widget.childs[0].attributes.Image.value[langIndex].val[0];
  const margin = widget.style?.YMargin?.value[0];
  const orientation = widget.style?.Orientation?.value[0];

  return (
    <Stack sx={{ textAlign: orientation, alignItems: orientation }}>
      <Image
        src={img}
        ratio={ratio as `${number}/${number}`}
        // borderRadius={design.style.cards.borderradius}
      />
    </Stack>
  );
}
