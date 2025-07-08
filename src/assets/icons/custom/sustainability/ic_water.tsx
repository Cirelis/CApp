import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface IconProps extends BoxProps {
  color: string;
}

function WaterIcon({ color, ...other }: IconProps) {
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
          d="M17.4933 18.1343C17.4061 18.8875 17.0438 19.5821 16.476 20.0847C15.9081 20.5872 15.1747 20.8624 14.4164 20.8574H7.61645C6.85816 20.8624 6.12472 20.5872 5.55687 20.0847C4.98901 19.5821 4.62672 18.8875 4.53954 18.1343L2.57031 0.857422H19.4933L17.4933 18.1343Z"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.27734 7.01172H18.785"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Box>
  );
}

export default memo(WaterIcon);
