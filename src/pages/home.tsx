import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Cirelis',
  description:
    'The starting point for your Story',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />

      <HomeView />
    </>
  );
}
