// react
import { useEffect, useState } from 'react';
// mock
import { _paymentPlans } from 'src/_mock/_paymentPlans';
// @mui
import { Typography, useTheme } from '@mui/material';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Top5Count = {
  label: string;
  count: number;
};

export default function OverviewAnalyticsView() {
  const theme = useTheme();
  const { user } = useAuthContext();
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4 }}>
        <span style={{ color: theme.palette.text.primary }}>
          {user?.displayName}
        </span>
        <span style={{ color: theme.palette.primary.main }}> 👋</span>
      </Typography>


    </DashboardContent>
  );
}
