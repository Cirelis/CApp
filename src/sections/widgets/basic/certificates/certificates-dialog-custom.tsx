import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Stack,
  useTheme,
  IconButton,
} from '@mui/material';
import { Image } from 'src/components/image';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import CLabel from 'src/sections/custom-components/c-label';
import CAccordionSub from 'src/sections/custom-components/c-accordion-sub';
import { Iconify } from 'src/components/iconify';
import { IDesign, IWidget } from 'src/types/product';
import { ICustomCert } from 'src/types/certificates';
import Custom from './content/custom';

interface CertificateDialogProps {
  open: boolean;
  onClose: () => void;
  langIndex: number;
  certificate?: ICustomCert;
  design: IDesign;
}

const CertificateDialogCustom: React.FC<CertificateDialogProps> = ({
  open,
  onClose,
  langIndex,
  certificate,
  design,
}) => {
  const theme = useTheme();
  // Style
  const { backgroundColor } = design.style.colors;

  if (!certificate) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ backgroundColor, p: 2 }}>
        <Stack>
          <IconButton
            onClick={onClose}
            disableRipple
            disableFocusRipple
            sx={{
              display: 'flex',
              justifyContent: 'right',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&:active': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Iconify icon="mdi:close-circle" width={30} />
          </IconButton>
          <Custom certificate={certificate} design={design} langIndex={langIndex} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDialogCustom;
