import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  useTheme,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { IDesign, IWidget } from 'src/types/product';
import { Co2Icon } from 'src/assets/icons/custom/sustainability';
import { _nutriReference } from 'src/_mock/_nutriReference';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { useBoolean } from 'src/hooks/use-boolean';
import CStackedBar from 'src/sections/custom-components/c-stackedbar';
import { formatNumberToGerman } from 'src/utils/format-number';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CButton from 'src/sections/custom-components/c-button';
import { spacing, subAccIconSize } from 'src/styleguide';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  preview?: boolean;
};

const text1Arr = [
  'This CO₂e footprint is equivalent to:', // en
  'Dieser CO₂e-Fußabdruck entspricht:', // de
  'Este impacto de CO₂e equivale a:', // es
  'Cette empreinte CO₂e équivaut à :', // fr
  'Questa impronta di CO₂e equivale a:', // it
];

const text2Arr = [
  'long car journey (petrol engine)', // en
  'lange Autofahrt (Otto-Motor)', // de
  'un largo viaje en coche (motor de gasolina)', // es
  'un long trajet en voiture (moteur à essence)', // fr
  'un lungo viaggio in auto (motore a benzina)', // it
];

const text3Arr = [
  'of a 250g beef steak', // en
  'eines 250g Rinder-Steaks', // de
  'de un filete de ternera de 250 g', // es
  'd’un steak de bœuf de 250 g', // fr
  'di una bistecca di manzo da 250 g', // it
];

const text4Arr = [
  'consumption of a german household per day', // en
  'Emissionen Haushalt in DE pro Tag', // de
  'consumo de un hogar alemán al día', // es
  'consommation d’un foyer allemand par jour', // fr
  'consumo di una famiglia tedesca al giorno', // it
];

const text5Arr = [
  'warm shower', // en
  'warmes Duschen', // de
  'ducha caliente', // es
  'douche chaude', // fr
  'doccia calda', // it
];

const text6Arr = [
  'CO₂e emissions per unit', // en
  'CO₂e-Emissionen je Einheit', // de
  'Emisiones de CO₂e por unidad', // es
  'Émissions de CO₂e par unité', // fr
  'Emissioni di CO₂e per unità', // it
];

const button1Arr = [
  'Learn more', // en
  'Mehr erfahren', // de
  'Más información', // es
  'En savoir plus', // fr
  'Scopri di più', // it
];

const dialog1Arr = [
  'Information for the CO₂-Footprint', // en
  'Informationen zu dem CO₂-Fußabdruck', // de
  'Información sobre la huella de CO₂', // es
  'Informations sur l’empreinte CO₂', // fr
  'Informazioni sull’impronta di CO₂', // it
];

const Co2: React.FC<Props> = ({ design, widget, langIndex, onAccExpandWidget, preview }) => {
  const theme = useTheme();

  // Content
  const co2Index = widget.childs.findIndex((accordion) => accordion.id === 'Co2');
  const co2 = widget.childs[co2Index].attributes;
  const total = co2.Co2Values.value[langIndex]?.val.reduce(
    (acc, value) => acc + Number(value.value),
    0
  );

  // Style
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  // Design
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const backgroundColor = design.style.colors.backgroundColor;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;

  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor || secondaryColor;
  const buttonSize = (design.style.buttons.size as 'small' | 'large' | 'medium') || 'small';

  const text1 = text1Arr[langIndex];
  const text2 = text2Arr[langIndex];
  const text3 = text3Arr[langIndex];
  const text4 = text4Arr[langIndex];
  const text5 = text5Arr[langIndex];
  const text6 = text6Arr[langIndex];
  const button1 = button1Arr[langIndex];
  const dialog1 = dialog1Arr[langIndex];

  // ----------------------------------------------------------------------

  // State für Toggle-Button
  const accOpen = useBoolean();
  // ----------------------------------------------------------------------

  // Check if Accordion is open
  useEffect(() => {
    accOpen.setValue(widget.childs[co2Index].open);
  }, [widget, langIndex, co2Index, accOpen]);

  // ----------------------------------------------------------------------

  const handleAccordionChange = (expanded: boolean) => {
    // accOpen.setValue(expanded);
    onAccExpandWidget(expanded, 'Co2');
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    if (!preview) {
      setDialogOpen(true);
    }
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <CAccordionSub
        design={design}
        summary={
          <>
            <Co2Icon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
            <CHeading
              value={co2.WidgetHeadline_Co2.value[langIndex]?.val[0]}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h3"
              size={sizeHeadlines}
              fontWeight={weightHeadlines}
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <CHeading
            value={text6}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h4"
            size={sizeHeadlines}
            fontWeight={weightHeadlines}
          />
          <CStackedBar
            values={co2.Co2Values.value[langIndex]?.val}
            design={design}
            unit="kg"
            header
          />
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            <CHeading
              value={text1}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h4"
              size="s"
              fontWeight={weightHeadlines}
            />
            <Stack
              sx={{ flexDirection: 'row', alignItems: 'center' }}
              spacing={spacing.contentSpacingS[design.style.general.spacing]}
            >
              <Iconify width={30} icon="mdi:car-side" sx={{ color: colorSubIcons }} />
              <Box>
                <CHeading
                  value={`${formatNumberToGerman(parseFloat((total / 0.095).toFixed(2)))} km`}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorSubIcons}
                  variant="h4"
                  size="s"
                  fontWeight={weightHeadlines}
                />
                <CPara
                  value={text2}
                  font={fontPara}
                  color={colorPara}
                  size="m"
                  fontWeight={weightPara}
                />
              </Box>
            </Stack>
            <Stack
              sx={{ flexDirection: 'row', alignItems: 'center' }}
              spacing={spacing.contentSpacingS[design.style.general.spacing]}
            >
              <Iconify width={30} icon="mdi:shower" sx={{ color: colorSubIcons }} />
              <Box>
                <CHeading
                  value={`${formatNumberToGerman(parseFloat((total / 0.45).toFixed(2)))} ${langIndex === 0 ? 'minutes' : 'Minuten'}`}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorSubIcons}
                  variant="h4"
                  size="s"
                  fontWeight={weightHeadlines}
                />
                <CPara
                  value={text5}
                  font={fontPara}
                  color={colorPara}
                  size="m"
                  fontWeight={weightPara}
                />
              </Box>
            </Stack>
            <Stack
              sx={{ flexDirection: 'row', alignItems: 'center' }}
              spacing={spacing.contentSpacingS[design.style.general.spacing]}
            >
              <Iconify width={30} icon="mdi:food-steak" sx={{ color: colorSubIcons }} />
              <Box>
                <CHeading
                  value={`${formatNumberToGerman(parseFloat((total / 3.4).toFixed(2)))} ${langIndex === 0 ? 'pieces' : 'Stück'}`}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorSubIcons}
                  variant="h4"
                  size="s"
                  fontWeight={weightHeadlines}
                />
                <CPara
                  value={text3}
                  font={fontPara}
                  color={colorPara}
                  size="m"
                  fontWeight={weightPara}
                />
              </Box>
            </Stack>
            <Stack
              sx={{ flexDirection: 'row', alignItems: 'center' }}
              spacing={spacing.contentSpacingS[design.style.general.spacing]}
            >
              <Iconify width={30} icon="mdi:house" sx={{ color: colorSubIcons }} />
              <Box>
                <CHeading
                  value={`${formatNumberToGerman(parseFloat(((total / 28.4) * 100).toFixed(2)))} ${langIndex === 0 ? '%' : '%'}`}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorSubIcons}
                  variant="h4"
                  size="s"
                  fontWeight={weightHeadlines}
                />
                <CPara
                  value={text4}
                  font={fontPara}
                  color={colorPara}
                  size="m"
                  fontWeight={weightPara}
                />
              </Box>
            </Stack>
          </Stack>
          <CButton
            onClick={handleOpenDialog}
            variant={buttonStyle}
            buttonColor={buttonColor}
            textColor={buttonTextColor}
            size={buttonSize}
          >
            {button1}
          </CButton>
        </Stack>
      </CAccordionSub>
      <Dialog open={dialogOpen} onClose={handleCancelDialog}>
        <DialogTitle sx={{ p: spacing.containerPadding[design.style.general.spacing], backgroundColor }}>
          <CHeading
            value={dialog1}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h2"
            size={sizeHeadlines}
            fontWeight={weightHeadlines}
          />
        </DialogTitle>
        <DialogContent sx={{ p: spacing.containerPadding[design.style.general.spacing], backgroundColor }}>
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            <Link href="https://www.umweltbundesamt.de/sites/default/files/medien/6232/dokumente/ifeu_2020_oekologische-fussabdruecke-von-lebensmitteln.pdf">
              ● Ökologische Fußabdrücke von Lebensmitteln und Gerichten in Deutschland (IFEU 2020)
            </Link>
            <Link href="https://uba.co2-rechner.de/de_DE">● CO2-Rechner des Umweltbundesamtes</Link>
            <Link href="www.eur-lex.europa.eu/eli/reg/2019/631">
              ● Regulation (EU) 2019/631 of the European Parliament and of the Council of 17 April
              2019 setting CO2 emission performance standards for new passenger cars and for new
              light commercial vehicles
            </Link>
            <Link href="https://www.hansgrohe.de/magazin/nachhaltigkeit/nachhaltiges-badezimmer-teil-1">
              ● CO2-Analyse rund um Ihren ökologischen Fußabdruck im Badezimmer
            </Link>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: spacing.containerPadding[design.style.general.spacing], backgroundColor }}>
          <Button onClick={handleCancelDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Co2;
