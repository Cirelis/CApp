import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface IngredientsIconProps extends BoxProps {
  color: string;
}

function IngredientsIcon({ color, ...other }: IngredientsIconProps) {
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
          d="M20.3811 9.33449C18.9347 10.5934 16.6598 10.3788 15.4743 8.87182C14.2889 7.36481 14.6161 5.10331 16.1802 3.9942C17.6428 2.83769 22.2858 3.51799 22.2858 3.51799C22.2858 3.51799 21.8607 8.17798 20.3811 9.33449Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.0969 12.2145C6.3635 13.317 8.35586 13.1292 9.39405 11.8094C10.4314 10.4906 10.1301 8.49796 8.77586 7.53765C7.49493 6.52483 3.42871 7.12061 3.42871 7.12061C3.42871 7.12061 3.80107 11.2017 5.0969 12.2145Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.857178 20.6609C0.857178 20.6609 4.28575 17.2323 12 17.2323C19.7143 17.2323 23.1429 20.6609 23.1429 20.6609"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6323 9.06555L15.4042 9.27855C13.6899 10.9928 12.1646 14.9418 12 17.2323C12 14.5186 11.4765 13.3142 9.56597 11.7807L9.48218 11.701"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath>
          <rect width="24" height="24" fill="white" transform="translate(0 0.0893555)" />
        </clipPath>
      </defs>
    </Box>
  );
}

export default memo(IngredientsIcon);
