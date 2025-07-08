import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Stack,
  useTheme,
  IconButton,
} from '@mui/material';
import { Image } from 'src/components/image';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import CLabel from 'src/sections/custom-components/c-label';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import { Iconify } from 'src/components/iconify';
import { IDesign, IWidgetChilds } from 'src/types/product';
import { ICertificate } from 'src/types/certificates';
import { CertificateIcon } from 'src/assets/icons/custom';
import { useBoolean } from 'src/hooks/use-boolean';
import { subAccIconSize } from 'src/styleguide';

interface CertificateDialogProps {
  naturland: IWidgetChilds;
  langIndex: number;
  certificate?: ICertificate;
  design: IDesign;
}

const head1Arr = [
  'The Naturland Seal', // en
  'Das Naturland Siegel', // de
  'El sello Naturland', // es
  'Le label Naturland', // fr
  'Il marchio Naturland', // it
];

const text1Arr = [
  // en
  'The Naturland seal stands for the highest quality in organic agriculture. Products bearing this label guarantee environmentally friendly production, species-appropriate animal husbandry, and social responsibility. By choosing Naturland, you opt for organic products that go beyond legal standards and make a real contribution to sustainability and fairness.',
  // de
  'Das Naturland Siegel steht für höchste Qualität im ökologischen Landbau. Produkte mit diesem Zeichen garantieren umweltfreundliche Herstellung, artgerechte Tierhaltung und soziale Verantwortung. Mit Naturland wählst du Bio-Produkte, die über die gesetzlichen Standards hinausgehen und einen echten Beitrag zu Nachhaltigkeit und Fairness leisten.',
  // es
  'El sello Naturland representa la máxima calidad en la agricultura ecológica. Los productos que llevan este distintivo garantizan una producción respetuosa con el medio ambiente, un trato adecuado de los animales y una responsabilidad social. Al elegir Naturland, optas por productos ecológicos que van más allá de los estándares legales y hacen una contribución real a la sostenibilidad y la equidad.',
  // fr
  'Le label Naturland garantit la plus haute qualité en agriculture biologique. Les produits portant ce label assurent une production respectueuse de l’environnement, un élevage adapté aux animaux et une responsabilité sociale. En choisissant Naturland, vous optez pour des produits biologiques qui vont au-delà des normes légales et contribuent réellement à la durabilité et à l’équité.',
  // it
  'Il marchio Naturland è sinonimo della massima qualità nell’agricoltura biologica. I prodotti con questo marchio garantiscono una produzione ecocompatibile, un allevamento adeguato alle esigenze degli animali e una responsabilità sociale. Scegliendo Naturland, opti per prodotti biologici che vanno oltre gli standard legali e contribuiscono concretamente alla sostenibilità e all’equità.',
];

const Accordion1: React.FC<CertificateDialogProps> = ({
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

  const expanded = useBoolean();
  const handleAccordion1 = (ex: boolean) => {
    expanded.setValue(ex);
  };

  const head1 = head1Arr[langIndex] || '';
  const text1 = text1Arr[langIndex] || '';

  if (!certificate) return null;

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <CertificateIcon color={colorIcons} width={subAccIconSize} height={subAccIconSize} />
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
      <Stack display="flex" flexDirection="column" alignItems="center">
        <CPara
          value={text1}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
      </Stack>
    </CAccordionSub>
  );
};

export default Accordion1;
