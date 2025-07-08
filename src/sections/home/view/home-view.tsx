import Stack from '@mui/material/Stack';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';
import { ComingSoonView } from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />
      <ComingSoonView />

      <BackToTopButton />
      {/* <HomeHero /> */}

      {/* <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeMinimal />

      </Stack> */}
    </>
  );
}
