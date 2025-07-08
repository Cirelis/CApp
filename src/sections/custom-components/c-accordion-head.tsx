import { ReactNode, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { AccordionDetails, AccordionSummary, IconButton, Stack, useTheme } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { IDesign } from 'src/types/product';
import { Iconify } from 'src/components/iconify';
import { spacing } from 'src/styleguide';

type Props = {
  preview?: boolean;
  design: IDesign;
  expanded: boolean;
  onExpandAccordion: (expand: boolean) => void;
  summary: ReactNode;
  children: ReactNode;
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

export default function CAccordion({
  preview,
  design,
  expanded,
  onExpandAccordion,
  summary,
  children,
}: Props) {
  const theme = useTheme();
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const handleAccordionChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    onExpandAccordion(isExpanded);

    if (!isExpanded && accordionRef.current) {
      const rect = accordionRef.current.getBoundingClientRect();
      const isAboveViewport = rect.top < 0; // Accordion is above the current viewport

      if (isAboveViewport) {
        setTimeout(() => {
          accordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10);
      }
    }
  };

  useEffect(() => {
    if (!expanded && accordionRef.current) {
      const rect = accordionRef.current.getBoundingClientRect();
      const isAboveViewport = rect.top < 0;

      if (isAboveViewport) {
        setTimeout(() => {
          accordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [expanded, preview]);

  const toggle = (_e?: React.MouseEvent, wantExpand?: boolean) => {
    const next = wantExpand ?? !expanded;
    onExpandAccordion(next);
  };

  const ExpandIconButton = (
    <IconButton
      size="small"
      onClick={(e) => {
        // prevent the outer AccordionSummary from also toggling
        e.stopPropagation();
        toggle();
      }}
      sx={{ '&:hover': { backgroundColor: 'transparent' }, p: spacing.containerPadding[design.style.general.spacing] }}
    >
      <Iconify
        icon={expanded ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
        color={design.typography.headlines.color || theme.palette.text.primary}
      />
    </IconButton>
  );

  return (
    <div ref={accordionRef}>
      <Accordion
        expanded={expanded}
        onChange={preview && expanded === true ? undefined : handleAccordionChange}
        sx={{ backgroundColor: design.style.cards.color, p: 0 }}
      >
        <AccordionSummary
          sx={{
            p: spacing.containerPadding[design.style.general.spacing],
            backgroundColor: design.style.cards.color,
            my: -spacing.containerPadding[design.style.general.spacing],
          }}
          expandIcon={ExpandIconButton}
        >
          <Stack
            spacing={spacing.inlineSpacing[design.style.general.spacing]}
            direction="row"
            sx={{ alignItems: 'center' }}
          >
            {summary}
          </Stack>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            backgroundColor: design.style.cards.color,
            p: spacing.containerPadding[design.style.general.spacing],
            pt: 0,
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
