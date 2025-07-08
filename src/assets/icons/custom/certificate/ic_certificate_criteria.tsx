import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface IconProps extends BoxProps {
  color?: string;
}

function CertificateCriteriaIcon({ color, ...other }: IconProps) {
  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 0 0 23 24"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        d="M19.436 7.75352C19.2605 7.26352 18.6615 5.97002 16.802 4.14702C14.8315 2.21502 13.467 1.67102 13.042 1.53802C12.1949 1.51205 11.3475 1.49938 10.5 1.50002C7.368 1.50002 5.217 1.66002 3.876 1.81352C2.7755 1.93952 1.951 2.76502 1.83 3.86602C1.67 5.31102 1.5 7.73652 1.5 11.5C1.5 15.2635 1.6705 17.689 1.83 19.134C1.951 20.235 2.7755 21.0605 3.876 21.1865C4.825 21.295 6.1795 21.4065 8 21.463"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4429 7.97918C18.3994 8.13468 16.5224 8.01518 15.0979 7.88368C14.555 7.83521 14.0461 7.59805 13.6598 7.2134C13.2735 6.82876 13.0342 6.32094 12.9834 5.77818C12.8494 4.37718 12.7304 2.54518 12.8934 1.53418"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5001 17.129C20.5001 17.129 20.2636 16.075 18.8441 14.656C17.4251 13.2365 16.3711 13 16.3711 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 6.5L7 8.5L9.5 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12L7 14L9.5 10.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.8325 15.7963C22.5595 15.0698 22.8375 14.0078 22.2295 13.1788C21.9609 12.8158 21.665 12.4738 21.3445 12.1558C20.9745 11.7858 20.6295 11.4968 20.321 11.2708C19.4925 10.6628 18.4305 10.9408 17.7035 11.6673L11.5335 17.8373C11.262 18.1093 11.076 18.4538 11.044 18.8373C11.0005 19.3578 10.9685 20.2423 11.0525 21.5513C11.0674 21.7842 11.1667 22.0036 11.3317 22.1686C11.4967 22.3336 11.7161 22.4329 11.949 22.4478C13.2575 22.5318 14.1425 22.4998 14.663 22.4558C15.046 22.4238 15.391 22.2383 15.663 21.9658L21.8325 15.7963Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

export default memo(CertificateCriteriaIcon);
