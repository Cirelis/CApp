import React from 'react';
import { alpha, Stack, useTheme } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { Iconify } from 'src/components/iconify';
import { CertificateIcon, CheckSprechIcon, NonGMOIcon, NoPestIcon } from 'src/assets/icons/custom';

import { IDesign, IWidgetChilds } from 'src/types/product';
import { ICertificate } from 'src/types/certificates';
import { subAccIconSize } from 'src/styleguide';

interface CertificateDialogProps {
  eubio: IWidgetChilds;
  certificate?: ICertificate;
  design: IDesign;
  langIndex: number;
}

// Main headings (top of accordion)
const head1Arr = [
  'What is organic, anyway?', // en
  'Was ist bio eigentlich?', // de
  '¿Qué es lo orgánico, en realidad?', // es
  'Qu’est-ce que le bio, exactement?', // fr
  'Cos’è il biologico, in realtà?', // it
];

// Paragraph text under main heading
const text1Arr = [
  // English
  'Organic stands for a form of agriculture regulated by law that protects the environment, treats animals in a species-appropriate manner, preserves biodiversity, and uses natural resources responsibly. Production follows Europe-wide uniform standards – from sowing to shelf.',
  // German
  'Bio steht für eine gesetzlich geregelte Form der Landwirtschaft, die die Umwelt schützt, Tiere artgerecht hält, die biologische Vielfalt erhält und natürliche Ressourcen verantwortungsvoll nutzt. Die Produktion folgt europaweit einheitlichen Standards – von der Aussaat bis ins Regal.',
  // Spanish
  'La agricultura ecológica representa una forma de producción regulada por ley que protege el medio ambiente, mantiene a los animales en condiciones adecuadas, preserva la biodiversidad y utiliza de manera responsable los recursos naturales. La producción sigue estándares uniformes en toda Europa, desde la siembra hasta el estante.',
  // French
  'Le bio désigne une forme d’agriculture régie par la loi qui protège l’environnement, assure le bien-être animal, préserve la biodiversité et utilise les ressources naturelles de manière responsable. La production suit des normes uniformes à l’échelle européenne – de la plantation à la mise en rayon.',
  // Italian
  'Il biologico rappresenta una forma di agricoltura regolamentata dalla legge che tutela l’ambiente, garantisce il benessere degli animali, preserva la biodiversità e utilizza in modo responsabile le risorse naturali. La produzione segue standard uniformi a livello europeo – dalla semina allo scaffale.',
];

// Sub-bullet headings
const bulletHeadingsArr = [
  // en
  ['No Genetic Engineering Allowed', 'No chemical-synthetic pesticides', 'Controlled & certified'],
  // de
  [
    'Keine Gentechnik erlaubt',
    'Keine chemisch-synthetischen Pestizide',
    'Kontrolliert & zertifiziert',
  ],
  // es
  [
    'No se permite ingeniería genética',
    'No se permiten pesticidas químico-sintéticos',
    'Controlado y certificado',
  ],
  // fr
  [
    'Pas de génie génétique autorisé',
    'Pas de pesticides chimiques-synthétiques',
    'Contrôlé et certifié',
  ],
  // it
  [
    'Nessuna ingegneria genetica consentita',
    'Nessun pesticida chimico-sintetico',
    'Controllato e certificato',
  ],
];

// Sub-bullet paragraphs
const bulletTextsArr = [
  // en
  [
    'Organic products must not contain any genetically modified organisms.',
    'In organic farming, only certain approved natural-origin agents are permitted.',
    'Organic farms are inspected at least once a year by independent bodies.',
  ],
  // de
  [
    'Bio-Produkte dürfen keine gentechnisch veränderten Organismen enthalten.',
    'Im Bio-Anbau sind nur bestimmte, zugelassene Mittel natürlichen Ursprungs erlaubt.',
    'Bio-Betriebe werden mindestens einmal jährlich von unabhängigen Stellen überprüft.',
  ],
  // es
  [
    'Los productos ecológicos no deben contener organismos genéticamente modificados.',
    'En la agricultura ecológica, solo se permiten ciertos agentes de origen natural aprobados.',
    'Las granjas ecológicas son inspeccionadas al menos una vez al año por organismos independientes.',
  ],
  // fr
  [
    'Les produits biologiques ne doivent pas contenir d’organismes génétiquement modifiés.',
    'En agriculture biologique, seuls certains agents d’origine naturelle approuvés sont autorisés.',
    'Les exploitations biologiques sont contrôlées au moins une fois par an par des organismes indépendants.',
  ],
  // it
  [
    'I prodotti biologici non devono contenere organismi geneticamente modificati.',
    'Nell’agricoltura biologica sono ammessi solo alcuni agenti di origine naturale approvati.',
    'Le aziende biologiche sono ispezionate almeno una volta all’anno da enti indipendenti.',
  ],
];

// Optional icons for each bullet point (same for all languages)
const bulletIcons = [
  'healthicons:agriculture', // For "No Genetic Engineering"
  'mdi:regenerative-agriculture', // For "No chemical-synthetic pesticides"
  'mdi:check-decagram', // For "Controlled & certified"
];

const Accordion1: React.FC<CertificateDialogProps> = ({
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
  const handleAccordion1 = (ex: boolean) => {
    expanded.setValue(ex);
  };

  // Select the text in the current language
  const head1 = head1Arr[langIndex] || '';
  const text1 = text1Arr[langIndex] || '';
  const bulletHeadings = bulletHeadingsArr[langIndex] || [];
  const bulletTexts = bulletTextsArr[langIndex] || [];

  if (!certificate) return null;

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <Iconify
            icon="material-symbols:nest-eco-leaf-outline-rounded"
            color={alpha(colorSubIcons, 0.6)}
            width={subAccIconSize}
            height={subAccIconSize}
          />
          <CHeading
            value={head1}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h3"
            size="m"
            fontWeight={weightHeadlines}
          />
        </>
      }
      expanded={expanded.value}
      onExpandAccordion={handleAccordion1}
    >
      {/* Main paragraph */}
      <Stack display="flex" flexDirection="column" alignItems="flex-start" sx={{ mb: 2 }}>
        <CPara
          value={text1}
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
          <NonGMOIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings[0]}
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
            value={bulletTexts[0]}
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
          <NoPestIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings[1]}
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
            value={bulletTexts[1]}
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
          <CheckSprechIcon color={colorIcons} width="45px" height="50px" sx={{ mr: 1 }} />
          <CHeading
            value={bulletHeadings[2]}
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
            value={bulletTexts[2]}
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

export default Accordion1;
