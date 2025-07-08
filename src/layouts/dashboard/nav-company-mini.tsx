import { alpha } from '@mui/system';
import { Typography, Button, Stack } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useGetCompanyId } from 'src/api/company';
import { useBoolean } from 'minimal-shared/hooks';
import CompanyQuickEditForm from './comp-quick-edit';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function NavCompanyMini({ sx }: { sx?: any }) {
  const { user } = useAuthContext();
  const { company } = useGetCompanyId(user?.company);
  const quickEdit = useBoolean();

  const dynamicShortForm = (company?.name?.match(/[A-Z]/g)?.join('') || '').slice(0, 2);

  return (
    <>
      <Button
        onClick={quickEdit.onTrue}
        sx={{
          textAlign: 'left',
          // bgcolor: 'background.neutral',
          padding: 1.5,
          margin: 0.5,
          borderRadius: 1,
          ...sx,
        }}
      >
        {company.name ? (
          <Stack alignItems="center" direction="row" spacing={1.5}>
            <Stack>
              <Typography
                textAlign="center"
                minWidth={48}
                sx={{
                  padding: 1.5,
                  borderRadius: 1.5,
                  bgcolor: (theme) => alpha(theme.palette.grey[300], 1),
                  color: (theme) => alpha(theme.palette.grey[600], 1),
                  fontWeight: 600,
                }}
              >
                {dynamicShortForm}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            CP
          </Typography>
        )}
      </Button>
      <CompanyQuickEditForm currentUser={user} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </>
  );
}
