import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

//  components
import ArtifactDocs from "./ArtifactDocsTable";
//  acions
import { changeShowArtifactDocsModal } from "@/redux/slices/app";

function ArtifactDocsListModal(props: any) {
  //  variables
  const { setShowArtifactModal } = props;
  const dispatch = useAppDispatch();
  const artifact = 1;
  const project = 1;

  //  redux variables
  const artifactTitle = useAppSelector((state) => state.app.artifactTitle);

  return (
    <Modal
      open
      centered
      footer={null}
      onCancel={() => dispatch(changeShowArtifactDocsModal(false))}
      width={1200}
      className="mt-5"
    >
      <div className="flex items-center">
        <h1>All ArtifactDocs List </h1>
        <span className="text-lg text-gray-500 ml-5">( {artifactTitle} )</span>
      </div>
      <ArtifactDocs artifactId={artifact} projectId={project} />
    </Modal>
  );
}

export default ArtifactDocsListModal;
