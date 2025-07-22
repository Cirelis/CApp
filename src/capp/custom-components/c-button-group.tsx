import { Button, ButtonGroup, SxProps, Typography, TypographyVariant, alpha, useTheme } from '@mui/material';
import { Iconify } from 'src/components/iconify';

type Props = {
  variant?: 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  options: {
    value: any;
    label: string;
    labelVariant?: TypographyVariant | undefined;
    component?: React.ReactNode;
    icon?: string;
    iconSize?: number;
    sx?: SxProps;
  }[];
  selectedValue: any;
  handleChange: (value: any) => void;
  sx?: SxProps;
};

export default function CButtonGroup({
  variant,
  color,
  size,
  options,
  handleChange,
  selectedValue,
  sx,
}: Props) {
  const theme = useTheme();
  return (
    <ButtonGroup variant={variant} color={color} size={size} sx={sx}>
      {options.map((option) => (
        <Button
          key={option.label}
          onClick={() => handleChange(option.value)}
          sx={{
            backgroundColor:
              selectedValue === option.value ? alpha(theme.palette.primary.main, 0.2) : 'inherit',
            ...option.sx,
          }}
        >
          {option.icon && <Iconify width={option.iconSize ?? 20} icon={option.icon} />}
          {!option.icon && option.component && option.component}
          {!option.icon && !option.component && (
            <Typography variant={option.labelVariant ?? 'subtitle2'}>{option.label}</Typography>
          )}
        </Button>
      ))}
    </ButtonGroup>
  );
}
