import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";

import { authApi } from "@/api";

const useArtifactDocsList = () => {
  //  variables
  const router = useRouter();
  const artifactId = useAppSelector((state) => state.app.artifactId);
  const projectId = router.query.id;
  const perPage = useAppSelector((state) => state.pagination.perPage);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  //  states
  const [data, setData] = useState();

  const artifactList = async () => {
    try {
      const result = await authApi.get(
        `/NewRup/ArtifactDocs/GetAll/${artifactId}/${projectId}/${currentPage}/${perPage}`
      );
      setData(result);
    } catch (error) {
      console.log("error occured in getting artifacts list : ", error);
    }
  };

  useEffect(() => {
    if (artifactId && projectId) artifactList();
  }, [artifactId, projectId, perPage, currentPage]);

  return data;
};

export default useArtifactDocsList;
