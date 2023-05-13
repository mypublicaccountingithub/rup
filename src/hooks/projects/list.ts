import { authApi } from "../../api";
import { useState, useEffect } from "react";

interface Item {
  description?: string;
  id?: number;
  projectOwner?: string;
  startDate?: string;
  status?: number;
  title?: string;
}


interface RequestType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  data?: Item[];
}

const useGetProjects = (): RequestType => {
  const [requestObject, setRequestObject] = useState<RequestType>({
    data: [],
    loading: true,
    error: false,
    errorMessage: "",
  });

  const getProjects = async () => {
    try {
      const response = await authApi.get("/NewRup/Projects");
      setRequestObject({
        data: response.data.data,
        loading: false,
        error: false,
        errorMessage: "",
      });
    } catch (error:any) {
      setRequestObject({
        data: [],
        loading: false,
        error: true,
        errorMessage: error.message,
      });
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return requestObject;
};

export default useGetProjects;
