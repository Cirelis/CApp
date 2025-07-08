import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Image } from 'src/components/image';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { spacing } from 'src/styleguide';
import { ICustomCert } from 'src/types/certificates';
import { IDesign } from 'src/types/product';

interface CertificateDialogProps {
  certificate?: ICustomCert;
  design: IDesign;
  langIndex: number;
}

const Custom: React.FC<CertificateDialogProps> = ({ certificate, design, langIndex }) => {
  const theme = useTheme();
  // Style
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  if (!certificate) return null;

  return (
    <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Image src={certificate.labelPicture} sx={{ width: '30%' }} />
      </Box>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CHeading
          value={certificate.title[langIndex].val}
          fontHeadlines={fontHeadlines}
          colorHeadlines={colorHeadlines}
          variant="h2"
          size="l"
          fontWeight={weightHeadlines}
        />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Image
          alt={certificate.title[langIndex].val}
          src={certificate.labelDetailsPicture}
          sx={{ width: '60%' }}
        />
      </Box>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CPara
          value={certificate.description[langIndex].val}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
      </Stack>
    </Stack>
  );
};

export default Custom;
