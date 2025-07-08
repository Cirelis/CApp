import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
interface DesignIconProps extends BoxProps {
  active?: boolean;
}

function CoverIcon({ active, ...other }: DesignIconProps) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;
  const DEFAULT = theme.palette.text.secondary;

  const color = active ? PRIMARY_MAIN : DEFAULT;

  return <Iconify icon="material-symbols:full-coverage-rounded" width={30} color={color} />;
}

export default memo(CoverIcon);
