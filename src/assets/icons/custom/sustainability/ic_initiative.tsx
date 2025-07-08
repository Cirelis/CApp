import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface IconProps extends BoxProps {
  color: string;
}

function InitiativeIcon({ color, ...other }: IconProps) {
  return (
    <Box
      component="svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g opacity="0.6">
        <path
          d="M16.5068 7.83929L16.5068 10.1772"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5054 5.00151C16.3881 5.00151 16.293 4.90556 16.293 4.78722C16.293 4.66887 16.3881 4.57294 16.5054 4.57294"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5088 5.00151C16.6261 5.00151 16.7213 4.90556 16.7213 4.78722C16.7213 4.66887 16.6261 4.57294 16.5088 4.57294"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.00195 22.49H21.5861"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.94336 12.1452C2.94336 12.5817 3.02934 13.0139 3.19638 13.4172C3.36343 13.8205 3.60827 14.1869 3.91694 14.4956C4.2256 14.8043 4.59203 15.0491 4.99532 15.2161C5.39861 15.3832 5.83085 15.4692 6.26736 15.4692C6.70387 15.4692 7.13611 15.3832 7.5394 15.2161C7.94268 15.0491 8.30912 14.8043 8.61778 14.4956C8.92644 14.1869 9.17129 13.8205 9.33833 13.4172C9.50538 13.0139 9.59136 12.5817 9.59136 12.1452C9.59136 11.7087 9.50538 11.2764 9.33833 10.8731C9.17129 10.4698 8.92644 10.1034 8.61778 9.79474C8.30912 9.48608 7.94268 9.24124 7.5394 9.07419C7.13611 8.90715 6.70387 8.82117 6.26736 8.82117C5.83085 8.82117 5.39861 8.90715 4.99532 9.07419C4.59203 9.24124 4.2256 9.48608 3.91694 9.79474C3.60827 10.1034 3.36343 10.4698 3.19638 10.8731C3.02934 11.2764 2.94336 11.7087 2.94336 12.1452Z"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 22.4928V20.7372C1 17.8284 3.35802 15.4703 6.2668 15.4703C9.17557 15.4703 11.5336 17.8284 11.5336 20.7372V22.4928"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2085 11.9513C13.3072 13.0276 14.8118 13.6913 16.4713 13.6913C19.8358 13.6913 22.5634 10.9638 22.5634 7.59923C22.5634 4.23469 19.8358 1.5072 16.4713 1.5072C13.2087 1.5072 10.545 4.07204 10.3867 7.29543"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Box>
  );
}

export default memo(InitiativeIcon);
