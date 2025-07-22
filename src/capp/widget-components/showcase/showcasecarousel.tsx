import { Stack } from '@mui/material';
import { IWidget } from 'src/types/product';
import { useDesign } from 'src/hooks/use-design';
import { CarouselParallax } from './carousel-parallax';


type Props = {
  widget: IWidget;
  langIndex: number;
};

type carouselData = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
}[];

export default function ShowcaseCarousel({ widget, langIndex }: Props) {
  const design = useDesign();
  const attributes = widget.childs[0].attributes;

  const img1 = attributes.Image1.value[langIndex].val[0];
  const img2 = attributes.Image2.value[langIndex].val[0];
  const img3 = attributes.Image3.value[langIndex].val[0];
  const img4 = attributes.Image4.value[langIndex].val[0];

  const styles = widget.style;
  const ratio = styles.Ratio.value[0] as `${number}/${number}`;

  const carouselData: carouselData = [
    {
      id: '',
      title: '',
      coverUrl: img1,
      description: '',
    },
    {
      id: '',
      title: '',
      coverUrl: img2,
      description: '',
    },
    {
      id: '',
      title: '',
      coverUrl: img3,
      description: '',
    },
    {
      id: '',
      title: '',
      coverUrl: img4,
      description: '',
    },
  ];

  return (
    <Stack>
      <CarouselParallax data={carouselData}/>
    </Stack>
  );
}
