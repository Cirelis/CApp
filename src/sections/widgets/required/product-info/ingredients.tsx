import React, { useCallback, useEffect } from 'react';
import { Grid, Stack, useTheme } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import {
  GlutenIcon,
  LactoseIcon,
  NutsIcon,
  SoyIcon,
  CeleryIcon,
  PeanutsIcon,
  LupineIcon,
  EggIcon,
  FishIcon,
  MustardIcon,
  MolluscsIcon,
  SulphurIcon,
  SesameIcon,
} from 'src/assets/icons/custom/productinfo/allergene';
import { IDesign, IWidget } from 'src/types/product';
import IngredientsIcon from 'src/assets/icons/custom/productinfo/ic_ingredients';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import CLabel from 'src/sections/custom-components/c-label';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import { spacing, subAccIconSize } from 'src/styleguide';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
};

const ingredientsArr = [
  'Ingredients', // en
  'Inhaltsstoffe', // de
  'Ingredientes', // es
  'Ingrédients', // fr
  'Ingredienti', // it
];

const allergensArr = [
  'Allergens', // en
  'Allergene', // de
  'Alérgenos', // es
  'Allergènes', // fr
  'Allergeni', // it
];

const warningsArr = [
  'Warnings', // en
  'Warnungen', // de
  'Advertencias', // es
  'Avertissements', // fr
  'Avvertenze', // it
];

const IngredientsAccordionPreview: React.FC<Props> = ({
  design,
  widget,
  langIndex,
  onAccExpandWidget,
}) => {
  const theme = useTheme();

  // Content
  const ingredientsIndex = widget.childs.findIndex((accordion) => accordion.id === 'Ingredients');
  const ingredients = widget.childs[ingredientsIndex].attributes;

  // Style
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  // Design
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  const text1 = ingredientsArr[langIndex]; // "Inhaltsstoffe"
  const text2 = allergensArr[langIndex]; // "Allergene"
  const text3 = warningsArr[langIndex]; // "Warnungen"

  // Überprüfen, ob ein bestimmtes Allergen im Array enthalten ist
  const containsAllergen = useCallback(
    (allergen: string) => {
      const allergenValues = ingredients.ProductInfoAllergens.value[langIndex]?.val[0]
        ? ingredients.ProductInfoAllergens.value[langIndex]?.val[0].split(';')
        : [];
      return allergenValues.some(
        (item: string) => item.trim().toLowerCase() === allergen.toLowerCase()
      );
    },
    [ingredients, langIndex]
  );

  // Funktion zum Rendern der Allergen-Icons und -Texte
  const renderAllergens = useCallback(() => {
    const allergensToRender = [
      { allergen: 'Gluten', icon: GlutenIcon },
      { allergen: 'Soy', icon: SoyIcon },
      { allergen: 'Lactose', icon: LactoseIcon },
      { allergen: 'Nuts', icon: NutsIcon },
      { allergen: 'Celery', icon: CeleryIcon },
      { allergen: 'Peanuts', icon: PeanutsIcon },
      { allergen: 'Lupine', icon: LupineIcon },
      { allergen: 'Egg', icon: EggIcon },
      { allergen: 'Mustard', icon: MustardIcon },
      { allergen: 'Molluscs', icon: MolluscsIcon },
      { allergen: 'Sulphur', icon: SulphurIcon },
      { allergen: 'Sesame', icon: SesameIcon },
      { allergen: 'Fish', icon: FishIcon },
    ];

    return allergensToRender.map(({ allergen, icon: Icon }) => {
      const hasAllergen = containsAllergen(allergen);

      if (hasAllergen) {
        return (
          <Grid key={allergen}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Icon color={colorSubIcons} size={24} />
              <CPara
                value={allergen}
                font={fontPara}
                color={colorSubIcons}
                size={sizePara}
                fontWeight={weightPara}
              />
            </Stack>
          </Grid>
        );
      }
      return null;
    });
  }, [containsAllergen, colorSubIcons, fontPara, sizePara, weightPara]);

  // Check if Accordion is open
  const accOpen = useBoolean();

  useEffect(() => {
    accOpen.setValue(widget.childs[ingredientsIndex].open);
  }, [widget, langIndex, ingredientsIndex, accOpen]);

  const handleAccordionChange = (expanded: boolean) => {
    onAccExpandWidget(expanded, 'Ingredients');
  };

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <IngredientsIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
          <CHeading
            value={ingredients.WidgetHeadline_Ingredients.value[langIndex]?.val[0]}
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
        {/* ----- INGREDIENTS -----*/}
        <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
          <CPara
            value={text1}
            variant="caption"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          <Grid container spacing={spacing.spacingTags[design.style.general.spacing]}>
            {ingredients.ProductInfoIngredients.value[langIndex]?.val?.[0] &&
            ingredients.ProductInfoIngredients.value[langIndex]?.val.length > 0 ? (
              ingredients?.ProductInfoIngredients?.value?.[langIndex]?.val?.[0]
                .split(';')
                .map((ingredient: string) => ingredient.trim())
                .filter((ingredient: string) => ingredient !== '') // Filtert leere Strings heraus
                .map((ingredient: string, index: number) => (
                  <Grid key={index}>
                    <CLabel
                      value={ingredient}
                      color={colorLabel}
                      textColor={colorTextLabel}
                      font={fontLabel}
                      fontWeight={weightLabel}
                      size={sizePara}
                    />
                  </Grid>
                ))
            ) : (
              <Grid>
                <CPara
                  value="Keine Angabe"
                  variant="caption"
                  font={fontPara}
                  color={colorPara}
                  size={sizePara}
                  fontWeight={weightPara}
                />
                <CPara
                  value="Keine Angabe"
                  variant="caption"
                  font={fontPara}
                  color={colorPara}
                  size={sizePara}
                  fontWeight={weightPara}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
        {/* ----- ALLERGENS -----*/}
        <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
          <CPara
            value={text2}
            variant="caption"
            font={fontPara}
            color={colorPara}
            size={sizePara}
            fontWeight={weightPara}
          />
          {ingredients.ProductInfoAllergens.value[langIndex]?.val[0] ? (
            <Grid container spacing={spacing.spacingTags[design.style.general.spacing]}>
              {renderAllergens()}
            </Grid>
          ) : (
            <CPara
              value="-"
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
            />
          )}
        </Stack>
        {/* ----- Warnings -----*/}
        {ingredients.ProductInfoNotesAndWarnings.value[langIndex]?.val[0] && (
          <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
            <CPara
              value={text3}
              variant="caption"
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
            />
            <CPara
              value={ingredients.ProductInfoNotesAndWarnings.value[langIndex]?.val[0]}
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
            />
          </Stack>
        )}
      </Stack>
    </CAccordionSub>
  );
};

export default IngredientsAccordionPreview;
