import { useEffect,useState } from "react";
import { Modal,Divider,Skeleton } from "antd";
import { useAppDispatch } from "@/redux/hooks";

//  actions
import { useAppSelector } from "@/redux/hooks";
//  api
import { authApi } from "@/api";
//  actions
import { changeArifactId,changeShowArtifactDocsModal } from "@/redux/slices/app";
//  types & interfaces
interface PhaseTreePropsType {
  setShowInputsModal: Function;
}

function InputArtifacts(props: PhaseTreePropsType) {
  //  variables
  const { setShowInputsModal } = props;
  const dispatch = useAppDispatch();

  //  redux variables
  const activityId = useAppSelector((state) => state.app.activityId);

  //  states
  const [artifactstList,setArtifactsList] = useState<any>([]);

  //  handlers
  const handleGetArtifacts = async () => {
    try {
      const result = await authApi.get(`/NewRup/Artifacts/${activityId}`);
      if(result) {
        if(result.data.data.length > 0) setArtifactsList(result.data.data);
        else setArtifactsList(null);
      }
    } catch(error) {
      console.log("error occured in getting artifacts : ",error);
    }
  };

  //  side effects
  useEffect(() => {
    handleGetArtifacts();
  },[activityId]);

  return (
    <Modal
      open
      footer={null}
      onCancel={() => setShowInputsModal(false)}
    // closable={false}
    >
      <div className="mt-10">
        {artifactstList ? (
          artifactstList.length > 0 ? (
            artifactstList.map((item: any,index: any) => {
              return (
                <>
                  <div className="flex justify-between">
                    <span>{item.artifactsTitle}</span>
                    <span
                      onClick={() => {
                        dispatch(changeArifactId(item.artifactsId));
                        dispatch(changeShowArtifactDocsModal(true))
                      }}
                      className="bg-main-purple py-0.5  px-4 rounded text-white cursor-pointer hover:bg-light-purple2 transition-all duration-300">
                      List
                    </span>
                  </div>
                  <Divider />
                </>
              );
            })
          ) : (
            [...Array(10)].map(() => {
              return (
                <>
                  <div className="flex justify-between">
                    <Skeleton.Button active className="!w-56" />
                    <Skeleton.Button active />
                  </div>
                  <Divider />
                </>
              );
            })
          )
        ) : (
          <span>no data</span>
        )}
      </div>
    </Modal>
  );
}

export default InputArtifacts;
