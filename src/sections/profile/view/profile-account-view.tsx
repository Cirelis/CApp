import { useState, useCallback } from 'react';
// @mui

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// hooks
import { t } from 'i18next';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// components
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

//

import { Box, Button, RadioGroup, Stack, useTheme } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { AccountChangePassword } from 'src/sections/account/account-change-password';
import { AccountGeneral } from 'src/sections/account/account-general';
import { allLangs, useTranslate } from 'src/locales';
import LanguageSelect from 'src/locales/language-select';
import { LanguagePopover } from 'src/layouts/components/language-popover';
import { SettingsButton } from 'src/layouts/components/settings-button';
import { SignOutButton } from 'src/layouts/components/sign-out-button';
import { useBoolean } from 'minimal-shared/hooks';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const theme = useTheme();
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const TABS = [
    {
      value: 'general',
      label: t('mngmt.profile.general'),
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'security',
      label: t('mngmt.profile.security'),
      icon: <Iconify icon="ic:round-vpn-key" width={24} />,
    },
  ];

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  return (
    <DashboardContent maxWidth="xl">
      <Stack direction="row" display="flex" alignItems="flex-start" justifyContent="flex-end">
        <LanguagePopover data={allLangs} />
        <SettingsButton />
        <Box sx={{ px: 2.5, mt:-1 }}>
          <SignOutButton onClose={onClose} />
        </Box>
      </Stack>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'general' && <AccountGeneral />}

      {currentTab === 'security' && <AccountChangePassword />}
    </DashboardContent>
  );
}
