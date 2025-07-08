// @mui
import { alpha } from '@mui/material/styles';
import { Typography, Stack, Button } from '@mui/material';
// api
import { useGetCompanyId } from 'src/api/company';
// components
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'minimal-shared/hooks';
import CompanyQuickEditForm from './comp-quick-edit';

// ----------------------------------------------------------------------

export default function NavCompany() {
  const { user } = useAuthContext();

  const { company } = useGetCompanyId(user?.company);
  const quickEdit = useBoolean();

  const dynamicShortForm = (company?.name?.match(/[A-Z]/g)?.join('') || '').slice(0, 2);

  const address = `${company?.street}, ${company?.plz} ${company?.city}`;

  return (
    <>
      <Button
        onClick={quickEdit.onTrue}
        sx={{
          textAlign: 'left',
          bgcolor: 'background.neutral',
          padding: 2,
          margin: 1.5,
          borderRadius: 2,
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

            <Stack>
              <Typography
                variant="body2"
                noWrap
                sx={{ color: (theme) => alpha(theme.palette.text.primary, 1), fontWeight: 500 }}
              >
                {company?.name}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                sx={{
                  color: (theme) => alpha(theme.palette.text.secondary, 1),
                  // whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {address}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <Typography
              variant="body2"
              noWrap
              sx={{ color: (theme) => alpha(theme.palette.text.primary, 1) }}
            >
              Company
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{ color: (theme) => alpha(theme.palette.text.secondary, 1) }}
            >
              Adress
            </Typography>
          </Stack>
        )}
      </Button>
      <CompanyQuickEditForm currentUser={user} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </>
  );
}
