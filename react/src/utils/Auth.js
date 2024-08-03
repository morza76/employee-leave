
import { useContext } from "react";

import AuthContext from "src/Context/authContext";



 const isLogin = () => {
        
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const authContext = useContext(AuthContext)
    console.log('authContext' , authContext.isLoggedIn);
    if(authContext.isLoggedIn) 
    {
            return true;
    }
        
        return false;
}

export default isLogin;