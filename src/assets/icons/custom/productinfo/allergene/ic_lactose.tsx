import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface Props extends BoxProps {
  color: string;
  size: number;
  selected?: boolean;
  colorSelected?: string;
}

function LactoseIcon({ color, size, selected = false, colorSelected = '', ...other }: Props) {
  const colorChange = selected && colorSelected ? colorSelected : color;

  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <rect
        x="0.625"
        y="0.625"
        width="26.75"
        height="26.75"
        rx="13.375"
        stroke={colorChange}
        strokeWidth="1.25"
      />
      <path
        d="M18.2938 7.77915V5.99446C18.2938 5.44609 17.8063 5 17.2072 5H11.1502C10.551 5 10.0635 5.44609 10.0635 5.99446V7.77915L7 11.2224V22H21.3574V11.2224L18.2938 7.77915ZM11.0735 6.0282C11.0874 6.02004 11.113 6.00994 11.1502 6.00994H17.2072C17.2443 6.00994 17.2699 6.02 17.2839 6.0282V7.46627H11.0735V6.0282ZM13.127 20.9901H8.00995V11.6066L10.5684 8.73093L13.127 11.6066V20.9901ZM11.6937 8.47622H17.5622L19.7272 10.9096H13.8586L11.6937 8.47622ZM20.3474 20.9901H14.137V11.9195H20.3474V20.9901Z"
        fill={colorChange}
        stroke={colorChange}
        strokeWidth="0.2"
      />
    </Box>
  );
}

export default memo(LactoseIcon);
