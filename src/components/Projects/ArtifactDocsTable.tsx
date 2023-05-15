import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import type { ColumnsType } from "antd/es/table";
import { Skeleton, Table, Pagination } from "antd";

//  hooks
import { useArtifactDocsList } from "@/hooks/artifact";
//  icons
import { FiTrash2, FiDownloadCloud } from "react-icons/fi";
//  actions
import {
  changeCurrentPage,
  changePerPage,
  resetePagination,
} from "@/redux/slices/pagination";

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
    width: "30%",
  },
  {
    title: "Artifact Title",
    dataIndex: "artifactTitle",
    key: "artifactTitle",
    align: "center",
    width: "30%",
  },
  {
    title: "Project Member",
    dataIndex: "projectMemberTitle",
    key: "projectMemberTitle",
    align: "center",
    width: "15%",
  },

  {
    title: "Created Date",
    dataIndex: "createDate",
    key: "createDate",
    align: "center",
    width: "15%",
    render: (...item) => {
      if (item[0]) return item[0].split("T")[0];
      else return <Skeleton.Button active block shape="round" size="small" />;
    },
  },

  {
    title: "Download",
    dataIndex: "download",
    key: "Download",
    align: "center",
    width: "10%",
    render: (...item) => {
      if (typeof item[1].artifactTitle === "object") {
        return <Skeleton.Avatar active size="small" />;
      } else {
        return (
          <a
            // href={`https://rup.weeorder.co.uk/upload/artifactuploadfile/${item[1]?.documentSrc}`}
            target="_blank"
            className="linkWithNextjs"
            onClick={() =>
              window.open(
                `https://rup.weeorder.co.uk/upload/artifactuploadfile/${item[1]?.documentSrc}`,
                "",
                "width=800,height=700,left=200,top=200"
              )
            }
            download
          >
            <FiDownloadCloud className="text-xl hover:text-main-purple transition-all duration-300" />
          </a>

          // window.open(item[1]?.documentSrc)
        );
      }
    },
  },

  {
    title: "Delete",
    dataIndex: "delete",
    key: "discipline",
    align: "center",
    width: "10%",
    render: (...item) => {
      if (typeof item[1].artifactTitle === "object") {
        return <Skeleton.Avatar active size="small" />;
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
  const dispatch = useAppDispatch();
  const paignationData = useAppSelector((state) => state.pagination);
  const tableSkeletons = [...Array(5)].map((item, index) => {
    return {
      key: index,
      iterationTitle: (
        <Skeleton.Button active block shape="round" size="small" />
      ),
      artifactTitle: (
        <Skeleton.Button active block shape="round" size="small" />
      ),
      projectMemberTitle: (
        <Skeleton.Button active block shape="round" size="small" />
      ),
    };
  });

  //  states
  const [data, setData] = useState<[] | null>([]);

  //    hooks
  const artifactsList = useArtifactDocsList();

  //    side effects
  useEffect(() => {
    // return () => dispatch(resetePagination(null));

    if (artifactsList) {
      if (artifactsList.data.data.length) {
        setData(artifactsList?.data?.data);
      } else {
        setData(null);
      }
    }

    console.log("hiiii : ", artifactsList);
  }, [artifactsList]);

  useEffect(() => {
    return () => dispatch(resetePagination(null));
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data ? (data.length ? data : tableSkeletons) : []}
        pagination={false}
        size="large"
        className="projects-table mt-10"
      />

      {data && data.length > 0 && (
        <Pagination
          responsive
          locale={{ items_per_page: "per page" }}
          showSizeChanger
          current={paignationData.currentPage}
          pageSize={paignationData.perPage}
          total={artifactsList?.data?.count}
          pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 80, 100]}
          className="mt-10 flex justify-center p-2"
          onChange={(page) => {
            dispatch(changeCurrentPage(page));
            setData([]);
          }}
          onShowSizeChange={(current, size) => {
            console.log("size :", size);
            dispatch(changePerPage(size));
            setData([]);
          }}
        />
      )}
    </>
  );
}

export default ArtifactDocs;
