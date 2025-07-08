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
import { WaterIcon } from 'src/assets/icons/custom/sustainability';
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
  'This water footprint is equivalent to:', // en
  'Dieser Wasser-Fußabdruck entspricht:', // de
  'Esta huella hídrica equivale a:', // es
  'Cette empreinte hydrique équivaut à :', // fr
  'Questa impronta idrica equivale a:', // it
];

const text2Arr = [
  'of a 250g beef steak', // en
  'eines 250g Rinder-Steaks', // de
  'de un filete de ternera de 250 g', // es
  'd’un steak de bœuf de 250 g', // fr
  'di una bistecca di manzo da 250 g', // it
];

const text3Arr = [
  'consumption of a german household per day', // en
  'Tagesverbrauch Haushalt in DE', // de
  'consumo diario de un hogar alemán', // es
  'consommation d’un foyer allemand par jour', // fr
  'consumo quotidiano di una famiglia tedesca', // it
];

const text4Arr = [
  'warm shower', // en
  'warmes Duschen', // de
  'ducha caliente', // es
  'douche chaude', // fr
  'doccia calda', // it
];

const text5Arr = [
  'Water consumption per unit', // en
  'Wasser-Verbrauch je Einheit', // de
  'Consumo de agua por unidad', // es
  'Consommation d’eau par unité', // fr
  'Consumo di acqua per unità', // it
];

const button1Arr = [
  'Learn more', // en
  'Mehr erfahren', // de
  'Más información', // es
  'En savoir plus', // fr
  'Scopri di più', // it
];

const dialog1Arr = [
  'Information for the water consumption', // en
  'Informationen zu dem Wasser Verbrauch', // de
  'Información sobre el consumo de agua', // es
  'Informations sur la consommation d’eau', // fr
  'Informazioni sul consumo di acqua', // it
];

const Water: React.FC<Props> = ({ design, widget, langIndex, onAccExpandWidget, preview }) => {
  const theme = useTheme();

  // Content
  const waterIndex = widget.childs.findIndex((accordion) => accordion.id === 'Water');
  const water = widget.childs[waterIndex].attributes;
  const total = water.WaterValues.value[langIndex]?.val.reduce(
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
  const button1 = button1Arr[langIndex];
  const dialog1 = dialog1Arr[langIndex];

  // ----------------------------------------------------------------------

  // State für Toggle-Button
  const accOpen = useBoolean();
  // ----------------------------------------------------------------------

  // Check if Accordion is open
  useEffect(() => {
    accOpen.setValue(widget.childs[waterIndex].open);
  }, [widget, langIndex, waterIndex, accOpen]);

  // ----------------------------------------------------------------------

  const handleAccordionChange = (expanded: boolean) => {
    // accOpen.setValue(expanded);
    onAccExpandWidget(expanded, 'Water');
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
            <WaterIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
            <CHeading
              value={water.WidgetHeadline_Water.value[langIndex]?.val[0]}
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
            value={text5}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h4"
            size="s"
            fontWeight={weightHeadlines}
          />
          <CStackedBar
            values={water.WaterValues.value[langIndex]?.val}
            design={design}
            unit="Liter"
            header
          />
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
            <Iconify width={30} icon="mdi:shower" sx={{ color: colorSubIcons }} />
            <Box>
              <CHeading
                value={`${formatNumberToGerman(parseFloat((total / 13.5).toFixed(2)))} ${langIndex === 0 ? 'minutes' : 'Minuten'}`}
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
          <Stack
            sx={{ flexDirection: 'row', alignItems: 'center' }}
            spacing={spacing.contentSpacingS[design.style.general.spacing]}
          >
            <Iconify width={30} icon="mdi:food-steak" sx={{ color: colorSubIcons }} />
            <Box>
              <CHeading
                value={`${formatNumberToGerman(parseFloat((total / 5000).toFixed(2)))} ${
                  langIndex === 0 ? 'pieces' : 'Stück'
                }`}
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
            <Iconify width={30} icon="mdi:house" sx={{ color: colorSubIcons }} />
            <Box>
              <CHeading
                value={`${formatNumberToGerman(parseFloat(((total / 7200) * 100).toFixed(2)))} ${langIndex === 0 ? '%' : '%'}`}
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
        <DialogTitle sx={{ backgroundColor, p: spacing.containerPadding[design.style.general.spacing] }}>
          <CHeading
            value={dialog1}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h2"
            size={sizeHeadlines}
            fontWeight={weightHeadlines}
          />
        </DialogTitle>
        <DialogContent sx={{ backgroundColor, p: spacing.containerPadding[design.style.general.spacing] }}>
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            <Link href="https://www.umweltbundesamt.de/sites/default/files/medien/479/publikationen/texte_44-2022_konzeptionelle_weiterentwicklung_des_wasserfussabdrucks.pdf">
              ● Konzeptionelle Weiterentwicklung des Wasserfußabdrucks
            </Link>
            <Link href="https://www.hansgrohe.de/magazin/nachhaltigkeit/wasserverbrauch-duschen?">
              ● Wasserverbrauch beim Duschen: So schonen Sie wertvolle Ressourcen
            </Link>
            <Link href="https://www.umweltbundesamt.de/sites/default/files/medien/6232/dokumente/ifeu_2020_oekologische-fussabdruecke-von-lebensmitteln.pdf">
              ● Ökologische Fußabdrücke von Lebensmitteln und Gerichten in Deutschland (IFEU 2020)
            </Link>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor, p: spacing.containerPadding[design.style.general.spacing] }}>
          <Button onClick={handleCancelDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Water;
