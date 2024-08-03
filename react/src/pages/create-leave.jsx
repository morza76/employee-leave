import { Helmet } from 'react-helmet-async';

import { CreateLeaveView } from 'src/sections/createLeave';


// ----------------------------------------------------------------------

export default function CreateLeavePage() {
  return (
    <>
      <Helmet>
        <title> Create Leave | Minimal UI </title>
      </Helmet>

      <CreateLeaveView />
    </>
  );
}
