// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function LabelLayout({ children }: Props) {
  return (
    <Container component="main" sx={{ p: 0 }}>
      <Stack
        sx={{
          m: 'auto',
          p: 0,
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Stack>
    </Container>
  );
}
