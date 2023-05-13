import { useState,useEffect,ReactNode } from "react";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";

import { Skeleton,Table } from "antd";

//  hooks
import { useArtifactDocsList } from "@/hooks/artifact";
//  icons
import { FiTrash2,FiDownloadCloud } from "react-icons/fi";
//  components
import ArtifactDocsItem from "./ArtifactDocsItem";
import ArtifactDocsSkeleton from "./ArtifactDocSkeleton";
//  types & interfaces
interface ArtifactDocsType {
  iterationId: number;
  artifactId: number;
  projectMemberId: number;
  documentSrc: string;
  createDate: string;
  artifactNote: string;
}

interface ArtifactDocsPropsType {
  projectId: number | string;
  artifactId: number | string;
}

interface DataTypes {
  key: number;
  iterationTitle: string;
  artifactTitle: string;
  projectMemberTitle: string;
  download: ReactNode;
  delete: ReactNode;
}


const columns: ColumnsType<DataTypes> = [
  {
    title: "Iteration Title",
    dataIndex: "iterationTitle",
    key: "iterationTitle",
    align: "center",
  },
  {
    title: "Artifact Title",
    dataIndex: "artifactTitle",
    key: "artifactTitle",
    align: "center",
  },
  {
    title: "Project Member",
    dataIndex: "projectMemberTitle",
    key: "projectMemberTitle",
    align: "center",
  },

  {
    title: "Created Date",
    dataIndex: "createDate",
    key: "createDate",
    align: "center",
    render: (...item) => {
      if(item[0])
        return item[0].split("T")[0];
      else return <Skeleton.Button active block shape="round" size="small" />
    },
  },

  {
    title: "Download",
    dataIndex: "download",
    key: "Download",
    align: "center",
    render: (...item) => {
      console.log("itemmm : ",typeof item)

      if(typeof item[1].artifactTitle === "object") {
        return <Skeleton.Avatar active size="small" />
      } else {
        return (
          <FiDownloadCloud className="text-xl hover:text-main-purple transition-all duration-300" />
        );
      }
    },
  },

  {
    title: "Delete",
    dataIndex: "delete",
    key: "discipline",
    align: "center",
    render: (...item) => {
      if(typeof item[1].artifactTitle === "object") {
        return <Skeleton.Avatar active size="small" />
      } else {
        return (
          <FiTrash2 className="text-xl hover:text-main-purple transition-all duration-300" />
        );
      }


    },
  },
];

function ArtifactDocs() {
  //  variables
  const router = useRouter();
  const tableSkeletons = [...Array(5)].map((item,index) => {
    return {
      key: index,
      iterationTitle: <Skeleton.Button active block shape="round" size="small" />,
      artifactTitle: <Skeleton.Button active block shape="round" size="small" />,
      projectMemberTitle: <Skeleton.Button active block shape="round" size="small" />,
    }
  })


  //    hooks
  const artifactsList = useArtifactDocsList();


  ////    side effects
  //useEffect(() => {
  //  console.log("artifactsList : ",artifactsList);
  //  //if(artifactsList?.data.data?.length) setData(result.data.data);
  //  //else {
  //  //  setData(null);
  //  //}
  //},[artifactsList]);

  return (
    <Table
      columns={columns}
      dataSource={
        artifactsList
          ? artifactsList?.data?.data
          : tableSkeletons

      }
      pagination={false}
      size="large"
      className="projects-table mt-10"
    />

    //<Table
    //  columns={columns}
    //  dataSource={artifactsList?.data?.data}
    //  pagination={false}
    //  size="large"
    //  className="projects-table mt-10"
    ///>
  );
}

export default ArtifactDocs;

{
  /* <div>
      {data
        ? data.length > 0
          ? data.map((item, index) => (
              <>
                <ArtifactDocsItem doc={item} key={index} />
                <Divider className="mt-10" />
              </>
            ))
          : null
        : null}

      [...Array(3)].map((item, index) => (
              <>
                <ArtifactDocsSkeleton doc={item} key={index} />
                <Divider className="mt-10" />
              </>
            ))
    </div> */
}
