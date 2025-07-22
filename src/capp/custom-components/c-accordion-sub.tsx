import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { AccordionDetails, AccordionSummary, Box, Stack, useTheme } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { IDesign } from 'src/types/product';
import { Iconify } from 'src/components/iconify';
import { spacing, spacingInnerWidgets } from 'src/styleguide';

type Props = {
  design: IDesign;
  expanded: boolean;
  onExpandAccordion: (expand: boolean) => void;
  summary: ReactNode;
  children: ReactNode;
};

const Accordion = styled((props: AccordionProps & { expanded: boolean }) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme, expanded }) => ({
  // borderBottom: expanded ? 'none' : `1px solid ${theme.palette.divider}`, // Remove border when expanded
  borderTop: `1px solid ${theme.palette.divider}`, // Remove border when expanded
  '&::before': {
    display: 'none', // Hide the default MuiAccordion divider
  },
}));

export default function CAccordionSub({
  design,
  expanded,
  onExpandAccordion,
  summary,
  children,
}: Props) {
  const theme = useTheme();

  // Colors from design
  const cardColor = design.style.cards.color;
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;

  return (
    <>
      {/* <Divider/> */}
      <Accordion
        expanded={expanded}
        onChange={(_, isExpanded) => onExpandAccordion(isExpanded)}
        sx={{
          bgcolor: 'transparent !important',
          boxShadow: 'none !important',
          py: spacingInnerWidgets[design.style.general.widgetSpacing],
        }}
      >
        {/* Accordion Summary */}
        <AccordionSummary
          sx={{
            bgColor: cardColor,
            my: -spacing.containerPadding[design.style.general.spacing],
          }}
          expandIcon={
            <Iconify
              icon="eva:arrow-ios-downward-fill"
              color={colorHeadlines}
              sx={{ m: spacing.containerPadding[design.style.general.spacing] }}
            />
          }
        >
          <Box
            sx={{
              p: spacing.containerPadding[design.style.general.spacing],
              my: -spacing.containerPadding[design.style.general.spacing],
            }}
          >
            <Stack
              spacing={spacing.inlineSpacing[design.style.general.spacing]}
              sx={{ flexDirection: 'row', alignItems: 'center' }}
            >
              {summary}
            </Stack>
          </Box>
        </AccordionSummary>

        {/* Accordion Details */}
        <AccordionDetails
          sx={{
            backgroundColor: cardColor,
          }}
        >
          <Box sx={{ p: spacing.containerPadding[design.style.general.spacing] }}> {children}</Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
