import { useState, useEffect } from "react";


//  api
import { authApi } from '../api';


const useUser = ()=>{
    //  states
    const [data, setData] = useState({data:null, isError:false});

    //  handlers
    const getUser = async ()=>{
        try{
            const user = await authApi.get("/NewRup/User/profile");
            setData({...data, data:user.data})
        }
        catch(error){
            setData({...data, isError:true})
        }
        
    }


    //  side effects
    useEffect(()=>{
        getUser()
    }, [])


    return data;

}


export default useUser;