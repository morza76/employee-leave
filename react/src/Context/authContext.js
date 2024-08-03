import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn : false,
    token : null,
    refresh : null,
    userInfos : null,
    roles : [],
    login : () => {},
    logout : () => {}
});

export default AuthContext;