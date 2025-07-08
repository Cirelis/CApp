import { Box, IconButton, Stack, useTheme } from '@mui/material';
import CHeading from 'src/sections/custom-components/c-heading';
import { IDesign } from 'src/types/product';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import CPara from 'src/sections/custom-components/c-para';
import { spacing } from 'src/styleguide';

type Props = {
  design: IDesign;
  title: string;
  icon: string;
  iconColor?: string;
  address: { street: string; city: string };
};

export const Store: React.FC<Props> = ({ title, design, icon, iconColor, address }) => {
  const theme = useTheme();

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  return (
    <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
      <Stack direction="row" alignItems="center" spacing={spacing.inlineSpacing[design.style.general.spacing]}>
        <CHeading
          value={title}
          fontHeadlines={fontHeadlines}
          colorHeadlines={colorHeadlines}
          variant="h2"
          size={sizeHeadlines}
          fontWeight="bold"
          orientation="left"
        />
        <Label variant="filled" sx={{ p: 0 }}>
          <Iconify icon={icon} color={iconColor} />
        </Label>
      </Stack>
      <Box>
        <CPara
          value={address.street}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
        <CPara
          value={address.city}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
      </Box>
    </Stack>
  );
};
