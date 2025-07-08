import React, { useCallback, useEffect, useState } from 'react';
import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { IDesign, IWidget } from 'src/types/product';
import { TruecostIcon } from 'src/assets/icons/custom/sustainability';
import { _nutriReference } from 'src/_mock/_nutriReference';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { useBoolean } from 'src/hooks/use-boolean';
import { getContrastText } from 'src/utils/labelUtils';
import { Chart, useChart } from 'src/components/chart';
import CStackedBar from 'src/sections/custom-components/c-stackedbar';
import CButton from 'src/sections/custom-components/c-button';
import { formatNumberToGerman } from 'src/utils/format-number';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import { spacing, subAccIconSize } from 'src/styleguide';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  preview?: boolean;
};

const text1Arr = [
  'That`s how many hidden costs you`ve saved:', // en
  'So viele versteckte Kosten hast du gespart:', // de
  'Así de muchos costes ocultos has ahorrado:', // es
  'Voici combien de coûts cachés vous avez économisés :', // fr
  'Questi sono i costi nascosti che hai risparmiato:', // it
];

const text2Arr = [
  'The true product costs in comparison:', // en
  'Die wahren Produktkosten im Vergleich:', // de
  'Los costes reales del producto en comparación:', // es
  'Les coûts réels du produit en comparaison :', // fr
  'I costi reali del prodotto a confronto:', // it
];

const text3Arr = [
  // en
  'The graph shows the true cost of your product compared to a conventional alternative. The hidden environmental impact costs are added to the product price. The calculation of these environmental effects follows the same steps to ensure comparability.',
  // de
  'In der Grafik siehst du die wahren Kosten deines Produkts im Vergleich mit einer konventionellen Alternative. Hierzu werden dem Produktpreis jeweils die versteckten Umweltfolgekosten aufgeschlagen. Die Berechnung dieser Umwelteffekte folgt den selben Schritten, um Vergleichbarkeit sicherzustellen.',
  // es
  'El gráfico muestra el coste real de tu producto en comparación con una alternativa convencional. Se añaden al precio del producto los costes ocultos del impacto medioambiental. El cálculo de estos efectos ambientales sigue los mismos pasos para garantizar la comparabilidad.',
  // fr
  'Le graphique montre le coût réel de votre produit par rapport à une alternative conventionnelle. Les coûts environnementaux cachés sont ajoutés au prix du produit. Le calcul de ces effets environnementaux suit les mêmes étapes pour garantir la comparabilité.',
  // it
  'Il grafico mostra il costo reale del tuo prodotto rispetto a un’alternativa convenzionale. Ai costi del prodotto vengono aggiunti i costi nascosti dell’impatto ambientale. Il calcolo di questi effetti ambientali segue gli stessi passaggi per garantire la comparabilità.',
];

const text4Arr = [
  'Hidden costs per portion (500g)', // en
  'Versteckte Kosten je Portion (500g)', // de
  'Costes ocultos por porción (500 g)', // es
  'Coûts cachés par portion (500 g)', // fr
  'Costi nascosti per porzione (500 g)', // it
];

const text5Arr = [
  'What are the true costs?', // en
  'Wie setzen sich die wahren Kosten zusammen?', // de
  '¿Cuáles son los costes reales?', // es
  'Quels sont les coûts réels ?', // fr
  'Quali sono i costi reali?', // it
];

const text6Arr = [
  // en
  'In this illustration you will find out what the causes of the hidden costs are and how heavily they are weighted.',
  // de
  'In dieser Darstellung findest du heraus, was die Ursachen für die versteckten Kosten sind und wie schwer diese gewichtet sind.',
  // es
  'En esta ilustración descubrirás cuáles son las causas de los costes ocultos y cuál es su peso.',
  // fr
  'Dans cette représentation, vous découvrirez les causes des coûts cachés et leur importance relative.',
  // it
  'In questa illustrazione scoprirai quali sono le cause dei costi nascosti e come vengono valutati.',
];

const button1Arr = [
  'Learn more about Patos', // en
  'Mehr über Patos erfahren', // de
  'Más información sobre Patos', // es
  'En savoir plus sur Patos', // fr
  'Scopri di più su Patos', // it
];

const button2Arr = [
  'Learn more', // en
  'Mehr erfahren', // de
  'Más información', // es
  'En savoir plus', // fr
  'Scopri di più', // it
];

const dialog1Arr = [
  'Information for true costs', // en
  'Informationen zu den wahren Kosten', // de
  'Información sobre los costes reales', // es
  'Informations sur les coûts réels', // fr
  'Informazioni sui costi reali', // it
];

const dialog2Arr = [
  'What are the true costs?', // en
  'Was sind die wahren Kosten?', // de
  '¿Cuáles son los costes reales?', // es
  'Quels sont les coûts réels ?', // fr
  'Quali sono i costi reali?', // it
];

const dialog3Arr = [
  // en
  'The so-called true costs show the true costs of a product: the costs of products including the hidden follow-up costs for the environment. These costs are not currently included in the sales price and are therefore borne by society. By purchasing this product, you are helping to reduce the burden!',
  // de
  'Die sogenannten True-Cost zeigen die wahren Kosten eines Produkts: Den von Produkten inklusive der versteckten Folgekosten für die Umwelt. Diese Kosten werden aktuell nicht in den Verkaufspreis einberechnet und somit von der Gesellschaft getragen. Mit dem Kauf dieses Produkts hilfst du dabei die Belastung zu verringern!',
  // es
  'Los llamados “true costs” muestran los costes reales de un producto: el coste de los productos incluyendo los gastos ambientales ocultos. Actualmente estos costes no están incluidos en el precio de venta y, por lo tanto, recaen en la sociedad. ¡Al comprar este producto, ayudas a reducir esta carga!',
  // fr
  'Les « true costs » montrent les coûts réels d’un produit : les coûts des produits incluant les coûts environnementaux cachés. Ces coûts ne sont pas actuellement inclus dans le prix de vente et sont donc supportés par la société. En achetant ce produit, vous contribuez à réduire cette charge !',
  // it
  'I cosiddetti “true costs” mostrano i costi reali di un prodotto: i costi dei prodotti inclusi quelli ambientali nascosti. Attualmente, tali costi non sono inclusi nel prezzo di vendita e sono quindi a carico della società. Acquistando questo prodotto, contribuisci a ridurre questo onere!',
];

const dialog4Arr = [
  'Explanation of the causes included', // en
  'Erklärung der einbezogenen Ursachen', // de
  'Explicación de las causas incluidas', // es
  'Explication des causes incluses', // fr
  'Spiegazione delle cause incluse', // it
];

const dialog5Arr = [
  // en
  'Climate costs: Arise from CO2 emissions and their consequential damage such as extreme weather, crop failures and flooding. Also include costs for necessary adaptation measures and the loss of quality of life\nHealth costs from production: Result from environmental pollution and poor working conditions, e.g. respiratory diseases caused by ammonia, water pollution and antibiotic resistance.\nWater costs: arise from high consumption and pollution, for example through expensive drinking water treatment, water shortages and groundwater drying out.\nLand costs: consist of land consumption and environmental degradation, e.g. soil erosion, loss of biodiversity and costs for renaturation.',
  // de
  'Klimakosten: Entstehen durch CO2-Emissionen und deren Folgeschäden wie Extremwetter, Ernteausfälle und Überschwemmungen. Beinhalten ebenfalls Kosten für notwendige Anpassungsmaßnahmen und den Verlust an Lebensqualität\nGesundheitskosten aus Produktion: Resultat aus Umweltverschmutzung und schlechten Arbeitsbedingungen, z. B. Atemwegserkrankungen durch Ammoniak, Wasserverschmutzung und Antibiotikaresistenzen.\nWasserkosten: Entstehen durch hohen Verbrauch und Verschmutzung, etwa durch teure Trinkwasseraufbereitung, Wassermangel und Grundwasseraustrocknung.\nLandkosten: setzen sich aus Flächen-verbrauch und Umweltzerstörung zusammen, z. B. Bodenerosion, Biodiversitätsverlust und Kosten für Renaturierung.',
  // es
  'Costes climáticos: Surgen de las emisiones de CO2 y los daños consecuentes como fenómenos meteorológicos extremos, pérdidas de cosechas e inundaciones. Incluyen también costes de medidas de adaptación necesarias y la pérdida de calidad de vida.\nCostes de salud de la producción: Resultan de la contaminación ambiental y de las malas condiciones de trabajo, p. ej., enfermedades respiratorias causadas por el amoníaco, contaminación del agua y resistencias a los antibióticos.\nCostes del agua: Surgen por el alto consumo y la contaminación, por ejemplo a través de un costoso tratamiento del agua potable, la escasez de agua y el agotamiento de las aguas subterráneas.\nCostes de la tierra: Se componen del consumo de suelo y la degradación ambiental, p. ej., la erosión del suelo, la pérdida de biodiversidad y los costes de la restauración ambiental.',
  // fr
  'Coûts climatiques : Ils proviennent des émissions de CO2 et des dommages qu’elles entraînent, comme les phénomènes météorologiques extrêmes, les mauvaises récoltes et les inondations. Ils incluent également les coûts liés aux mesures d’adaptation nécessaires et à la baisse de la qualité de vie.\nCoûts de santé liés à la production : Résultent de la pollution de l’environnement et des mauvaises conditions de travail, par ex. les maladies respiratoires causées par l’ammoniac, la pollution de l’eau ou la résistance aux antibiotiques.\nCoûts liés à l’eau : Surviennent en raison de la forte consommation et de la pollution, par exemple dans le cadre d’un traitement coûteux de l’eau potable, de pénuries d’eau et de l’assèchement des eaux souterraines.\nCoûts du sol : Regroupent la consommation de terres et la dégradation de l’environnement, par ex. l’érosion des sols, la perte de biodiversité et les frais de restauration.',
  // it
  'Costi climatici: derivano dalle emissioni di CO2 e dai danni conseguenti, come eventi meteorologici estremi, perdite di raccolto e inondazioni. Includono anche i costi relativi alle misure di adattamento necessarie e alla riduzione della qualità di vita.\nCosti sanitari dalla produzione: derivano dall’inquinamento ambientale e dalle cattive condizioni di lavoro, ad esempio malattie respiratorie causate dall’ammoniaca, inquinamento dell’acqua e resistenza agli antibiotici.\nCosti dell’acqua: derivano dall’elevato consumo e dall’inquinamento, ad esempio per il costoso trattamento dell’acqua potabile, la carenza idrica e l’abbassamento delle falde acquifere.\nCosti della terra: includono il consumo di suolo e il degrado ambientale, come l’erosione del suolo, la perdita di biodiversità e i costi per la rinaturalizzazione.',
];

const dialog6Arr = [
  'Calculated by PATOS', // en
  'Berechnet von PATOS', // de
  'Calculado por PATOS', // es
  'Calculé par PATOS', // fr
  'Calcolato da PATOS', // it
];

const dialog7Arr = [
  'Scientific approach', // en
  'Wissenschaftlicher Ansatz', // de
  'Enfoque científico', // es
  'Démarche scientifique', // fr
  'Approccio scientifico', // it
];

const dialog8Arr = [
  // en
  'The true costs were calculated on the basis of the published scientific papers Pieper et al. (2020) and Michalke et al. (2023).',
  // de
  'Die wahren Kosten wurden berechnet auf Basis der veröffentlichten wissenschaftlichen Papiere Pieper et al. (2020) und Michalke et al. (2023).',
  // es
  'Los costes reales se calcularon sobre la base de los documentos científicos publicados por Pieper et al. (2020) y Michalke et al. (2023).',
  // fr
  'Les coûts réels ont été calculés sur la base des articles scientifiques publiés par Pieper et al. (2020) et Michalke et al. (2023).',
  // it
  'I costi reali sono stati calcolati sulla base degli articoli scientifici pubblicati da Pieper et al. (2020) e Michalke et al. (2023).',
];

const dialog9Arr = [
  'Data & Methodology', // en
  'Daten & Methodik', // de
  'Datos y metodología', // es
  'Données et méthodologie', // fr
  'Dati e metodologia', // it
];

const dialog10Arr = [
  // en
  'Life cycle assessment (ISO 14044): Impact Assessment according to ReCiPe 2016 (Huijbregts et al. 2016) System boundaries: cradle to processing-gate, does not include packaging, as well as processing by end product stage at consumer level Data sources: Agribalyse, FAOSTAT. True cost accounting (TCA): Monetization of the results of the impact assessment according to the Environmental Prices Handbook (de Bruyn 2024) Data source for adjustment according to consumer price index: World Bank',
  // de
  'Life Cycle Assessment (ISO 14044): Impact Assessment nach ReCiPe 2016 (Huijbregts et al. 2016) Systemgrenzen: cradle to processing-gate, schließt keine Verpackungen, sowie Prozessierung nach Endprodukt-Stufe auf Verbraucherebene ein Datenquellen: Agribalyse, FAOSTAT. True Cost Accounting (TCA): Monetarisierung der Ergebnisse des Impact Assessments nach Environmental Prices Handbook (de Bruyn 2024) Datenquelle für Anpassung nach Verbraucherpreisindex: World Bank',
  // es
  'Análisis del ciclo de vida (ISO 14044): Evaluación de impactos según ReCiPe 2016 (Huijbregts et al. 2016). Límites del sistema: desde la cuna hasta la planta de procesamiento, sin incluir envases, así como el procesamiento hasta el producto final a nivel del consumidor. Fuentes de datos: Agribalyse, FAOSTAT. True Cost Accounting (TCA): Monetización de los resultados de la evaluación de impactos según el Environmental Prices Handbook (de Bruyn 2024). Fuente de datos para el ajuste de acuerdo con el índice de precios al consumidor: Banco Mundial.',
  // fr
  'Analyse du cycle de vie (ISO 14044) : Évaluation d’impact selon ReCiPe 2016 (Huijbregts et al. 2016). Limites du système : du berceau à la sortie de l’usine de transformation, sans inclure l’emballage, ainsi que la transformation jusqu’au stade de produit final chez le consommateur. Sources de données : Agribalyse, FAOSTAT. True Cost Accounting (TCA) : Monétisation des résultats de l’évaluation de l’impact selon l’Environmental Prices Handbook (de Bruyn 2024). Source de données pour l’ajustement selon l’indice des prix à la consommation : Banque mondiale.',
  // it
  'Valutazione del ciclo di vita (ISO 14044): valutazione dell’impatto secondo ReCiPe 2016 (Huijbregts et al. 2016). Confini del sistema: dalla culla al cancello di lavorazione, senza includere l’imballaggio, né le fasi di lavorazione successive al prodotto finito a livello del consumatore. Fonti dei dati: Agribalyse, FAOSTAT. True Cost Accounting (TCA): monetizzazione dei risultati della valutazione dell’impatto secondo l’Environmental Prices Handbook (de Bruyn 2024). Fonte dei dati per l’adeguamento all’indice dei prezzi al consumo: Banca Mondiale.',
];

const Truecost: React.FC<Props> = ({ design, widget, langIndex, onAccExpandWidget, preview }) => {
  const theme = useTheme();

  // Content
  const truecostIndex = widget.childs.findIndex((accordion) => accordion.id === 'Truecost');
  const truecost = widget.childs[truecostIndex].attributes;
  const change = JSON.stringify(truecost);

  const [productDesc, setProductDesc] = useState<string>(
    truecost.TrueCostProductDesc.value[langIndex]?.val[0]
  );
  const [compareDesc, setCompareDesc] = useState<string>(
    truecost.TrueCostCompareDesc.value[langIndex]?.val[0]
  );

  const [productUVP, setProductUVP] = useState<number>(
    +(truecost.TrueCostProductUVP.value[langIndex]?.val[0] ?? 0)
  );
  const [compareUVP, setCompareUVP] = useState<number>(
    +(truecost.TrueCostCompareUVP.value[langIndex]?.val[0] ?? 0)
  );

  const [productTC, setProductTC] = useState<number>(
    +(truecost.TrueCostProduct.value[langIndex]?.val[0] ?? 0)
  );
  const [compareTC, setCompareTC] = useState<number>(
    +(truecost.TrueCostCompare.value[langIndex]?.val[0] ?? 0)
  );

  // Style
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  // Design
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;
  const backgroundColor = design.style.colors.backgroundColor;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor || secondaryColor;
  const buttonSize = (design.style.buttons.size as 'small' | 'large' | 'medium') || 'small';

  const dynamicPrimaryText = getContrastText(primaryColor);
  const dynamicSecondaryText = getContrastText(secondaryColor);
  const transparentButtonText = design.style.cards.color;

  // ----------------------------------------------------------------------

  // State für Toggle-Button
  const accOpen = useBoolean();
  // ----------------------------------------------------------------------

  // Check if Accordion is open
  useEffect(() => {
    accOpen.setValue(widget.childs[truecostIndex].open);
  }, [widget, langIndex, truecostIndex, accOpen]);

  // ----------------------------------------------------------------------

  const handleAccordionChange = (expanded: boolean) => {
    // accOpen.setValue(expanded);
    onAccExpandWidget(expanded, 'Truecost');
  };

  const [currentTab, setCurrentTab] = useState('compare');

  const handleChangeTab = useCallback((newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  useEffect(() => {
    setProductDesc(truecost.TrueCostProductDesc.value[langIndex]?.val[0]);
    setCompareDesc(truecost.TrueCostCompareDesc.value[langIndex]?.val[0]);
    setProductUVP(+(truecost.TrueCostProductUVP.value[langIndex]?.val[0] ?? 0));
    setCompareUVP(+(truecost.TrueCostCompareUVP.value[langIndex]?.val[0] ?? 0));
    setProductTC(+(truecost.TrueCostProduct.value[langIndex]?.val[0] ?? 0));
    setCompareTC(+(truecost.TrueCostCompare.value[langIndex]?.val[0] ?? 0));
  }, [truecost, langIndex, change]);

  const totalValues = [productUVP + productTC, compareUVP + compareTC];

  const chartOptions = useChart({
    chart: {
      stacked: true,
      zoom: {
        enabled: true,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: [primaryColor, secondaryColor], // Custom colors for the legend labels
        useSeriesColors: false, // Set to true if you want legend labels to match series colors
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        dataLabels: {
          position: 'center', // Position the label inside the bar
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [dynamicPrimaryText, dynamicSecondaryText], // White text color for better visibility
      },
      formatter: (val: number, { seriesIndex, dataPointIndex }) => {
        if (seriesIndex === 1) {
          // Assuming "True Cost" is the second series (index 1)
          const total = totalValues[dataPointIndex];
          return `${formatNumberToGerman(parseFloat(val.toFixed(2)))} €`;
          // const percentage = ((val / total) * 100).toFixed(0); // Calculate percentage
          // return `${percentage} %`; // Show percentage for True Cost
        }
        return `${formatNumberToGerman(parseFloat(val.toFixed(2)))} €`; // Show actual value for UVP
      },
    },
    xaxis: {
      type: 'category',
      categories: [productDesc || 'Produkt', compareDesc || 'Vergleich'],
    },
    yaxis: {
      labels: {
        show: false,
        formatter: (value: number) => `${formatNumberToGerman(parseFloat(value.toFixed(2)))} €`,
      },
      tickAmount: 4, // Specify the number of ticks on the y-axis
      decimalsInFloat: 0, // Avoid floating point numbers in y-axis ticks
    },
    annotations: {
      yaxis: [],
      xaxis: [],
      points: totalValues.map((total, index) => ({
        x: [productDesc, compareDesc][index], // Match the category
        y: total, // Total value
        label: {
          text: `${formatNumberToGerman(parseFloat(total.toFixed(2)))} €`, // Display the total value
          style: {
            color: '#000', // Text color
            background: '#fff', // Background color for better readability
            fontSize: '12px',
          },
          position: 'top', // Position the label on top of the bar
        },
      })),
    },
  });

  const series = [
    {
      name: 'UVP',
      data: [productUVP, compareUVP],
      color: primaryColor, // Set color for "UVP"
    },
    {
      name: 'True Cost',
      data: [productTC, compareTC],
      color: secondaryColor, // Set color for "True Cost"
    },
  ];

  //------------------------------------------------------------

  const [doc, setDoc] = useState<string>(truecost.TrueCostStudy.value[langIndex]?.val[0]);

  // const handleDownload = () => {
  //   if (!preview) {
  //     window.open(doc, '_blank');
  //   }
  // };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    if (!preview) {
      setDialogOpen(true);
    }
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
  };

  const handleWebsite = () => {
    if (!preview) {
      window.location.assign('https://www.patos-solutions.de/');
    }
  };

  const text1 = text1Arr[langIndex];
  const text2 = text2Arr[langIndex];
  const text3 = text3Arr[langIndex];
  const text4 = text4Arr[langIndex];
  const text5 = text5Arr[langIndex];
  const text6 = text6Arr[langIndex];

  const button1 = button1Arr[langIndex];
  const button2 = button2Arr[langIndex];

  const dialog1 = dialog1Arr[langIndex];
  const dialog2 = dialog2Arr[langIndex];
  const dialog3 = dialog3Arr[langIndex];
  const dialog4 = dialog4Arr[langIndex];
  const dialog5 = dialog5Arr[langIndex];
  const dialog6 = dialog6Arr[langIndex];
  const dialog7 = dialog7Arr[langIndex];
  const dialog8 = dialog8Arr[langIndex];
  const dialog9 = dialog9Arr[langIndex];
  const dialog10 = dialog10Arr[langIndex];

  return (
    <>
      <CAccordionSub
        design={design}
        summary={
          <>
            <TruecostIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
            <CHeading
              value={truecost.WidgetHeadline_Truecost.value[langIndex]?.val[0]}
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
          <ButtonGroup variant="outlined" size="medium" sx={{ alignSelf: 'center' }}>
            <Button
              onClick={() => {
                handleChangeTab('compare');
              }}
              sx={{
                backgroundColor: currentTab === 'compare' ? buttonColor : 'transparent',
                color: currentTab === 'compare' ? transparentButtonText : buttonColor,
                borderColor: buttonColor,
                '&:hover': {
                  borderColor: buttonColor,
                  backgroundColor:
                    currentTab === 'compare'
                      ? alpha(buttonColor, 0.9)
                      : alpha(buttonTextColor, 0.1),
                },
                borderRadius: design.style.cards.borderradius,
                p: spacing.buttonPaddingM[design.style.general.spacing],
              }}
            >
              <Iconify
                icon="mdi:compare-horizontal"
                width={24}
                sx={{
                  backgroundColor: 'transparent',
                  mr: spacing.inlineSpacing[design.style.general.spacing],
                }}
              />
              Vergleich
            </Button>
            <Button
              onClick={() => {
                handleChangeTab('cause');
              }}
              sx={{
                backgroundColor: currentTab === 'cause' ? buttonColor : 'transparent',
                color: currentTab === 'cause' ? transparentButtonText : buttonColor,
                borderColor: buttonColor,
                '&:hover': {
                  borderColor: buttonColor,
                  backgroundColor:
                    currentTab === 'cause' ? alpha(buttonColor, 0.9) : alpha(buttonTextColor, 0.1),
                },
                borderRadius: design.style.cards.borderradius,
                p: spacing.buttonPaddingM[design.style.general.spacing],
              }}
            >
              <Iconify
                icon="mdi:chart-pie"
                width={24}
                sx={{
                  backgroundColor: 'transparent',
                  mr: spacing.inlineSpacing[design.style.general.spacing],
                }}
              />
              Ursachen
            </Button>
          </ButtonGroup>
          {currentTab === 'compare' && (
            <>
              <CHeading
                value={text1}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h4"
                size="s"
                fontWeight={weightHeadlines}
              />
              <Box
                border="1px solid #ccc"
                borderRadius={design.style.cards.borderradius}
                sx={{ width: '100%', p: spacing.containerPadding[design.style.general.spacing] }}
              >
                {/* Header */}
                <CHeading
                  value={`${formatNumberToGerman(parseFloat((compareTC - productTC).toFixed(2)))} €`}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorHeadlines}
                  orientation="center"
                  variant="h4"
                  size="l"
                  fontWeight={weightHeadlines}
                />
              </Box>
              <CHeading
                value={text2}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h4"
                size="s"
                fontWeight={weightHeadlines}
              />
              <Chart dir="ltr" type="bar" series={series} options={chartOptions} />
              <CPara
                value={text3}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
                variant="caption"
              />
            </>
          )}
          {currentTab === 'cause' && (
            <>
              <CHeading
                value={text4}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h4"
                size="s"
                fontWeight={weightHeadlines}
              />
              <Box border="1px solid #ccc" borderRadius="8px" sx={{ width: '100%' }}>
                {/* Header */}
                <CHeading
                  value={`${formatNumberToGerman(parseFloat(productTC.toFixed(2)))} €`}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorHeadlines}
                  orientation="center"
                  variant="h4"
                  size="l"
                  fontWeight={weightHeadlines}
                />
              </Box>
              <CHeading
                value={text5}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h4"
                size="s"
                fontWeight={weightHeadlines}
              />
              <CStackedBar
                values={truecost.TrueCostCauses.value[langIndex]?.val}
                design={design}
                unit="kg"
                header={false}
              />
              <CPara
                value={text6}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
                variant="caption"
              />
            </>
          )}
          <CButton
            onClick={handleOpenDialog}
            variant={buttonStyle}
            buttonColor={buttonColor}
            textColor={buttonTextColor}
            size={buttonSize}
          >
            {button2}
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
          <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
            <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
              <CHeading
                value={dialog2}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h3"
                size={sizeHeadlines}
                fontWeight={weightHeadlines}
              />
              <CPara
                value={dialog3}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
              />
            </Stack>
            <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
              <CHeading
                value={dialog4}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h3"
                size={sizeHeadlines}
                fontWeight={weightHeadlines}
              />
              <CPara
                value={dialog5}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
              />
            </Stack>
            <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
              <CHeading
                value={dialog6}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h3"
                size={sizeHeadlines}
                fontWeight={weightHeadlines}
              />
              <CButton
                onClick={handleWebsite}
                variant={buttonStyle}
                buttonColor={buttonColor}
                textColor={buttonTextColor}
                size={buttonSize}
              >
                <Iconify icon="mdi:web-asset" width={24} sx={{ mr: 1 }} />
                {button1}
              </CButton>
            </Stack>
            <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
              <CHeading
                value={dialog7}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h3"
                size={sizeHeadlines}
                fontWeight={weightHeadlines}
              />
              <CPara
                value={dialog8}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
              />
            </Stack>
            <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
              <CHeading
                value={dialog9}
                fontHeadlines={fontHeadlines}
                colorHeadlines={colorHeadlines}
                variant="h3"
                size={sizeHeadlines}
                fontWeight={weightHeadlines}
              />
              <CPara
                value={dialog10}
                font={fontPara}
                color={colorPara}
                size={sizePara}
                fontWeight={weightPara}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: spacing.containerPadding[design.style.general.spacing], backgroundColor }}>
          <Button onClick={handleCancelDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Truecost;
