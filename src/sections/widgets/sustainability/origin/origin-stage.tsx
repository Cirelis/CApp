import { alpha, Divider, Stack, useTheme } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { IngredientsIcon } from 'src/assets/icons/custom/productinfo';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { IOriginLocation } from 'src/types/origin';
import { IDesign, IWidget } from 'src/types/product';
import { spacing, subAccIconSize } from 'src/styleguide';
import LocationDialog from './dialog';

type Props = {
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  stageType: 'Packaging' | 'Ressources' | 'Production';
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  preview?: boolean;
  locations: IOriginLocation[];
};

export default function OriginStage({
  design,
  widget,
  langIndex,
  stageType,
  onAccExpandWidget,
  preview,
  locations,
}: Props) {
  const theme = useTheme();
  const accOpen = useBoolean();

  // Content
  const stageIndex = widget.childs.findIndex((accordion) => accordion.id === stageType);
  const attributes = widget.childs[stageIndex].attributes;

  // Style
  const colorSubIcons = design.style.icons.subIconColor || theme.palette.primary.main;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const sizePara = design.typography.paragraphs.size;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;

  useEffect(() => {
    accOpen.setValue(widget.childs[stageIndex].open);
  }, [widget, langIndex, stageIndex, accOpen]);

  // Group locations by title
  const groupedLocations = useMemo(() => {
    const groups = locations.reduce(
      (acc, loc) => {
        acc[loc.title] = acc[loc.title] || {};
        acc[loc.title][loc.region] = acc[loc.title][loc.region] || [];
        acc[loc.title][loc.region].push(loc);
        return acc;
      },
      {} as Record<string, Record<string, IOriginLocation[]>>
    );
    return groups;
  }, [locations]);

  // ----------------------------------------------------------------------

  const handleAccordionChange = (expanded: boolean) => {
    onAccExpandWidget(expanded, stageType);
  };

  const buildIcon = () => {
    switch (stageType) {
      case 'Packaging':
        return (
          <Iconify
            icon="ph:package-duotone"
            color={alpha(colorSubIcons, 0.6)}
            width={subAccIconSize}
            height={subAccIconSize}
          />
        );
      case 'Ressources':
        return (
          <IngredientsIcon color={colorSubIcons} width={subAccIconSize} height={subAccIconSize} />
        );
      case 'Production':
        return (
          <Iconify
            icon="la:industry"
            color={alpha(colorSubIcons, 0.6)}
            width={subAccIconSize}
            height={subAccIconSize}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CAccordionSub
      design={design}
      summary={
        <>
          {buildIcon()}
          <CHeading
            value={attributes[`WidgetHeadline_${stageType}`].value[langIndex]?.val[0]}
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
        <CPara
          value={attributes[`WidgetDescription_${stageType}`].value[langIndex]?.val[0]}
          font={fontPara}
          color={colorPara}
          size={sizePara}
          fontWeight={weightPara}
        />
        {groupedLocations && (
          <Stack
            spacing={spacing.contentSpacingM[design.style.general.spacing]}
            divider={<Divider sx={{ borderStyle: 'dashed' }} />}
          >
            {Object.entries(groupedLocations).map(([title, region]) => (
              <Stack key={`${title}-${region}`} spacing={spacing.contentSpacingS[design.style.general.spacing]}>
                {title && (
                  <CHeading
                    value={title}
                    fontHeadlines={fontHeadlines}
                    colorHeadlines={colorHeadlines}
                    variant="h4"
                    size={sizeHeadlines}
                    fontWeight={weightHeadlines}
                  />
                )}
                <Stack
                  direction="row"
                  spacing={spacing.spacingTags[design.style.general.spacing]}
                  sx={{ flexWrap: 'wrap', alignItems: 'center' }}
                >
                  {Object.entries(region).map(([generalLocation, data]) => (
                    <LocationDialog
                      key={`${data[0].iso_a2}-${generalLocation}`}
                      design={design}
                      preview={preview}
                      countryCode={data[0].iso_a2}
                      buttonText={generalLocation}
                      dialogDatas={data}
                    />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </CAccordionSub>
  );
}
