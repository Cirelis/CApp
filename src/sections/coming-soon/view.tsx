import { varAlpha } from 'minimal-shared/utils';
import { useCountdownDate } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { _socials } from 'src/_mock';
import { ComingSoonIllustration } from 'src/assets/illustrations';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function ComingSoonView() {
  const countdown = useCountdownDate(new Date('2025-12-12 20:30'));
  const router = useRouter();

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Coming soon!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>
      <Stack sx={{ mt: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <ComingSoonIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </Stack>
      <Stack
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2', justifyContent: 'center', flexDirection: 'row' }}
      >
        <TimeBlock label="days" value={countdown.days} />
        <TimeBlock label="hours" value={countdown.hours} />
        <TimeBlock label="minutes" value={countdown.minutes} />
        <TimeBlock label="seconds" value={countdown.seconds} />
      </Stack>
      <Stack sx={{ mt: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => window.open('https://www.cirelis.de/kontakt', '_blank')}
        >
          Notify me
        </Button>
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div>
      <div> {value} </div>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
