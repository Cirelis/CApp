import React from 'react';
import { Dialog, DialogContent, IconButton, Stack, useTheme } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { IDesign, IWidget } from 'src/types/product';
import { ICertificate } from 'src/types/certificates';
import Naturland from './content/naturland/naturland';
import EUBio from './content/eubio/eubio';

interface CertificateDialogProps {
  widget: IWidget;
  langIndex: number;
  open: boolean;
  onClose: () => void;
  certificate?: ICertificate;
  design: IDesign;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({
  widget,
  langIndex,
  open,
  onClose,
  certificate,
  design,
}) => {
  const theme = useTheme();
  const { backgroundColor } = design.style.colors;

  if (!certificate) return null;

  const renderCertificateComponent = () => {
    // Adjust the condition based on your certificate's identifier or other property.
    switch (certificate.id) {
      case 'Naturland': {
        const naturlandChild = widget.childs.find((c) => c.id === 'Naturland');
        if (!naturlandChild) {
          return null; // or render a fallback UI
        }
        return <Naturland naturland={naturlandChild} certificate={certificate} design={design} langIndex={langIndex}/>;
      }
      case 'EU-Bio': {
        const eubioChild = widget.childs.find((c) => c.id === 'EU-Bio');
        if (!eubioChild) {
          return null; // or render a fallback UI
        }
        return <EUBio eubio={eubioChild} certificate={certificate} design={design} langIndex={langIndex}/>;
      }
      // Add more cases as needed for other certificate types.
      default:
        return null;
    }
  };

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
              '&:hover': { backgroundColor: 'transparent' },
              '&:active': { backgroundColor: 'transparent' },
            }}
          >
            <Iconify icon="mdi:close-circle" width={30} />
          </IconButton>
          {renderCertificateComponent()}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDialog;
