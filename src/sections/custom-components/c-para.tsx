import { Stack, Typography } from '@mui/material';

type Props = {
  value: string;
  font: string;
  color: string;
  size: string;
  variant?: string;
  orientation?: string;
  fontWeight: 'regular' | 'bold';
};

export default function CPara({
  value,
  font,
  color,
  size,
  variant,
  orientation = 'left',
  fontWeight,
}: Props) {
  // Determine the font size based on the variant and size props
  const getFontSize = (fontSize: string) => {
    if (fontSize === 's') return '14px';
    if (fontSize === 'm') return '16px';
    if (fontSize === 'l') return '18px';

    // Default font size
    return '14px';
  };

  const fontSize = getFontSize(size);

  // Map fontWeight to actual font-weight values
  const fontWeightMap = {
    regular: 400,
    bold: 700,
  };

  return (
    value?.trim() && (
      <Stack sx={{ textAlign: orientation, alignItems: orientation }}>
        <Typography
          sx={{
            fontFamily: font,
            color,
            fontSize,
            fontWeight: fontWeightMap[fontWeight],
            lineHeight: 1.25, // Adjust the line-height here (e.g., 1.4 or 20px)
            opacity: variant === 'caption' ? 0.64 : 1,
            display: 'inline-block',
          }}
        >
          {value}
        </Typography>
      </Stack>
    )
  );
}
