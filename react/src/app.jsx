/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './Context/authContext';


// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [roles, setRoles] = useState({});

  const login = useCallback((param_userInfos, param_token, param_refresh , param_role) => {
    setToken(param_token);
    setRefresh(param_refresh);
    setIsLoggedIn(true);
    setUserInfos(param_userInfos);
    console.log("line31",param_userInfos);
    setRoles(param_role)
    localStorage.setItem('user', JSON.stringify({ param_token }));
    localStorage.setItem('refresh_token', JSON.stringify({ param_refresh }));
    navigate("/")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setRefresh(false);
    setUserInfos({});
    setIsLoggedIn(false);
    setRoles({})
    localStorage.removeItem('user');
    localStorage.removeItem('refresh');
  }, []);



  useEffect(() => {

      const accessToken = JSON.parse(localStorage.getItem("user"))        

      if(accessToken)
        {
      
          fetch(`http://localhost:3000/users/getMe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${accessToken.param_token}`
            },
          // eslint-disable-next-line consistent-return
          }).then((res) => {
      
            if(!res.ok)
              {
                logout();
              }
              else {
                return res.json()
              }
  
          }
            
          ).then((res) => {
            console.log("line78",res);
            if(!res)
              {
                logout();
              }
            const refreshToken = JSON.parse(localStorage.getItem("refresh_token"))      
            login(res.userData , accessToken.param_token , refreshToken , res.roles)
            console.log("line81",res.userData);
          })
        }

        

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[login])

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isLoggedIn,
        token,
        userInfos,
        roles,
        refresh,
        login,
        logout,
      }}
    >
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
