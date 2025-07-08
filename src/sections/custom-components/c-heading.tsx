import { Stack, Typography } from '@mui/material';

type Props = {
  value: string;
  fontHeadlines: string;
  colorHeadlines: string;
  variant: string;
  size: string;
  orientation?: string;
  fontWeight: 'regular' | 'bold';
};

export default function CHeading({
  value,
  fontHeadlines,
  colorHeadlines,
  variant,
  size,
  orientation = 'flex-start',
  fontWeight,
}: Props) {
  // Determine the font size based on the variant and size props
  const getFontSize = (fontVariant: string, fontSize: string) => {
    if (fontVariant === 'h1') {
      if (fontSize === 's') return '22px'; // 20px / 16 = 1.25em
      if (fontSize === 'm') return '26px'; // 24px / 16 = 1.5em
      if (fontSize === 'l') return '30px'; // 28px / 16 = 1.75em
    } else if (fontVariant === 'h2') {
      if (fontSize === 's') return '20px'; // 18px / 16 = 1.125em
      if (fontSize === 'm') return '22px'; // 20px / 16 = 1.25em
      if (fontSize === 'l') return '24px'; // 22px / 16 = 1.375em
    } else if (fontVariant === 'h3') {
      if (fontSize === 's') return '18px'; // 16px / 16 = 1em
      if (fontSize === 'm') return '20px'; // 18px / 16 = 1.125em
      if (fontSize === 'l') return '22px'; // 20px / 16 = 1.25em
    } else if (fontVariant === 'h4') {
      if (fontSize === 's') return '16px'; // 14px / 16 = 0.875em
      if (fontSize === 'm') return '18px'; // 16px / 16 = 1em
      if (fontSize === 'l') return '20px'; // 18px / 16 = 1.125em
    }
    // Default font size
    return '1em'; // 16px / 16 = 1em
  };

  const fontSize = getFontSize(variant, size);

  // Map fontWeight to actual font-weight values
  const fontWeightMap = {
    regular: 400, // Standard for 'regular' font weights
    bold: 700, // Standard for 'bold' font weights
  };

  return (
    <Stack
      sx={{
        textAlign: orientation,
        alignItems: orientation,
      }}
    >
      <Typography
        sx={{
          fontFamily: fontHeadlines,
          color: colorHeadlines,
          fontSize,
          fontWeight: fontWeightMap[fontWeight], // Use mapped values
          lineHeight: 1.25,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
