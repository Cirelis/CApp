import { IconButton, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { spacing } from 'src/styleguide';
import { ICertificate } from 'src/types/certificates';
import { IDesign, IWidget } from 'src/types/product';
import EUBio from './content/eubio/eubio';
import Naturland from './content/naturland/naturland';

interface CertificateDialogProps {
  widget: IWidget;
  langIndex: number;
  onClose: () => void;
  certificate?: ICertificate;
  design: IDesign;
}

const CertificatePopover: React.FC<CertificateDialogProps> = ({
  widget,
  langIndex,
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
        return (
          <Naturland
            naturland={naturlandChild}
            certificate={certificate}
            design={design}
            langIndex={langIndex}
          />
        );
      }
      case 'EU-Bio': {
        const eubioChild = widget.childs.find((c) => c.id === 'EU-Bio');
        if (!eubioChild) {
          return null; // or render a fallback UI
        }
        return (
          <EUBio
            eubio={eubioChild}
            certificate={certificate}
            design={design}
            langIndex={langIndex}
          />
        );
      }
      // Add more cases as needed for other certificate types.
      default:
        return null;
    }
  };

  return (
    <Stack sx={{ p: spacing.containerPadding[design.style.general.spacing] }}>
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
          p: 0,
        }}
      >
        <Iconify icon="mdi:close-circle" width={30} />
      </IconButton>
      {renderCertificateComponent()}
    </Stack>
  );
};

export default CertificatePopover;
