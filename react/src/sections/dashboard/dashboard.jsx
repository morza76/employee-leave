import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import { TabList, TabPanel, TabContext } from '@mui/lab';

import AuthContext from 'src/Context/authContext';

import UserView from '../user/view/user-view';
import { UsersView } from '../usersLeaves/view';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const authContext = useContext(AuthContext);

  // const [admin, setAdmin] = useState(false);

  // const [usersLeaves, setUsersLeaves] = useState([]);

  // const [users, setUsers] = useState([]);

  console.log(authContext);
  // useEffect(() => {
  //   if (authContext.role[1]) {
  //     console.log(authContext);
  //     setAdmin(true);
  //   }
  // }, [authContext]);

  return (
    <>
      {/* {renderHeader} */}

      <Container>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="مرخصی های شما" value="1" />
                {authContext.roles[1] && <Tab label="مرخصی کارکنان" value="2" />}
              </TabList>
            </Box>
            <TabPanel value="1">
              <UserView />
            </TabPanel>
            <TabPanel value="2">
              <UsersView />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}
