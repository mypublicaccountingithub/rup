import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "antd";
import parse from "html-react-parser";

//  style
import artStyle from "../../styles/components/projects/artifact.module.scss";
//  icons
import { FiTrash2 } from "react-icons/fi";
//  types & interfaces
interface ArtifactDocsType {
  iterationId: number;
  artifactId: number;
  projectMemberId: number;
  documentSrc: string;
  createDate: string;
  artifactNote: string;
}
interface ArtifactDocsItemType {
  doc: ArtifactDocsType;
}

function ArtifactDocsSkeleton(props: ArtifactDocsItemType) {
  //  variables
  const { doc } = props;

  //  states
  const [showSkeleton, setShowSkeleton] = useState(true);

  return (
    <div className={artStyle.artifactDocItemContainer}>
      <div className={artStyle.artifactDocItemImage}>
        <Skeleton.Image active className="!h-full !w-full" />
      </div>
      <div className={artStyle.artifactDocItemBody}>
        <Skeleton active />
      </div>
    </div>
  );
}

export default ArtifactDocsSkeleton;
