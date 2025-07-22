import { ReactNode } from 'react';
import { Button, alpha } from '@mui/material';
import { useDesign } from 'src/hooks/use-design';
import { spacing } from 'src/styleguide';

type Props = {
  children: ReactNode;
  onClick: () => void;
  variant: string;
  buttonColor: string;
  textColor: string;
  size: string;
};

export default function CButton({
  children,
  onClick,
  variant,
  buttonColor,
  textColor,
  size,
}: Props) {
  const design = useDesign();

  return (
    <Button
      onClick={onClick}
      variant={variant as 'text' | 'outlined' | 'contained'}
      sx={{
        backgroundColor: variant === 'contained' ? buttonColor : 'transparent',
        color: textColor,
        borderColor: variant === 'outlined' ? buttonColor : 'transparent',
        '&:hover': {
          borderColor: buttonColor,
          backgroundColor:
            variant === 'contained' ? alpha(buttonColor, 0.9) : alpha(buttonColor, 0.1),
        },
        width: '100%',
        borderRadius: design.style.cards.borderradius,
        p: spacing.containerPadding[design.style.general.spacing],
      }}
      size={size as 'small' | 'medium' | 'large'}
    >
      {children}
    </Button>
  );
}
