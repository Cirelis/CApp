// @mui
import { alpha } from '@mui/material/styles';
import { Box, Typography, Stack, Button, Avatar } from '@mui/material';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function NavUser() {
  const { user } = useAuthContext();
  const router = useRouter();
  const isProfileView = window.location.pathname === paths.dashboard.user.account;

  return (
    <Button
      onClick={() => router.push(paths.dashboard.user.account)}
      sx={{
        margin: 2,
        padding: 2,
        textAlign: 'center',
        backgroundColor: (theme) => (isProfileView ? alpha(theme.palette.grey[300], 1) : 'inherit'),
      }}
    >
      <Stack alignItems="center" direction="row" spacing={1.5}>
        <Box>
          <Avatar
            src={user?.photo}
            alt={user?.displayName}
            sx={{
              width: 40,
              height: 40,
            }}
          >
            <Typography variant="body2" color="text.primary">
              {(user?.displayName || '')
                .split(' ')
                .map((word: string) => word[0])
                .join('')
                .toUpperCase()}
            </Typography>
          </Avatar>
        </Box>

        <Stack sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
}
