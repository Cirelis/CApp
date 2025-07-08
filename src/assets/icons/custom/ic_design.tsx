import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------
interface DesignIconProps extends BoxProps {
  active?: boolean;
}

function DesignIcon({ active, ...other }: DesignIconProps) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;
  const DEFAULT = theme.palette.text.secondary;

  const color = active ? PRIMARY_MAIN : DEFAULT;

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g clipPath="url(#clip0_204_289421)">
        <path
          opacity="0.32"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.75 12C0.75 5.7866 5.7881 0.75 12.0026 0.75C17.7229 0.75 22.357 5.16525 23.1348 10.4868C23.4968 12.9641 21.6125 15.0138 19.1533 15.0143C18.7387 15.0145 18.3228 15.0057 17.9264 14.9973L17.8148 14.995C17.3811 14.986 16.9744 14.9785 16.6 14.9834C15.8048 14.9938 15.3144 15.0634 15.0777 15.1817C14.5798 15.4306 14.1231 16.2192 14.523 17.1936C14.7751 17.8081 14.9841 18.2886 15.1553 18.6819L15.1741 18.7251C15.3454 19.1189 15.4874 19.4459 15.588 19.7241C15.6909 20.0088 15.7655 20.2814 15.7858 20.573C15.8064 20.8693 15.768 21.1413 15.6992 21.4225C15.5075 22.2066 14.9182 22.6711 14.2576 22.923C13.6149 23.1682 12.8232 23.25 12.0026 23.25C5.7881 23.25 0.75 18.2134 0.75 12Z"
          fill={color}
        />
        <path
          d="M16.5 7C16.5 8.3807 15.3807 9.5 14 9.5C12.6193 9.5 11.5 8.3807 11.5 7C11.5 5.6193 12.6193 4.5 14 4.5C15.3807 4.5 16.5 5.6193 16.5 7Z"
          fill={color}
        />
        <path
          d="M9.5 10.75C9.5 11.9927 8.49265 13 7.25 13C6.00735 13 5 11.9927 5 10.75C5 9.50735 6.00735 8.5 7.25 8.5C8.49265 8.5 9.5 9.50735 9.5 10.75Z"
          fill={color}
        />
        <path
          d="M9.25 19C10.2165 19 11 18.2165 11 17.25C11 16.2835 10.2165 15.5 9.25 15.5C8.2835 15.5 7.5 16.2835 7.5 17.25C7.5 18.2165 8.2835 19 9.25 19Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_204_289421">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </Box>
  );
}

export default memo(DesignIcon);
