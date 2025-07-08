
export function getContrastText(bgColor: string): string {
  // Convert HEX or RGB color to RGB values
  let r = 0;
  let g = 0;
  let b = 0;
  if (bgColor.startsWith('#')) {
    const hex = bgColor.slice(1);
    const bigint = parseInt(hex, 16);
    r = Math.floor(bigint / 256 ** 2) % 256;
    g = Math.floor(bigint / 256) % 256;
    b = bigint % 256;
  } else if (bgColor.startsWith('rgb')) {
    const rgb = bgColor.match(/\d+/g);
    [r, g, b] = rgb ? rgb.map(Number) : [0, 0, 0];
  } else {
    return '#000'; // Default to black if format is unknown
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000' : '#fff';
}