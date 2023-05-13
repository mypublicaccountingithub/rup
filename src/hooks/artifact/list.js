import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";


import { authApi } from "@/api";


const useArtifactDocsList = () => {
  //  variables
  const router = useRouter();
  const artifactId = useAppSelector((state) => state.app.artifactId);
  const projectId = router.query.id;


  //  states
  const [data, setData] = useState();


  const artifactList = async () => {
    try {
      const result = await authApi.get(
        `/NewRup/ArtifactDocs/GetAll/${artifactId}/${projectId}/1/1111`
      );
      console.log('ressult : ', result);
      setData(result);
    } catch (error) {
      console.log("error occured in getting artifacts list : ", error);
    }
  };


  useEffect(() => {
    if (artifactId && projectId)
      artifactList();
  }, [artifactId, projectId]);

  return data;
};

export default useArtifactDocsList;
