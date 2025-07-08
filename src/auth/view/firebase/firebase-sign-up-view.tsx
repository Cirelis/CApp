import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Form, Field } from 'src/components/hook-form';

import { getErrorMessage } from '../../utils';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';
import {
  signUp,
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from '../../context/firebase';
import { Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CompanyForm from './company-form';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const steps = ['User', 'Company'];

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod
  .object({
    firstName: zod.string().min(1, { message: 'First name required' }),
    lastName: zod.string().min(1, { message: 'Last name required' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Email must be a valid email address' }),
    company: zod.string().min(1, { message: 'Company name is required' }),
    branche: zod.string().min(1, { message: 'Branche is required' }),
    country: zod.string().min(1, { message: 'Country is required' }),
    state: zod.string().min(1, { message: 'State is required' }),
    plz: zod.string().min(1, { message: 'PLZ is required' }),
    city: zod.string().min(1, { message: 'City is required' }),
    street: zod.string().min(1, { message: 'Street is required' }),
    housenumber: zod.string().min(1, { message: 'Housenumber is required' }),
    size: zod.string().min(1, { message: 'Company size is required' }),
    companyabo: zod.string().min(1, { message: 'Subscription type is required' }),
    password: zod.string().min(1, { message: 'Password is required' }),
    passwordConfirmation: zod.string().min(1, { message: 'Password confirmation is required' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        path: ['passwordConfirmation'],
        code: zod.ZodIssueCode.custom,
        message: 'Passwords must match',
      });
    }
  });

// ----------------------------------------------------------------------

export function FirebaseSignUpView() {
  const router = useRouter();

  const showPassword = useBoolean();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => step === -1;

  const isStepSkipped = (step: number) => skipped.has(step);

  const defaultValues: SignUpSchemaType = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    branche: '',
    country: '',
    state: '',
    plz: '',
    city: '',
    street: '',
    housenumber: '',
    size: '',
    companyabo: '',
    password: '',
    passwordConfirmation: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const createRedirectPath = (query: string) => {
    const queryString = new URLSearchParams({ email: query }).toString();
    return `${paths.auth.firebase.verify}?${queryString}`;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        company: {
          name: data.company,
          abo: data.companyabo,
          branche: data.branche,
          country: data.country,
          state: data.state,
          plz: data.plz,
          city: data.city,
          street: data.street,
          housenumber: data.housenumber,
          size: data.size,
          createdAt: fDate(new Date()),
        },
      });

      const redirectPath = createRedirectPath(data.email);

      router.push(redirectPath);
    } catch (error: any) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSignInWithGithub = async () => {
    try {
      await signInWithGithub();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSignInWithTwitter = async () => {
    try {
      await signInWithTwitter();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepper = (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2.5 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            sx?: any;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          // Styling mit sx Prop
          labelProps.sx = {
            fontWeight: activeStep === index ? 'bold' : 'normal',
          };

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Stack spacing={2} sx={{ my: 2, maxHeight: '50%', overflowY: 'auto' }}>
            {activeStep === 0 && (
              <>
                {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Field.Text name="firstName" label="First name" />
                <Field.Text name="lastName" label="Last name" />
                <Field.Text name="email" label="Email" />
                <Field.Text type="password" name="password" label="Password" />
                <Field.Text
                  type="password"
                  name="passwordConfirmation"
                  label="Password Confirmation"
                />
              </>
            )}
            {activeStep === 1 && <CompanyForm methods={methods} />}
          </Stack>

          <Box sx={{ display: 'flex', mb: 2.5, mt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Create account
              </LoadingButton>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </>
      )}
    </>
  );

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>{renderStepper}</Box>
  );

  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.firebase.signIn} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />

      {/* <FormDivider />

      <FormSocials
        signInWithGoogle={handleSignInWithGoogle}
        singInWithGithub={handleSignInWithGithub}
        signInWithTwitter={handleSignInWithTwitter}
      /> */}
    </>
  );
}
