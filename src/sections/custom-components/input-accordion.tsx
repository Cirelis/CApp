import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  IconButton,
  Box,
  alpha,
} from '@mui/material';

import React, { useEffect } from 'react';

import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { IWidget } from 'src/types/product';

interface Props {
  title: string;
  widget: IWidget;
  index: number;
  onAccUp: (index: number) => void;
  onAccDown: (index: number) => void;
  onChangeWidgetAttribute: (
    value: any,
    accidx: number,
    objKey: string,
    index: number,
    langIdx: number
  ) => void;
  onAccExpandInput: (expanded: boolean, accId: string) => void;
  isFirst: boolean;
  isLast: boolean;
  children: React.ReactNode;
  lang: number;
}

const InputAccordion: React.FC<Props> = ({
  title,
  widget,
  index,
  onAccUp,
  onAccDown,
  onChangeWidgetAttribute,
  onAccExpandInput,
  isFirst,
  isLast,
  lang,
  children,
}) => {
  const theme = useTheme();

  const accordion = widget.childs.find((acc) => acc.id === title);

  const toggleShow = (accordionTitle: string) => {
    if (accordion) {
      accordion.show = !accordion.show;
      onChangeWidgetAttribute(accordion.show, index, 'show', 0, lang);
    }
  };

  // Check if Accordion is open
  const accOpen = useBoolean();

  useEffect(() => {
    accOpen.setValue(widget.childs[index].open);
  }, [widget, lang, index, accOpen]);

  const handleAccordionChange = (expanded: boolean) => {
    onAccExpandInput(expanded, title);
  };

  return (
    <Accordion
      defaultExpanded
      expanded={accOpen.value}
      onChange={(event, expanded) => handleAccordionChange(expanded)}
    >
      <AccordionSummary
        id="input"
        aria-controls="input-content"
        expandIcon={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#F6F7F9 !important',
            }}
          >
            <Iconify
              icon="gravity-ui:chevron-down"
              style={{
                width: 12,
                height: 12,
                color: theme.palette.text.secondary,
              }}
            />
          </Box>
        }
      >
        <Stack display="flex" flexDirection="row" alignItems="center" spacing={1}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleShow(title);
            }}
          >
            <Iconify
              icon="fluent:eye-12-regular"
              width="24"
              height="24"
              style={{
                color: accordion?.show ? theme.palette.primary.main : theme.palette.text.secondary,
              }}
            />
          </IconButton>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{title}</Typography>
          </Box>
          <IconButton
            size="small"
            disabled={isFirst}
            onClick={() => {
              onAccUp(index);
            }}
          >
            <Iconify
              icon="jam:arrow-up"
              width="24"
              height="24"
              style={{
                color: isFirst
                  ? alpha(theme.palette.text.disabled, 0.24)
                  : theme.palette.text.secondary,
              }}
            />
          </IconButton>
          <IconButton
            size="small"
            disabled={isLast}
            onClick={() => {
              onAccDown(index);
            }}
          >
            <Iconify
              icon="jam:arrow-down"
              width="24"
              height="24"
              style={{
                color: isLast
                  ? alpha(theme.palette.text.disabled, 0.24)
                  : theme.palette.text.secondary,
              }}
            />
          </IconButton>
        </Stack>
      </AccordionSummary>
      {/* AccordionDetails-Inhalte hier */}
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default InputAccordion;
