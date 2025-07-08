import { MenuItem, Stack } from '@mui/material';
import { t } from 'i18next';
import { UseFormReturn } from 'react-hook-form';
import { _companySizes, _paymentPlans } from 'src/_mock';
import { Field } from 'src/components/hook-form';

interface Props {
  methods: UseFormReturn<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    branche: string;
    country: string;
    state: string;
    plz: string;
    city: string;
    street: string;
    housenumber: string;
    size: string;
    companyabo: string;
    password: string;
    passwordConfirmation: string;
  }>;
}

export default function CompanyForm({ methods }: Props) {
  return (
    <Stack spacing={2} sx={{ mt: 2.5 }}>
      <Field.Text name="company" label={t('mngmt.companyaccount.companyName')} />
      <Field.Select name="companyabo" sx={{ width: '100%' }} label={t('mngmt.companyaccount.abo')}>
        {_paymentPlans.map((plan) => (
          <MenuItem key={plan.subscription} value={plan.subscription}>
            {plan.subscription}
          </MenuItem>
        ))}
      </Field.Select>
      <Field.Text name="branche" label={t('mngmt.companyaccount.branche')} />
      <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" />
      <Field.Text name="state" label={t('mngmt.companyaccount.state')} />
      <Stack direction="row" spacing={2}>
        <Field.Text sx={{ flex: 1 }} name="plz" label={t('mngmt.companyaccount.plz')} />
        <Field.Text sx={{ flex: 2 }} name="city" label={t('mngmt.companyaccount.city')} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Field.Text sx={{ flex: 3 }} name="street" label={t('mngmt.companyaccount.street')} />
        <Field.Text
          sx={{ flex: 1 }}
          name="housenumber"
          label={t('mngmt.companyaccount.housenumber')}
        />
      </Stack>
      <Field.Select name="size" label={t('mngmt.companyaccount.size')}>
        {_companySizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Field.Select>
    </Stack>
  );
}
