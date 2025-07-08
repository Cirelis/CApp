import React from 'react';
import { alpha, Box, Stack, useTheme } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { Iconify } from 'src/components/iconify';
import { CertificateIcon, CheckSprechIcon, LeafHandIcon } from 'src/assets/icons/custom';

import { IDesign, IWidgetChilds } from 'src/types/product';
import { ICertificate } from 'src/types/certificates';
import CButton from 'src/sections/custom-components/c-button';
import CLabel from 'src/sections/custom-components/c-label';
import { subAccIconSize } from 'src/styleguide';

interface CertificateDialogProps {
  eubio: IWidgetChilds;
  certificate?: ICertificate;
  design: IDesign;
  langIndex: number;
}

const head4Arr = [
  // English
  'The EU Organic Seal',
  // German
  'Das EU Bio Siegel',
  // Spanish
  'El sello bio de la UE',
  // French
  'Le label bio de l’UE',
  // Italian
  'Il marchio bio dell’UE',
];

// Paragraph text under main heading (3rd accordion)
const text4Arr = [
  // English
  'Organic products come with significantly fewer additives. Anything that is not necessary is left out.',
  // German
  'Bio-Produkte kommen mit deutlich weniger Zusatzstoffen aus. Was nicht nötig ist, bleibt draußen.',
  // Spanish
  'Los productos ecológicos contienen significativamente menos aditivos. Todo lo que no es necesario se queda fuera.',
  // French
  'Les produits biologiques contiennent nettement moins d’additifs. Tout ce qui n’est pas nécessaire est exclu.',
  // Italian
  'I prodotti biologici contengono significativamente meno additivi. Tutto ciò che non è necessario viene lasciato fuori.',
];

const bullet4HeadingsArr = [
  'The standard for the entire EU',
  'Der Standard für die gesamte EU',
  'El estándar para toda la UE',
  'La norme pour l’ensemble de l’UE',
  'Lo standard per tutta l’UE',
];

const bullet4TextsArr = [
  'The EU Organic Logo certifies products that have been produced, processed and inspected according to the strict requirements of the EU Organic Regulation.',
  'Das EU-Bio-Siegel kennzeichnet Produkte, die nach den strengen Vorgaben der EU-Öko-Verordnung ökologisch erzeugt, verarbeitet und kontrolliert wurden',
  'El sello ecológico de la UE distingue a los productos que han sido producidos, procesados y controlados de acuerdo con los estrictos requisitos del Reglamento Ecológico de la UE.',
  'Le label bio de l’UE identifie les produits qui ont été produits, transformés et contrôlés selon les exigences strictes du règlement européen sur l’agriculture biologique.',
  'Il marchio bio dell’UE indica i prodotti che sono stati prodotti, lavorati e controllati in conformità con i rigorosi requisiti del regolamento biologico dell’UE.',
];

const buttonArr = [
  'Certificate', // en
  'Zertifikat', // de
  'Certificado', // es
  'Certificat', // fr
  'Certificato', // it
];

const tag1Arr = [
  'Certification Body Number', // en
  'Prüfstelle Nummer', // de
  'Número del organismo de certificación', // es
  'Numéro de l’organisme de certification', // fr
  'Numero dell’ente di certificazione', // it
];

const tag2Arr = [
  'Certification Body', // en
  'Kontrollstelle', // de
  'Organismo de control', // es
  'Organisme de contrôle', // fr
  'Organismo di controllo', // it
];

const Accordion3: React.FC<CertificateDialogProps> = ({
  eubio,
  certificate,
  design,
  langIndex,
}) => {
  const theme = useTheme();
  // Style
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorIcons = design.style.icons.iconColor || theme.palette.primary.main;
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor;
  const buttonSize = (design.style.buttons.size as 'small' | 'large' | 'medium') || 'small';

  const expanded = useBoolean();
  const handleAccordion3 = (ex: boolean) => {
    expanded.setValue(ex);
  };

  // Select the text in the current language
  const head4 = head4Arr[langIndex] || '';
  const text4 = text4Arr[langIndex] || '';
  const bulletHeadings4 = bullet4HeadingsArr[langIndex] || '';
  const bulletTexts4 = bullet4TextsArr[langIndex] || '';
  const button1 = buttonArr[langIndex];
  const tag1 = tag1Arr[langIndex] || '';
  const tag2 = tag2Arr[langIndex] || '';

  const handleCertButton = () => {
    window.location.assign(
      `https://webgate.ec.europa.eu/tracesnt/directory/publication/organic-operator/${eubio.attributes.EUBio_CertNumber.value[langIndex].val}.pdf`
    );
  };

  // If no certificate is passed, don't render the accordion
  if (!certificate) return null;

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          {/* Reuse the same CertificateIcon or pick a new one */}
          <Iconify
            icon="tabler:certificate"
            color={alpha(colorSubIcons, 0.6)}
            width={subAccIconSize}
            height={subAccIconSize}
          />
          <CHeading
            value={head4}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h3"
            size="m"
            fontWeight={weightHeadlines}
          />
        </>
      }
      expanded={expanded.value}
      onExpandAccordion={handleAccordion3}
    >
      <Stack
        display="flex"
        flexDirection="column"
        alignItems="center" // Center icon+heading container
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Icon + heading in the center */}
        <Stack display="flex" flexDirection="column" alignItems="center">
          <LeafHandIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings4}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h3"
            size="s"
            fontWeight={weightHeadlines}
          />
        </Stack>
        {/* Paragraph left-aligned */}
        <Stack alignItems="flex-start" width="100%" sx={{ mt: -2 }}>
          <CPara
            value={bulletTexts4}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
        </Stack>
        <Stack display="flex" flexDirection="column" alignItems="center">
          <CertificateIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CButton
            onClick={handleCertButton}
            variant={buttonStyle}
            buttonColor={buttonColor}
            textColor={buttonTextColor}
            size={buttonSize}
          >
            <Iconify icon="mdi:download" width={24} sx={{ mr: 1 }} />
            {button1}
          </CButton>
        </Stack>
        <Stack alignItems="center">
          <CheckSprechIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }} spacing={2}>
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
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }} spacing={2}>
              <CPara
                value={tag2}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
              />
              <CLabel
                value={eubio.attributes.EUBio_CertBody.value[langIndex].val[0]}
                color={colorLabel}
                textColor={colorTextLabel}
                font={fontLabel}
                fontWeight={weightLabel}
                size={sizePara}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </CAccordionSub>
  );
};

export default Accordion3;
