import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface ManufacturerIconProps extends BoxProps {
  color: string;
}

function ManufacturerIcon({ color, ...other }: ManufacturerIconProps) {
  return (
    <Box
      component="svg"
      width="23"
      height="24"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g opacity="0.6">
        <path
          d="M18 16.5942H13"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 19.0942H13"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.25 7.09424H13.75"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 2.0943C9.6195 1.4678 7.923 1.3888 6 2.0943C4.077 2.7998 2.3805 2.7208 1 2.0943"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 5.0943C9.6195 4.4678 7.923 4.3888 6 5.0943C4.077 5.7998 2.3805 5.7208 1 5.0943"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 14.0504C1 13.0579 1.3685 12.0984 2.1415 11.4764C3.2565 10.5789 5.195 9.25835 7.9905 8.18785C8.8925 7.84185 9.8345 8.49835 9.8755 9.46335C9.9155 10.4204 9.9595 11.6759 9.9825 13.0734H20.501C20.6979 13.0734 20.8929 13.1122 21.0749 13.1876C21.2568 13.2629 21.4221 13.3735 21.5613 13.5128C21.7005 13.6521 21.8109 13.8174 21.8862 13.9994C21.9615 14.1814 22.0001 14.3764 22 14.5734V17.8234C22 19.0864 21.9205 20.0609 21.825 20.7769C21.695 21.7469 20.875 22.3909 19.897 22.4314C18.3425 22.4959 15.611 22.5739 11.5 22.5739C7.389 22.5739 4.6575 22.4959 3.103 22.4314C2.125 22.3909 1.3045 21.7474 1.175 20.7769C1.08 20.0609 1 19.0864 1 17.8244V14.0504Z"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.9809 22.5843C8.9919 22.0783 8.9999 21.4268 8.9999 20.5943C8.9999 19.3943 8.9834 18.5693 8.9644 18.0158C8.9414 17.3523 8.6044 16.7608 7.9479 16.6593C7.63402 16.6135 7.3171 16.5918 6.9999 16.5943C6.6159 16.5943 6.3039 16.6203 6.0519 16.6593C5.3954 16.7608 5.0584 17.3523 5.0354 18.0158C5.00898 18.875 4.99715 19.7347 4.9999 20.5943C4.9999 21.3903 5.0069 22.0208 5.0174 22.5168"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 13.0942C13.2676 10.1854 13.5748 7.28025 13.9215 4.37974C13.997 3.75074 14.464 3.24274 15.094 3.17324C15.5609 3.12145 16.0302 3.09508 16.5 3.09424C17.025 3.09424 17.509 3.12974 17.906 3.17324C18.536 3.24324 19.003 3.75074 19.0785 4.37974C19.4252 7.28025 19.7324 10.1854 20 13.0942"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Box>
  );
}

export default memo(ManufacturerIcon);
