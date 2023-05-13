import { ReactNode } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusSquareOutlined } from "@ant-design/icons";

//  icons
//  components
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

//  types & interface
interface DataTypes {
  key: number;
  title: string;
  role: string;
  discipline: ReactNode;
}

const columns: ColumnsType<DataTypes> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "20%",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: "20%",
  },
  {
    title: "Discipline",
    dataIndex: "discipline",
    key: "discipline",
    width: "50%",
  },
];

const data: DataTypes[] = [
  {
    key: 1,
    title: "Project 1",
    role: "owner",
    discipline:
      "arrowIcon arrowIrowIcon  ",
  },
  {
    key: 1,
    title: "Project 1",
    role: "owner",
    discipline:
      "arrowIcon arrowIrowIcon  ",
  },
  {
    key: 1,
    title: "Project 1",
    role: "owner",
    discipline:
      "arrowIcon arrowIrowIcon  ",
  },
  {
    key: 1,
    title: "Project 1",
    role: "owner",
    discipline:
      "arrowIcon arrowIrowIcon  ",
  },
];

function ActivitiesList() {
  //  variables
  const router = useRouter();

  return (
    <Layout tabTitle="Activities List" hasPadding={true}>
      <div className="activitiesList">
        <h1>Activities List</h1>
        <Button
          onClick={() => router.push("/projects/activities/add")}
          type="ghost"
          icon={<PlusSquareOutlined />}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Add Activity
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
        className="projects-table"
      />
    </Layout>
  );
}

export default ActivitiesList;
