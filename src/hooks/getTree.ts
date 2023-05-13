import { authApi } from "../api";
import { useState, useEffect } from "react";

interface Item {
  activityId: number;
  activityTitle: string;
  artifactsId: number;
  artifactsTitle: string;
  disciplineId: number;
  disciplineTitle: string;
  artifactTypeId: string;
}

interface RequestType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  data?: Item[];
}

const useGetTree = (projectId:any, phaseId: any): RequestType => {
  const [treeApiState, setTreeApiState] = useState<RequestType>({
    data: [],
    loading: true,
    error: false,
    errorMessage: "",
  });

  const getTrees = async () => {
    try {
      // const response = await authApi.get(
      //   `/NewRup/Artifacts/${phaseId}`
      // );

      const response = await authApi.get(
        `/NewRup/Artifacts/${projectId}/${phaseId}`
      );
      
      setTreeApiState({
        data: response.data.data,
        loading: false,
        error: false,
        errorMessage: "",
      });
    } catch (error: any) {
      setTreeApiState({
        data: [],
        loading: false,
        error: true,
        errorMessage: error.message,
      });
    }
  };

  useEffect(() => {
    getTrees();
  }, [phaseId]);

  return treeApiState;
};

export default useGetTree;
