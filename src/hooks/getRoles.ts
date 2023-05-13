import { authApi } from "../api";
import { useState, useEffect } from "react";

interface Item {
  id: number;
  projectId: number;
  memberId: number;
  joinDate: string;
  status: number;
  title: string;
  roleId: number;
}

interface RequestType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  data?: Item[];
}

const useGetRoles = (projectId: any): RequestType => {
  const [rolesApiState, setRolesApiState] = useState<RequestType>({
    data: [],
    loading: true,
    error: false,
    errorMessage: "",
  });

  const getRoles = async () => {
    try {
      const response = await authApi.get(`/NewRup/MemberRole/${projectId}`);
      setRolesApiState({
        data: response.data.data,
        loading: false,
        error: false,
        errorMessage: "",
      });
    } catch (error: any) {
      setRolesApiState({
        data: [],
        loading: false,
        error: true,
        errorMessage: error.message,
      });
    }
  };

  useEffect(() => {
    if(projectId){
      getRoles();
    }
  }, [projectId]);

  return rolesApiState;
};

export default useGetRoles;
