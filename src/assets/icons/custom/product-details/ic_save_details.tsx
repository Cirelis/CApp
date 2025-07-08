import { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface IconProps extends BoxProps {
  isActive?: boolean;
  color?: string;
}

function SaveDetailsIcon({ isActive, color, ...other }: IconProps) {
  const theme = useTheme();

  const DEFAULT = theme.palette.text.secondary;

  const colorUsed = isActive ? color : DEFAULT;

  return (
    <Box
      component="svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g clipPath="url(#clip0_206_500021)">
        <path
          fill={colorUsed}
          d="M7.25 7.6c0 .966.784 1.75 1.75 1.75h6a1.75 1.75 0 0 0 1.75-1.75V4.276c0-.152.124-.276.276-.276a.5.5 0 0 1 .38.174l2.963 3.455a2.5 2.5 0 0 1 .6 1.725l-.342 8.744A2.5 2.5 0 0 1 18.13 20.5h-.379a.5.5 0 0 1-.5-.5v-5a1.75 1.75 0 0 0-1.75-1.75h-7A1.75 1.75 0 0 0 6.75 15v5a.5.5 0 0 1-.5.5h-.137a2.392 2.392 0 0 1-2.373-2.089a47.81 47.81 0 0 1-.063-11.625l.06-.52A2.564 2.564 0 0 1 6.284 4h.466a.5.5 0 0 1 .5.5z"
        />
        <path
          fill={colorUsed}
          d="M8.25 20a.5.5 0 0 0 .5.5h6.5a.5.5 0 0 0 .5-.5v-5a.25.25 0 0 0-.25-.25h-7a.25.25 0 0 0-.25.25zm7-15.5a.5.5 0 0 0-.5-.5h-5.5a.5.5 0 0 0-.5.5v3.1c0 .138.112.25.25.25h6a.25.25 0 0 0 .25-.25z"
        />
      </g>
      <defs>
        <clipPath id="clip0_206_500021">
          <rect width="24" height="24" fill={colorUsed} />
        </clipPath>
      </defs>
    </Box>
  );
}

export default memo(SaveDetailsIcon);
