import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface Props extends BoxProps {
  color: string;
  size: number;
  selected?: boolean;
  colorSelected?: string;
}

function MustardIcon({ color, size, selected = false, colorSelected = '', ...other }: Props) {
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
        d="M17.8598 9.8882H17.5628V8.31159C17.5628 7.94441 17.2652 7.64673 16.898 7.64673H16.088L14.9632 4.44448C14.8696 4.17818 14.6181 4 14.3359 4H13.6886C13.4064 4 13.1549 4.17818 13.0614 4.44448L11.9365 7.64673H11.1267C10.7595 7.64673 10.4618 7.94441 10.4618 8.31159V9.8882H10.1649C9.79768 9.8882 9.5 10.1859 9.5 10.5531V22.3351C9.5 22.7023 9.79768 23 10.1649 23H17.8598C18.227 23 18.5247 22.7023 18.5247 22.3351V10.5531C18.5247 10.1859 18.2271 9.8882 17.8598 9.8882ZM14.0123 5.74965L14.6787 7.64664H13.3458L14.0123 5.74965ZM11.7916 8.97645H12.4076H15.6169H15.6187H16.2332V9.8882H11.7916V8.97645ZM17.1949 21.6703H10.8298V11.2179H11.1233C11.1246 11.2179 11.1256 11.2181 11.1268 11.2181H16.8981C16.8993 11.2181 16.9004 11.2179 16.9015 11.2179H17.1951L17.1949 21.6703Z"
        fill={colorChange}
      />
    </Box>
  );
}

export default memo(MustardIcon);
