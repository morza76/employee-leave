import { Helmet } from 'react-helmet-async';

import { Dashboard } from 'src/sections/dashboard';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Dashboard />
    </>
  );
}
