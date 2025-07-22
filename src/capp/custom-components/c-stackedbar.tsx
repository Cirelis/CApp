import { alpha, Box, Stack, styled, Typography, useTheme } from '@mui/material';
import { IDesign } from 'src/types/product';
import { getContrastText } from 'src/utils/labelUtils';
import { formatNumberToGerman } from 'src/utils/format-number';
import { spacing } from 'src/styleguide';
import CHeading from './c-heading';
import CLabel from './c-label';
import CPara from './c-para';

type Props = {
  values: any[]; // Define val as string type
  design: IDesign;
  unit: string;
  header: boolean;
};

export default function CStackedBar({ values, design, unit, header }: Props) {
  const theme = useTheme();
  const colorHeadlines = design.typography.headlines.color;
  const fontHeadlines = design.typography.headlines.font;
  const size = design.typography.headlines.size;
  const weight = design.typography.headlines.weight as 'regular' | 'bold';
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.secondary.main;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const fontSize = design.typography.paragraphs.size;

  // Convert val to numbers and calculate the total
  const total = values?.reduce((acc, value) => acc + Number(value.value), 0);

  // StyledBox with conditional colors and opacity
  interface StyledBoxProps {
    color: string;
    opacity: number;
  }

  const StyledBox = styled(Box)<StyledBoxProps>(({ color, opacity }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: color,
    opacity, // Adjust opacity dynamically
    borderRadius: '3px', // Rounded corners for sections
  }));

  return (
    <>
      {header && (
        <Box
          border="1px solid #ccc"
          borderRadius={design.style.cards.borderradius}
          sx={{ p: spacing.containerPadding[design.style.general.spacing] }}
        >
          {/* Header */}
          <CHeading
            value={`${formatNumberToGerman(total?.toFixed(2))} ${unit}`}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            orientation="center"
            variant="h4"
            size="l"
            fontWeight={weight}
          />
        </Box>
      )}
      {/* Stacked Bar */}
      <Box display="flex" alignItems="center">
        <Stack
          direction="row"
          flex="1"
          height="20px"
          borderRadius="2px"
          overflow="hidden"
          spacing={spacing.spacing2px[design.style.general.spacing]}
        >
          {values?.map((value, index) => {
            const numericValue = Number(value.value); // Convert to number
            const percentage = (numericValue / total) * 100; // Calculate percentage
            return (
              <StyledBox
                key={index} // React key
                style={{ width: `${percentage}%` }} // Use percentage for width
                color={index > 2 ? secondaryColor : primaryColor} // Use secondaryColor for index > 2
                opacity={index > 2 ? 1 - (index - 3) * 0.2 : 1 - index * 0.2} // Adjust opacity
                title={`${value.key} - ${percentage.toFixed(0)}%`} // Tooltip with percentage
              />
            );
          })}
        </Stack>
      </Box>

      <Stack gap={spacing.contentSpacingS[design.style.general.spacing]}>
        {values?.map((value, index) => {
          const numericValue = Number(value.value); // Convert to number
          const backgroundColor = index > 2 ? secondaryColor : primaryColor;
          const dynamicTextColor = getContrastText(backgroundColor);

          return (
            <Stack
              key={index} // Make sure the key is at the root element
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <CPara
                value={value.key}
                font={fontPara}
                color={colorPara}
                size={fontSize}
                fontWeight={weightPara}
                variant="caption"
              />
              <CLabel
                value={`${((numericValue / total) * 100).toFixed(0)}%`}
                color={
                  index > 2
                    ? alpha(secondaryColor, 1 - (index - 3) * 0.2)
                    : alpha(primaryColor, 1 - index * 0.2)
                }
                textColor={dynamicTextColor} // Dynamically adjust text color
                font={fontLabel}
                size={fontSize}
                fontWeight={weightLabel}
              />
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}
