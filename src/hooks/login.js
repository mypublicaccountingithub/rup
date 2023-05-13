import { api } from '../api';




const useLogin = ()=>{

    //  handlers
    const handleLogin = async (loginData)=>{
        const loginResult = await api.post("/NewRup/Login", loginData)
        return loginResult;
    }

    return handleLogin;
}

export default useLogin;