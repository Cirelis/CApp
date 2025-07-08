import { alpha, useTheme } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';

type IconProps = {
  color?: string;
  isActive?: boolean;
};

const ButtonIcon: React.FC<IconProps> = ({ color, isActive }) => {
  const theme = useTheme();

  const colorUsed = isActive ? color || theme.palette.primary.main : theme.palette.text.secondary;

  return <Iconify icon="solar:download-bold-duotone" width={32} style={{ color: colorUsed }} />;
};

export default ButtonIcon;
