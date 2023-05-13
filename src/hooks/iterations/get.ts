import { authApi } from "../../api";
import { useState, useEffect } from "react";

interface Item {
  iterationsTitle?: string;
  phasesId?: number;
  phasesTitle?: string;
  iterationsStartDate?: string;
  iterationsActualEndDate?: string;
  projectTitle?: string;
}

interface RequestType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  data?: Item[];
}

const useGetIterations = (projectid: any): RequestType => {
  const [iterationsApiState, setIterationsApiState] = useState<RequestType>({
    data: [],
    loading: true,
    error: false,
    errorMessage: "",
  });

  const getIterations = async () => {
    try {
      const response = await authApi.get(`/NewRup/Iterations/${projectid}`);
      setIterationsApiState({
        data: response.data.data,
        loading: false,
        error: false,
        errorMessage: "",
      });
    } catch (error: any) {
      setIterationsApiState({
        data: [],
        loading: false,
        error: true,
        errorMessage: error.message,
      });
    }
  };

  useEffect(() => {
    if(projectid){
      getIterations();
    }
  }, [projectid]);

  return iterationsApiState;
};

export default useGetIterations;
