import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import { Box, CircularProgress } from '@mui/material';

import AuthContext from 'src/Context/authContext';
// eslint-disable-next-line react/prop-types
export default function Auth({ children }) {
  const authContext = useContext(AuthContext);

  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { isLoggedIn } = authContext;

    console.log('auth.js isLoggedIn : ', isLoggedIn);

    if (!isLoggedIn) {
      const token = JSON.parse(localStorage.getItem('user'));

      if (token) {
        setStatus('loading');
      } else {
        navigate('/login');
      }
    } else {
      setStatus('logged');
    }
  });

  return (
    <>
      {status === 'logged' ? (
        <>{children}</>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // ارتفاع 100 درصد از ارتفاع ویوپورت
          }}
        >
         
            <CircularProgress />
          
        </Box>
      )}
    </>
  );
}
