import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { useCallback } from 'react';
import { doc, setDoc } from '@firebase/firestore';
import { AUTH, FIRESTORE } from 'src/lib/firebase';
import { updateProfile } from '@firebase/auth';

// ----------------------------------------------------------------------

const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const resizePhoto = async (file: File): Promise<File | null> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const MAX_SIZE = 700000; // Maximum size in bytes

        let width = img.naturalWidth;
        let height = img.naturalHeight;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Function to check the size of the generated blob
        const checkSize = () => {
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob && blob.size <= MAX_SIZE) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
              });
              resolve(resizedFile);
            } else {
              // Reduce dimensions iteratively until the desired size is achieved
              const scaleFactor = Math.sqrt(MAX_SIZE / (blob?.size || MAX_SIZE));
              width *= scaleFactor;
              height *= scaleFactor;
              checkSize();
            }
          }, file.type);
        };

        checkSize();
      };
    };

    reader.readAsDataURL(file);
  });

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  displayName: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  photo: zod.any(),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  company: zod.string().min(1, { message: 'Company is required!' }),
});

// ----------------------------------------------------------------------

export function AccountGeneral() {
  const { user, setUser } = useAuthContext();
  const fbUser = AUTH.currentUser;

  const currentUser: UpdateUserSchemaType = {
    displayName: user?.displayName,
    email: user?.email,
    photo: user?.photo,
    phoneNumber: user?.phoneNumber,
    company: user?.company,
  };

  const defaultValues: UpdateUserSchemaType = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    photo: user?.photo || null,
    phoneNumber: user?.phoneNumber || '',
    company: user?.company || '',
  };

  const methods = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (fbUser) {
        let photourl = '';
        if (typeof data.photo === 'string') {
          photourl = data.photo;
        } else {
          photourl = (await toBase64(data.photo)) as string;
        }
        const usersItem = {
          displayName: data.displayName,
          email: data.email,
          photo: photourl as string,
          phoneNumber: data.phoneNumber,
          uid: fbUser.uid,
          company: data.company,
          companys: user?.companys,
        };
        const docu = doc(FIRESTORE, 'users', fbUser?.uid);
        setDoc(docu, usersItem)
          .then(() => {
            // Update successful
            updateProfile(fbUser, {
              displayName: data?.displayName,
            }).then(() => {
              // Update successful
              setUser(usersItem);
              toast.success('Update success!');
            });
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const resizedFile = await resizePhoto(file);

      if (resizedFile) {
        const newFile = Object.assign(resizedFile, {
          preview: URL.createObjectURL(resizedFile),
        });

        setValue('photo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Field.UploadAvatar
              name="photo"
              // maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
              onDrop={handleDrop}
            />

            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete user
            </Button>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="displayName" label="Name" />
              <Field.Text name="email" label="Email address" />
              <Field.Phone name="phoneNumber" label="Phone number" />

            </Box>

            <Stack spacing={3} sx={{ mt: 3, alignItems: 'flex-end' }}>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
