import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Image } from 'src/components/image';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import CPara from 'src/sections/custom-components/c-para';
import { spacing } from 'src/styleguide';
import { ICertificate } from 'src/types/certificates';
import { IDesign, IWidgetChilds } from 'src/types/product';
import Accordion1 from './accordion1';
import Accordion2 from './accordion2';
import Accordion3 from './accordion3';
import Accordion4 from './accordion4';

interface CertificateDialogProps {
  eubio: IWidgetChilds;
  certificate?: ICertificate;
  design: IDesign;
  langIndex: number;
}

const tag1Arr = [
  'Certification Body', // en
  'Kontrollstelle', // de
  'Organismo de control', // es
  'Organisme de contrôle', // fr
  'Organismo di controllo', // it
];

const tag2Arr = [
  'Contact', // en
  'Kontakt', // de
  'Contacto', // es
  'Contact', // fr
  'Contatto', // it
];

const tag3Arr = [
  'Region of Origin', // en
  'Herkunftsregion', // de
  'Región de origen', // es
  'Région d’origine', // fr
  'Regione di origine', // it
];

const EUBio: React.FC<CertificateDialogProps> = ({ eubio, certificate, design, langIndex }) => {
  const theme = useTheme();
  // Style
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor || secondaryColor;
  const buttonSize = (design.style.buttons.size as 'small' | 'large' | 'medium') || 'small';
  const { backgroundColor } = design.style.colors;
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorIcons = design.style.icons.iconColor || theme.palette.primary.main;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const tag1 = tag1Arr[langIndex] || '';
  const tag2 = tag2Arr[langIndex] || '';
  const tag3 = tag3Arr[langIndex] || '';

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
        <Image src={certificate.coverUrl} sx={{ width: '35%' }} />
      </Box>
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CHeading
          value={eubio.attributes.EUBio_CertName.value[langIndex].val[0]}
          fontHeadlines={fontHeadlines}
          colorHeadlines={colorHeadlines}
          variant="h2"
          size="l"
          fontWeight={weightHeadlines}
        />
      </Stack>
      <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
        <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between' }}>
          <CPara
            value={tag1}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={eubio.attributes.EUBio_CertBodyNumber.value[langIndex].val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between' }}>
          <CPara
            value={tag2}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={eubio.attributes.EUBio_Mail.value[langIndex].val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between' }}>
          <CPara
            value={tag3}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={eubio.attributes.EUBio_CertCountry.value[langIndex].val[0]}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
      </Stack>
      <Box>
        <Accordion1 eubio={eubio} certificate={certificate} design={design} langIndex={langIndex} />
        <Accordion2 eubio={eubio} certificate={certificate} design={design} langIndex={langIndex} />
        <Accordion3 eubio={eubio} certificate={certificate} design={design} langIndex={langIndex} />
        <Accordion4 eubio={eubio} certificate={certificate} design={design} langIndex={langIndex} />
      </Box>
    </Stack>
  );
};

export default EUBio;
