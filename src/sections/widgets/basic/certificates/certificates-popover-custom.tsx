import { IconButton, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { spacing } from 'src/styleguide';
import { ICustomCert } from 'src/types/certificates';
import { IDesign } from 'src/types/product';
import Custom from './content/custom';

interface CertificateDialogProps {
  onClose: () => void;
  certificate?: ICustomCert;
  langIndex: number;
  design: IDesign;
}

const CertificatePopoverCustom: React.FC<CertificateDialogProps> = ({
  onClose,
  certificate,
  langIndex,
  design,
}) => {
  const theme = useTheme();

  if (!certificate) return null;

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
      <Custom certificate={certificate} design={design} langIndex={langIndex} />
    </Stack>
  );
};

export default CertificatePopoverCustom;
