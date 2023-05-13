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

function ArtifactDocsItem(props: ArtifactDocsItemType) {
  //  variables
  const { doc } = props;

  console.log("doc : ", doc);

  //  states
  const [showSkeleton, setShowSkeleton] = useState(true);

  console.log(
    `https://rup.weeorder.co.uk/upload/artifactuploadfile/${doc.documentSrc}`
  );

  return <div className={artStyle.artifactDocItemContainer}></div>;
}

export default ArtifactDocsItem;
