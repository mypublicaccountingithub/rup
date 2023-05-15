import React, { ReactNode, useEffect, useState } from "react";
import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetProjects } from "@/hooks/projects";

//  icons
import { FiChevronRight } from "react-icons/fi";
//  components
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { authApi } from "@/api";

//  types & interface
interface ProjectDataType {
  key: number;
  name: string;
  owner: string;
  status: ReactNode;
  show: ReactNode;
}

interface Item {
  description?: string;
  id?: number;
  projectOwner?: string;
  startDate?: string;
  status?: number;
  title?: string;
}

class SkeletonTypeClass {
  key: number;
  name: JSX.Element;
  owner: JSX.Element;
  status: JSX.Element;
  show: JSX.Element;

  constructor(
    key: number,
    name: JSX.Element,
    owner: JSX.Element,
    status: JSX.Element,
    show: JSX.Element
  ) {
    this.key = key;
    this.name = name;
    this.owner = owner;
    this.status = status;
    this.show = show;
  }
}

// var SkeletonTypeClass2 : SkeletonTypeClass = new SkeletonTypeClass();

const columns: ColumnsType<ProjectDataType> = [
  {
    title: "Project name",
    dataIndex: "name",
    key: "name",
    responsive: ["lg", "md", "sm", "xs", "xxl"],
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    responsive: ["lg", "md", "sm", "xs", "xxl"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    responsive: ["lg", "md", "sm", "xs", "xxl"],
  },
  {
    title: "Show",
    dataIndex: "show",
    key: "show",
    width: 75,
    align: "center",
    responsive: ["lg", "md"],
  },
];

const arrowIcon = <FiChevronRight style={{ fontSize: 21 }} />;

function Projects() {
  //  variables
  const router = useRouter();

  const tableSkeletons = [...Array(5)].map((item, index) => {
    var obj = new SkeletonTypeClass(
      index,
      <Skeleton.Button active block shape="round" size="small" />,
      <Skeleton.Button active shape="round" size="small" />,
      <Skeleton.Button active shape="round" size="small" />,
      <Skeleton.Avatar active size="small" />
    );
    return obj;
  });

  //  states
  const [data, setData] = React.useState<
    ProjectDataType[] | SkeletonTypeClass[]
  >(tableSkeletons);
  const [isSmall, setIsSmall] = useState<boolean>(false);

  //  handlers
  const handleShow = (record: ProjectDataType) => {
    if (data.length) {
      var typeStatus = data[0] instanceof SkeletonTypeClass;

      if (!typeStatus) {
        router.push(`/projects/${record.key}`);
      }
    }
  };

  //  hooks
  const requestObject = useGetProjects();

  //  side effects
  useEffect(() => {
    if (requestObject.data?.length) {
      const modifiedData = requestObject.data.map((item: Item) => {
        return {
          key: item.id,
          name: item.title,
          owner: item.projectOwner,
          status: item.status ? (
            <div className="badge green-badge">Active</div>
          ) : (
            <div className="badge red-badge">Inactive</div>
          ),
          show: arrowIcon,
        };
      }) as ProjectDataType[];

      setData(modifiedData);
    }
  }, [requestObject]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 576) {
        setIsSmall(true);
      }
    } else {
      console.log("noooo");
    }
  }, []);

  useEffect(() => {
    console.log("data : ", data);
  }, [data]);

  return (
    <Layout tabTitle="Projects" hasPadding={isSmall}>
      {/* @ts-ignore */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
        className="projects-table"
        //onRow with typescript
        onRow={(record: ProjectDataType) => {
          return {
            onClick: () => handleShow(record),
          };
        }}
      />
    </Layout>
  );
}

export default Projects;
