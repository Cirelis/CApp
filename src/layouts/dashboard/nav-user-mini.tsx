// @mui
import { alpha } from '@mui/material/styles';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import { paths } from 'src/routes/paths';
import { Avatar, Button, Typography } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function NavUserMini() {
  const router = useRouter();

  const { user } = useAuthContext();

  const isProfileView = window.location.pathname === paths.dashboard.user.account;

  return (
    <Button
      onClick={() => router.push(paths.dashboard.user.account)}
      sx={{
        margin: 2,
        padding: 2,
        textAlign: 'center',
        backgroundColor: (theme) => (isProfileView ? alpha(theme.palette.grey[200], 1) : 'inherit'),
        '&:hover': {
          backgroundColor: (theme) => alpha(theme.palette.grey[200], 1),
        },
      }}
    >
      <Avatar
        src={user?.photo}
        alt={user?.displayName}
        sx={{
          width: 32,
          height: 32,
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
    </Button>
  );
}
