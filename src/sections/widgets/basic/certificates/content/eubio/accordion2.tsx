import React from 'react';
import { alpha, Stack, useTheme } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { Iconify } from 'src/components/iconify';
import {
  CertificateIcon,
  ChemicalLeafcon,
  PercentIcon,
  TaskCheckIcon,
} from 'src/assets/icons/custom';

import { IDesign, IWidgetChilds } from 'src/types/product';
import { ICertificate } from 'src/types/certificates';
import { subAccIconSize } from 'src/styleguide';

interface CertificateDialogProps {
  eubio: IWidgetChilds;
  certificate?: ICertificate;
  design: IDesign;
  langIndex: number;
}

// 2nd Accordion: "Weniger ist mehr!" etc.

// Main headings (top of 2nd accordion)
const head2Arr = [
  // English
  'Less is more!',
  // German
  'Weniger ist mehr!',
  // Spanish
  '¡Menos es más!',
  // French
  'Moins, c’est plus !',
  // Italian
  'Meno è di più!',
];

// Paragraph text under main heading (2nd accordion)
const text2Arr = [
  // English
  'Organic products come with significantly fewer additives. Anything that isn’t necessary is left out.',
  // German
  'Bio-Produkte kommen mit deutlich weniger Zusatzstoffen aus. Was nicht nötig ist, bleibt draußen.',
  // Spanish
  'Los productos ecológicos contienen significativamente menos aditivos. Todo lo que no es necesario se elimina.',
  // French
  'Les produits biologiques contiennent nettement moins d’additifs. Tout ce qui n’est pas nécessaire est exclu.',
  // Italian
  'I prodotti biologici contengono significativamente meno additivi. Tutto ciò che non è necessario viene lasciato fuori.',
];

// Sub-bullet headings (2nd accordion)
const bullet2HeadingsArr = [
  // English
  ['Clear ingredients without tricks', 'Fewer additives', 'At least 95% organic ingredients'],
  // German
  ['Klare Zutaten ohne Tricks', 'Weniger Zusatzstoffe', 'Mindestens 95% Bio-Zutaten'],
  // Spanish
  ['Ingredientes claros sin trucos', 'Menos aditivos', 'Al menos 95% de ingredientes ecológicos'],
  // French
  [
    'Des ingrédients clairs, sans astuces',
    'Moins d’additifs',
    'Au moins 95 % d’ingrédients biologiques',
  ],
  // Italian
  ['Ingredienti chiari senza trucchi', 'Meno additivi', 'Almeno il 95% di ingredienti biologici'],
];

// Sub-bullet paragraphs (2nd accordion)
const bullet2TextsArr = [
  // English
  [
    'No artificial colorings, flavors, or flavor enhancers allowed.',
    'Only about 50 additives are permitted in organic products, compared to over 300 in conventional food processing.',
    'Processed organic products must contain at least 95% organic ingredients.',
  ],
  // German
  [
    'Keine künstlichen Farbstoffe, Aromen oder Geschmacksverstärker erlaubt.',
    'Nur ca. 50 Zusatzstoffe sind in Bio erlaubt, statt der mehr als 300 in der konventionellen Lebensmittelverarbeitung.',
    'Verarbeitete Bio-Produkte müssen zu mindestens 95% aus ökologischen Zutaten bestehen.',
  ],
  // Spanish
  [
    'No se permiten colorantes, aromas ni potenciadores del sabor artificiales.',
    'Solo se permiten unos 50 aditivos en productos ecológicos, en comparación con más de 300 en el procesamiento de alimentos convencional.',
    'Los productos ecológicos procesados deben contener al menos un 95% de ingredientes ecológicos.',
  ],
  // French
  [
    'Pas de colorants, d’arômes ni d’exhausteurs de goût artificiels autorisés.',
    'Seuls environ 50 additifs sont autorisés dans les produits bio, contre plus de 300 en transformation alimentaire conventionnelle.',
    'Les produits biologiques transformés doivent contenir au moins 95 % d’ingrédients biologiques.',
  ],
  // Italian
  [
    'Non sono consentiti coloranti, aromi o esaltatori di sapidità artificiali.',
    'Sono consentiti solo circa 50 additivi nei prodotti biologici, contro oltre 300 nella lavorazione alimentare convenzionale.',
    'I prodotti biologici trasformati devono contenere almeno il 95% di ingredienti biologici.',
  ],
];

// Optional icons for each bullet point (2nd accordion)
const bullet2Icons = [
  'healthicons:agriculture', // For "Clear ingredients..."
  'mdi:compost', // For "Fewer additives"
  'mdi:organic-outline', // For "At least 95%..."
];

const Accordion2: React.FC<CertificateDialogProps> = ({
  eubio,
  certificate,
  design,
  langIndex,
}) => {
  const theme = useTheme();
  // Style
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorIcons = design.style.icons.iconColor || theme.palette.primary.main;
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const expanded = useBoolean();
  const handleAccordion2 = (ex: boolean) => {
    expanded.setValue(ex);
  };

  // Select the text in the current language
  const head2 = head2Arr[langIndex] || '';
  const text2 = text2Arr[langIndex] || '';
  const bulletHeadings2 = bullet2HeadingsArr[langIndex] || [];
  const bulletTexts2 = bullet2TextsArr[langIndex] || [];

  if (!certificate) return null;

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          {/* Reuse the same CertificateIcon, or choose a different one */}
          <Iconify
            icon="material-symbols:science-off-outline-rounded"
            color={alpha(colorSubIcons, 0.6)}
            width={subAccIconSize}
            height={subAccIconSize}
          />
          <CHeading
            value={head2}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h3"
            size="m"
            fontWeight={weightHeadlines}
          />
        </>
      }
      expanded={expanded.value}
      onExpandAccordion={handleAccordion2}
    >
      {/* Main paragraph */}
      <Stack display="flex" flexDirection="column" alignItems="flex-start" sx={{ mb: 2 }}>
        <CPara
          value={text2}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
      </Stack>

      {/* Three bullet points */}
      <Stack
        display="flex"
        flexDirection="column"
        alignItems="center" // Center icon+heading container
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Icon + heading in the center */}
        <Stack display="flex" flexDirection="column" alignItems="center">
          <TaskCheckIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings2[0]}
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
            value={bulletTexts2[0]}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
        </Stack>
      </Stack>

      <Stack
        display="flex"
        flexDirection="column"
        alignItems="center" // Center icon+heading container
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Icon + heading in the center */}
        <Stack display="flex" flexDirection="column" alignItems="center">
          <ChemicalLeafcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings2[1]}
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
            value={bulletTexts2[1]}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
        </Stack>
      </Stack>
      <Stack
        display="flex"
        flexDirection="column"
        alignItems="center" // Center icon+heading container
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Icon + heading in the center */}
        <Stack display="flex" flexDirection="column" alignItems="center">
          <PercentIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings2[2]}
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
            value={bulletTexts2[2]}
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
        </Stack>
      </Stack>
    </CAccordionSub>
  );
};

export default Accordion2;
