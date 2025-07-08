import React from 'react';
import { alpha, Stack, useTheme } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { Iconify } from 'src/components/iconify';
import {
  BioLeavesIcon,
  CertificateIcon,
  CircularPlantIcon,
  PawHeartIcon,
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

const head3Arr = [
  // English
  'Animal Welfare and Soil Protection',
  // German
  'Tierwohl und Bodenschutz',
  // Spanish
  'Bienestar animal y protección del suelo',
  // French
  'Bien-être animal et protection des sols',
  // Italian
  'Benessere animale e protezione del suolo',
];

// Paragraph text under main heading (3rd accordion)
const text3Arr = [
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

// Sub-bullet headings (3rd accordion)
const bullet3HeadingsArr = [
  // English
  ['More Space & Free-Range Access for Animals', 'Organic Feed', 'Healthy Soils and Crop Rotation'],
  // German
  ['Mehr Platz & Auslauf für Tiere', 'Biologisches Futter', 'Gesunde Böden und Fruchtfolge'],
  // Spanish
  [
    'Más espacio y acceso al aire libre para los animales',
    'Alimentación ecológica',
    'Suelos saludables y rotación de cultivos',
  ],
  // French
  [
    'Plus d’espace et un accès à l’extérieur pour les animaux',
    'Alimentation biologique',
    'Des sols sains et une rotation des cultures',
  ],
  // Italian
  [
    'Più spazio e accesso all’aperto per gli animali',
    'Alimentazione biologica',
    'Suoli sani e rotazione delle colture',
  ],
];

// Sub-bullet paragraphs (3rd accordion)
const bullet3TextsArr = [
  // English
  [
    'Animals in organic husbandry must have access to outdoor areas and predominantly open housing.',
    'Animals are fed organic feed, mostly produced on the same farm.',
    'Organic farms are required to systematically rotate their crops and take measures to protect soil quality. This keeps the soil alive, fertile, and protected from erosion.',
  ],
  // German
  [
    'Tiere in Bio-Haltung müssen Zugang zu Freiflächen und vorwiegend offenen Stallraum haben.',
    'Tiere werden mit Bio-Futter ernährt, das überwiegend vom eigenen Betrieb stammt.',
    'Bio-Betriebe sind verpflichtet, ihre Pflanzen systematisch zu wechseln und Maßnahmen für den Schutz der Bodenqualität zu ergreifen. So bleibt der Boden lebendig, fruchtbar und vor Erosion geschützt.',
  ],
  // Spanish
  [
    'Los animales en cría ecológica deben tener acceso a áreas al aire libre y corrales predominantemente abiertos.',
    'Los animales se alimentan con piensos ecológicos, en su mayoría producidos en la misma explotación.',
    'Las explotaciones ecológicas están obligadas a rotar sistemáticamente sus cultivos y tomar medidas para proteger la calidad del suelo. Así, el suelo se mantiene vivo, fértil y protegido de la erosión.',
  ],
  // French
  [
    'Les animaux en élevage bio doivent avoir accès à des espaces extérieurs et à des bâtiments principalement ouverts.',
    'Les animaux sont nourris avec des aliments bio, principalement produits sur la même exploitation.',
    'Les exploitations biologiques sont tenues de pratiquer la rotation des cultures et de prendre des mesures pour protéger la qualité des sols. Ainsi, le sol reste vivant, fertile et protégé de l’érosion.',
  ],
  // Italian
  [
    'Gli animali allevati biologicamente devono avere accesso ad aree esterne e strutture prevalentemente aperte.',
    'Gli animali vengono nutriti con mangimi biologici, prodotti principalmente nella stessa azienda.',
    'Le aziende biologiche sono tenute a ruotare sistematicamente le colture e ad adottare misure per proteggere la qualità del suolo. In questo modo il suolo rimane vivo, fertile e protetto dall’erosione.',
  ],
];

// Optional icons for each bullet point (3rd accordion)
const bullet3Icons = [
  'mdi:leaf', // Example icon for bullet one
  'mdi:water-outline', // Example icon for bullet two
  'mdi:earth', // Example icon for bullet three
];

const Accordion3: React.FC<CertificateDialogProps> = ({
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
  const handleAccordion3 = (ex: boolean) => {
    expanded.setValue(ex);
  };

  // Select the text in the current language
  const head3 = head3Arr[langIndex] || '';
  const text3 = text3Arr[langIndex] || '';
  const bulletHeadings3 = bullet3HeadingsArr[langIndex] || [];
  const bulletTexts3 = bullet3TextsArr[langIndex] || [];

  // If no certificate is passed, don't render the accordion
  if (!certificate) return null;

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          {/* Reuse the same CertificateIcon or pick a new one */}
          <Iconify
            icon="ph:cow-bold"
            color={alpha(colorSubIcons, 0.6)}
            width={subAccIconSize}
            height={subAccIconSize}
          />
          <CHeading
            value={head3}
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
      {/* Main paragraph */}
      <Stack display="flex" flexDirection="column" alignItems="flex-start" sx={{ mb: 2 }}>
        <CPara
          value={text3}
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
          <PawHeartIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings3[0]}
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
            value={bulletTexts3[0]}
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
          <BioLeavesIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings3[1]}
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
            value={bulletTexts3[1]}
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
          <CircularPlantIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings3[2]}
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
            value={bulletTexts3[2]}
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

export default Accordion3;
