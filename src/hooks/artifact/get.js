import { useState } from 'react';


import { authApi } from "@/api";


const useGetArtifact = ()=>{
    const [data, setData] = useState();

    const getArtifact = async (artifact, iteration)=>{
        try{
            const data = await authApi.get(`/NewRup/ArtifactDocs/${artifact}/${iteration}`)
            setData(data);
        }
        catch(error){
            console.log("error occured in getting artifact : ", error)
        }
    }

    return getArtifact;
}


export default useGetArtifact;