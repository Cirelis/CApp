import { Box, SxProps, Theme, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useDesign } from 'src/hooks/use-design';
import { spacing } from 'src/styleguide';

type Props = {
  value?: string;
  children?: ReactNode;
  lowercase?: boolean;
  color: string;
  opacity?: number;
  textColor: string;
  font: string;
  fontWeight: 'light' | 'regular' | 'bold';
  size: string;
  sx?: SxProps<Theme>;
};

// Map fontWeight to actual font-weight values
const fontWeightMap = {
  light: 200,
  regular: 500,
  bold: 800,
};

export default function CLabel({
  value,
  children,
  lowercase = false,
  color,
  opacity = 1,
  textColor,
  font,
  fontWeight,
  size,
  sx,
}: Props) {
  const getFontSize = (fontSize: string) => {
    if (fontSize === 's') return '14px';
    if (fontSize === 'm') return '16px';
    if (fontSize === 'l') return '18px';

    // Default font size
    return '14px';
  };

  const fontSize = getFontSize(size);

  const design = useDesign();

  return (
    <Box
      sx={{
        borderRadius: design.style.cards.borderradius,
        p: spacing.buttonPaddingS[design.style.general.spacing],
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        color: textColor,
        fontSize,
        fontFamily: font,
        fontWeight: fontWeightMap[fontWeight],
        opacity,
        ...sx,
      }}
    >
      {value && (
        <Typography
          sx={{
            color: textColor,
            fontFamily: font,
            fontWeight: fontWeightMap[fontWeight],
            fontSize,
            textTransform: lowercase ? 'lowercase' : 'none',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
        >
          {value}
        </Typography>
      )}
      {children}
    </Box>
  );
}
