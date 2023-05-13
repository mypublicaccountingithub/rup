// //  api
import { authApi } from "../../api";

interface IterationData {
  title: string;
  phaseId: number;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate: string;
  status: number;
  projectId: number;
}

const useAddIteration = () => {
  const addIteration = async (iterationData: IterationData) => {
    try {
      const result = authApi.post("/NewRup/Iterations", iterationData);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return addIteration;
};

export default useAddIteration;
