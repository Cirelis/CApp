import { alpha, Box, Stack, useTheme } from '@mui/material';
import { Image } from 'src/components/image';
import { IDesign } from 'src/types/product';
import { spacing } from 'src/styleguide';
import CHeading from './c-heading';
import CPara from './c-para';
import CLabel from './c-label';

type Props = {
  year: string;
  title: string;
  image: string;
  showImage: boolean;
  description: string;
  design: IDesign;
};

const CStorySection = ({ year, title, image, showImage, description, design }: Props) => {
  const theme = useTheme();

  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const colorPara = design.typography.paragraphs.color;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const sizePara = design.typography.paragraphs.size;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  return (
    <Stack spacing={spacing.inlineSpacing[design.style.general.spacing]}>
      <Stack
        direction="row"
        spacing={spacing.inlineSpacing[design.style.general.spacing]}
        sx={{
          borderRadius: design.style.cards.borderradius,
          boxShadow: 3,
          p: 0.25,
          m: 0,
          backgroundColor: alpha(primaryColor, 0.2),
          alignItems: 'center',
        }}
      >
        <CLabel
          color={primaryColor}
          textColor={theme.palette.common.white}
          font={fontLabel}
          fontWeight="regular"
          size="s"
          sx={{ px: 0.5, py: 0.25 }}
          value={year}
        />
        <CHeading
          value={title}
          fontHeadlines={fontHeadlines}
          colorHeadlines={colorHeadlines}
          variant="h4"
          size={sizeHeadlines}
          fontWeight={weightHeadlines}
        />
      </Stack>
      {showImage && (
        <Image src={image} ratio="16/9"
        //  borderRadius={design.style.cards.borderradius * 2} 
         />
      )}
      <CPara
        value={description}
        font={fontPara}
        color={colorPara}
        size={sizePara}
        fontWeight={weightPara}
      />
    </Stack>
  );
};

export default CStorySection;
