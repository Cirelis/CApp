import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface NutritionIconProps extends BoxProps {
  color: string;
}

function NutritionIcon({ color, ...other }: NutritionIconProps) {
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
          d="M20.9954 14.5962C20.9954 6.00983 13.4127 2.03737 9.84115 1.10718C11.1776 4.44945 11.105 6.92361 9.3797 9.97259C9.10037 10.4662 8.42117 10.5152 8.04608 10.0898L5.85134 7.60062C0.11066 13.7006 3.41568 23.5123 12.5059 23.0561C19.4609 22.6267 20.9954 17.9947 20.9954 14.5962Z"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.71582 18.8157L15.3444 13.1871"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.3976 14.0053C10.1609 14.0053 9.96899 13.8135 9.96899 13.5768C9.96899 13.3401 10.1609 13.1482 10.3976 13.1482"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.3975 14.0053C10.6342 14.0053 10.826 13.8135 10.826 13.5768C10.826 13.3401 10.6342 13.1482 10.3975 13.1482"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9557 18.8553C14.719 18.8553 14.5271 18.6633 14.5271 18.4267C14.5271 18.19 14.719 17.9982 14.9557 17.9982"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9556 18.8553C15.1923 18.8553 15.3841 18.6633 15.3841 18.4267C15.3841 18.19 15.1923 17.9982 14.9556 17.9982"
          stroke={color}
          strokeWidth="1.75"
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

export default memo(NutritionIcon);
