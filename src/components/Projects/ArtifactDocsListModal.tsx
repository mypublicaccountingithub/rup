import { Modal } from "antd";
import { useAppDispatch } from "@/redux/hooks";

//  components
import ArtifactDocs from "./ArtifactDocs";
//  acions
import { changeShowArtifactDocsModal } from "@/redux/slices/app";

function ArtifactDocsListModal(props: any) {
  //  variables
  const { setShowArtifactModal } = props;
  const dispatch = useAppDispatch();

  const artifact = 1;
  const project = 1;
  const pageNumber = 1;
  const pageSize = 111111;

  return (
    <Modal
      open
      centered
      footer={null}
      onCancel={() => dispatch(changeShowArtifactDocsModal(false))}
      width={1200}
      className="mt-5"
    >
      <h1>All ArtifactDocs List</h1>
      <ArtifactDocs artifactId={artifact} projectId={project} />
    </Modal>
  );
}

export default ArtifactDocsListModal;
