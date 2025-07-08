import { CONFIG } from 'src/global-config';
// sections
import { ProfileView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export default function AccountPage() {
  const metadata = { title: `Profile - ${CONFIG.appName}` };
  return (
    <>
      <title>{metadata.title}</title>

      <ProfileView />
    </>
  );
}
