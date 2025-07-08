import { alpha, Button, ButtonGroup, Chip, Divider, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { _nutriReference } from 'src/_mock/_nutriReference';
import { NutritionIcon } from 'src/assets/icons/custom/productinfo';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import CPara from 'src/sections/custom-components/c-para';
import { spacing, subAccIconSize } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';
import { formatNumberToGerman } from 'src/utils/format-number';
import styled from 'styled-components';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
};

const StyledSpan = styled.span`
  font-weight: normal;
`;

const subvalues: string[] = [
  'Saturated Fat',
  'Unsaturated Fat',
  'Sugar',
  'Polyhydric Alcohols',
  'Starch',
  'Gesättigte Fettsäuren',
  'Ungesättigte Fettsäuren',
  'Zucker',
  'Mehrwertige Alkohole',
  'Stärke',
];

const servingArr = [
  'Serving', // en
  'Portion', // de
  'Porción', // es
  'Portion', // fr
  'Porzione', // it
];

const nrvArr = [
  '*NRV%: Nutrient Reference Values', // en
  '*NRV%: Nährstoffbezugswerte', // de
  '*NRV%: Valores de referencia de nutrientes', // es
  '*NRV%: Valeurs nutritionnelles de référence', // fr
  '*NRV%: Valori nutritivi di riferimento', // it
];

const NutrientsAccordionPreview: React.FC<Props> = ({
  design,
  widget,
  langIndex,
  onAccExpandWidget,
}) => {
  const theme = useTheme();

  const [hasChanges, setHasChanges] = useState(false);

  // Content
  const nutrientIndex = widget.childs.findIndex((accordion) => accordion.id === 'Nutrients');
  const nutrients = widget.childs[nutrientIndex].attributes;

  // Style
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;

  // Design
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor || secondaryColor;
  const buttonSize = design.style.buttons.size as 'small' | 'medium' | 'large';

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  const transparentButtonText = design.style.cards.color;

  const text1 = servingArr[langIndex];
  const text2 = nrvArr[langIndex];

  // ----------------------------------------------------------------------

  // State für Toggle-Button
  const [isPerServing, setIsPerServing] = useState(false);
  const [prevNutrientValue, setPrevNutrientValue] = useState(
    nutrients.EnableServingSize.value[langIndex]?.val[0]
  );
  const accOpen = useBoolean();

  const handleToggleChange = (value: boolean) => {
    setIsPerServing(value);
  };

  // useEffect Hook to monitor changes in 'Enable Serving Size' (7)
  useEffect(() => {
    const currentNutrientValue = nutrients.EnableServingSize.value[langIndex]?.val[0];
    if (prevNutrientValue === 'true' && currentNutrientValue === 'false') {
      handleToggleChange(false);
    }
    setPrevNutrientValue(currentNutrientValue);
  }, [nutrients, prevNutrientValue, langIndex]);
  // ----------------------------------------------------------------------

  // Check if any nutrient value is not zero
  useEffect(() => {
    const anyValueNotZero = Object.values(nutrients).some(
      (nutrient: any) => nutrient.value && nutrient.value.some((val: number) => val !== 0)
    );
    setHasChanges(anyValueNotZero);
  }, [nutrients]);

  // Check if Accordion is open
  useEffect(() => {
    accOpen.setValue(widget.childs[nutrientIndex].open);
  }, [widget, langIndex, nutrientIndex, accOpen]);

  // ----------------------------------------------------------------------

  const convertKJtoKCal = (kj: number) => (kj / 4.184).toFixed(2);

  const getValue = (value: number) => {
    if (!isPerServing) {
      return value;
    }
    const servingSizeStr = nutrients.ServingSize?.value?.[langIndex]?.val?.[0] ?? '0';
    const servingSizeNum = parseFloat(servingSizeStr) || 0;
    return value * (servingSizeNum / 100);
  };

  const getReferenceValue = (key: string) => {
    const reference = _nutriReference[langIndex]?.find((item) => item.key === key);
    return reference ? reference.value : 1; // Return 1 to avoid division by zero if not found
  };

  const getPercentage = (value: number, key: string) => {
    const referenceValue = getReferenceValue(key);

    return Math.round((value * 100) / referenceValue);
  };

  const handleAccordionChange = (expanded: boolean) => {
    // accOpen.setValue(expanded);
    onAccExpandWidget(expanded, 'Nutrients');
  };

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          <NutritionIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
          <CHeading
            value={nutrients.WidgetHeadline_Nutrients.value[langIndex]?.val[0]}
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
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          {nutrients.EnableServingSize.value[langIndex]?.val[0] === 'true' ? (
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => handleToggleChange(true)}
                sx={{
                  backgroundColor: isPerServing ? buttonColor : 'transparent',
                  color: isPerServing ? transparentButtonText : buttonColor,
                  borderColor: buttonColor,
                  '&:hover': {
                    borderColor: buttonColor,
                    backgroundColor: isPerServing
                      ? alpha(buttonColor, 0.9)
                      : alpha(buttonTextColor, 0.1),
                  },
                  borderRadius: design.style.cards.borderradius,
                }}
              >
                {text1} ({nutrients.ServingSize.value[langIndex]?.val[0]}
                {nutrients.ServingUnit.value[langIndex]?.val[0]})
              </Button>
              <Button
                onClick={() => handleToggleChange(false)}
                sx={{
                  backgroundColor: !isPerServing ? buttonColor : 'transparent',
                  color: !isPerServing ? transparentButtonText : buttonColor,
                  borderColor: buttonColor,
                  '&:hover': {
                    borderColor: buttonColor,
                    backgroundColor: !isPerServing
                      ? alpha(buttonColor, 0.9)
                      : alpha(buttonTextColor, 0.1),
                  },
                  borderRadius: design.style.cards.borderradius,
                }}
              >
                100 {nutrients.ServingUnit.value[langIndex]?.val[0]}
              </Button>
            </ButtonGroup>
          ) : (
            <Chip
              variant="outlined"
              label={`100 ${nutrients.ServingUnit.value[langIndex]?.val[0]}`}
              sx={{
                fontSize: '0.75rem',
                backgroundColor: 'transparent',
                color: buttonColor,
                borderColor: buttonColor,
                borderRadius: design.style.cards.borderradius,
              }}
            />
          )}
        </Stack>
        <Stack spacing={spacing.spacingTags[design.style.general.spacing]}>
          {nutrients.ProductInfoNutrients.value[langIndex]?.val
            .filter((info: any) => (hasChanges ? info.value : true))
            .map((info: any, index: number) => (
              <React.Fragment key={`info-${index}`}>
                {subvalues.includes(info.key) ? (
                  <Stack sx={{ ml: spacing.contentSpacingM[design.style.general.spacing] }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      key={`info-${index}`}
                    >
                      <CPara
                        value={info.key}
                        variant="caption"
                        font={fontPara}
                        color={colorPara}
                        size={sizePara}
                        fontWeight={weightPara}
                      />
                      <CLabel
                        color={colorLabel}
                        textColor={colorTextLabel}
                        font={fontLabel}
                        fontWeight={weightLabel}
                        size={sizePara}
                      >
                        {`${formatNumberToGerman(getValue(info.value as number))} g`}
                        &nbsp;
                        {nutrients.ReferenceQuantity.value[langIndex]?.val[0] === 'true' && (
                          <>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                mx: spacing.spacing2px[design.style.general.spacing],
                                borderStyle: 'dashed',
                              }}
                            />
                            <StyledSpan>
                              &nbsp;
                              {getPercentage(getValue(Number(info.value)), info.key)}
                              &nbsp;%*
                            </StyledSpan>
                          </>
                        )}
                      </CLabel>
                    </Stack>
                  </Stack>
                ) : (
                  <>
                    {info.key !== 'Energy' && info.key !== 'Energie' && (
                      <Divider sx={{ borderStyle: 'dashed', color: theme.palette.text.disabled }} />
                    )}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <CPara
                        value={info.key}
                        font={fontPara}
                        color={colorPara}
                        size={sizePara}
                        fontWeight="bold"
                      />
                      <CLabel
                        color={colorLabel}
                        textColor={colorTextLabel}
                        font={fontLabel}
                        fontWeight={weightLabel}
                        size={sizePara}
                      >
                        {info.key === 'Energy' || info.key === 'Energie'
                          ? `${formatNumberToGerman(getValue(Number(info.value)))} kJ / ${Math.round(
                              Number(convertKJtoKCal(getValue(Number(info.value))))
                            )} kcal`
                          : `${formatNumberToGerman(getValue(Number(info.value)))} g`}
                        &nbsp;
                        {nutrients.ReferenceQuantity.value[langIndex]?.val[0] === 'true' && (
                          <>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                mx: spacing.spacing2px[design.style.general.spacing],
                                borderStyle: 'dashed',
                              }}
                            />
                            <StyledSpan>
                              &nbsp;
                              {getPercentage(getValue(Number(info.value)), info.key)}
                              &nbsp;%*
                            </StyledSpan>
                          </>
                        )}
                      </CLabel>
                    </Stack>
                  </>
                )}
              </React.Fragment>
            ))}
        </Stack>
        <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
          {nutrients.ProductInfoCustomFields.value[langIndex]?.val.map(
            (info: { key: string; value: number; unit: any }) => (
              <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between' }}>
                <CPara
                  value={info.key}
                  variant="caption"
                  font={fontPara}
                  color={colorPara}
                  size={sizePara}
                  fontWeight={weightPara}
                />
                <CLabel
                  color={colorLabel}
                  textColor={colorTextLabel}
                  font={fontLabel}
                  fontWeight={weightLabel}
                  size={sizePara}
                >
                  {`${formatNumberToGerman(getValue(info.value as number))} ${info.unit}`}
                </CLabel>
              </Stack>
            )
          )}
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <CPara
          value={text2}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
      </Stack>
    </CAccordionSub>
  );
};

export default NutrientsAccordionPreview;
