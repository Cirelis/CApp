// hooks
import { UserType } from 'src/auth/types';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// components
import { useGetCompanys } from 'src/api/company';
import { useCallback, useState } from 'react';
import { toast } from 'src/components/snackbar';
import { Stack, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { doc, updateDoc } from 'firebase/firestore';
import { ICompany } from 'src/types/company';
import { FIRESTORE } from 'src/lib/firebase';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser?: UserType;
};

export default function CompanyQuickEditForm({ currentUser, open, onClose }: Props) {
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  // const { enqueueSnackbar } = useSnackbar();
  const { user, setUser } = useAuthContext();
  const { companys, companysLoading } = useGetCompanys(open, user);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSelectCompany = async (company: ICompany) => {
    setSelectedCompany(company);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const docu = doc(FIRESTORE, 'users', currentUser?.uid);
      await updateDoc(docu, { company: company.id });

      if (user) {
        setUser({ ...user, company: company.id })
      }

      toast.success('Update success!');
      onClose();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      {!companysLoading && (
        <>
          <DialogTitle>Companys</DialogTitle>
          <DialogContent sx={{ px: 1 }}>
            <div>
              {companys.map((company) => {
                const address = `${company?.street}, ${company?.plz} ${company?.city}`;
                // const adminUser = companyUsers.find((user) => user.role === 'admin');
                // const adminUserDisplayName = companyUsers.find((user) => user.id === adminUser?.id)
                //   ?.displayName;
                return (
                  <Button
                    fullWidth
                    key={company?.id}
                    onClick={() => {
                      handleSelectCompany(company);
                    }}
                    onMouseEnter={() => setSelectedCompany(company)}
                    onMouseLeave={() => setSelectedCompany(null)}
                    sx={{
                      backgroundColor:
                        selectedCompany?.id === company?.id
                          ? (theme) => theme.palette.grey[200]
                          : 'transparent',
                      border: user?.company === company?.id ? 2 : 0,
                      borderColor:
                        user?.company === company?.id
                          ? (theme) => theme.palette.primary.main
                          : 'transparent',
                    }}
                  >
                    <Stack
                      width="100%"
                      direction="column"
                      sx={{ px: 1.5, py: 1, alignItems: 'flex-start' }}
                    >
                      <Typography variant="subtitle2">{company?.name}</Typography>
                      {/* <Typography
                        variant="body2"
                        sx={{ color: (theme) => theme.palette.primary.main }}
                      >
                        {adminUserDisplayName}
                      </Typography> */}
                      <Typography
                        variant="body2"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        {address}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        Telefonnummer
                      </Typography>
                    </Stack>
                  </Button>
                );
              })}
            </div>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* <RHFRadioGroup
                name="company"
                options={companys.map((company) => ({
                  label: company?.name,
                  value: company?.id,
                }))}
              /> */}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
