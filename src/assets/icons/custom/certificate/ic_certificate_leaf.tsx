import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface IconProps extends BoxProps {
  color?: string;
}

function CertificateLeafIcon({ color, ...other }: IconProps) {
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
        d="M4.47181 17.3939C4.34366 17.2831 4.21876 17.167 4.09733 17.0455C1.06846 14.0167 1.35397 8.82047 4.735 5.43942C9.83662 0.337831 18.7219 2.42098 18.7219 2.42098C18.7219 2.42098 19.6209 6.2558 18.7913 10.3333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.625 18.6666C7.27767 18.9102 7.96495 19.0599 8.66738 19.1167"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2859 4.85718C13.9049 6.44446 3.42871 14.1429 3.42871 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6644 14.1809C10.7336 13.3941 11.2228 12.7668 12.0048 12.6562C12.6894 12.5594 13.741 12.4762 15.3332 12.4762C16.9254 12.4762 17.977 12.5594 18.6616 12.6562C19.4436 12.7668 19.9328 13.3941 20.002 14.1809C20.0517 14.7463 20.0951 15.4726 20.0951 16.2857C20.0951 18.4353 18.9606 20.4468 17.0492 21.4304C16.4108 21.759 15.7877 22 15.3332 22C14.8787 22 14.2556 21.759 13.6171 21.4304C11.7058 20.4468 10.5713 18.4353 10.5713 16.2857C10.5713 15.4726 10.6147 14.7463 10.6644 14.1809Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4287 16.6348L15.1934 18.6666L17.7144 14.8571"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

export default memo(CertificateLeafIcon);
