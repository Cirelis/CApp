import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Image } from 'src/components/image';
import { useBoolean } from 'src/hooks/use-boolean';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import CPara from 'src/sections/custom-components/c-para';
import { spacing } from 'src/styleguide';
import { ICertificate } from 'src/types/certificates';
import { IDesign, IWidgetChilds } from 'src/types/product';
import Accordion1 from './accordion1';

interface CertificateDialogProps {
  naturland: IWidgetChilds;
  langIndex: number;
  certificate?: ICertificate;
  design: IDesign;
}

const head1Arr = [
  'That`s how many hidden costs you`ve saved:', // en
  'So viele versteckte Kosten hast du gespart:', // de
  'Así de muchos costes ocultos has ahorrado:', // es
  'Voici combien de coûts cachés vous avez économisés :', // fr
  'Questi sono i costi nascosti che hai risparmiato:', // it
];

const text1Arr = [
  'That`s how many hidden costs you`ve saved:', // en
  'So viele versteckte Kosten hast du gespart:', // de
  'Así de muchos costes ocultos has ahorrado:', // es
  'Voici combien de coûts cachés vous avez économisés :', // fr
  'Questi sono i costi nascosti che hai risparmiato:', // it
];

const Naturland: React.FC<CertificateDialogProps> = ({
  naturland,
  langIndex,
  certificate,
  design,
}) => {
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

  const expanded1 = useBoolean();
  const handleAccordion1 = (expanded: boolean) => {
    expanded1.setValue(expanded);
  };

  const expanded2 = useBoolean();
  const handleAccordion2 = (expanded: boolean) => {
    expanded2.setValue(expanded);
  };

  const expanded4 = useBoolean();
  const handleAccordion4 = (expanded: boolean) => {
    expanded4.setValue(expanded);
  };

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
          value={certificate.title}
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
            value="Institution"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={certificate.data.institution || ''}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between' }}>
          <CPara
            value="Website"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={certificate.data.website || ''}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between' }}>
          <CPara
            value="Kontakt"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <CLabel
            value={certificate.data.contact || ''}
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          />
        </Stack>
      </Stack>
      <Accordion1
        naturland={naturland}
        certificate={certificate}
        design={design}
        langIndex={langIndex}
      />
    </Stack>
  );
};

export default Naturland;
