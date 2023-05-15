import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tree, Slider, Skeleton } from "antd";
import { useAppDispatch } from "@/redux/hooks";

//  icons
import {
  FiUser,
  FiPlay,
  FiRefreshCcw,
  FiHash,
  FiSquare,
  FiPaperclip,
} from "react-icons/fi";
import { TbFileDescription } from "react-icons/tb";
//  actions
import {
  changeActivityId,
  changeShowArtifactDocsModal,
  changeArifactId,
  changeArtifactTitle,
} from "@/redux/slices/app";

//  hooks
import useGetTree from "@/hooks/getTree";
import { changeActivityTitle } from "@/redux/slices/app";
//  types & interfaces
interface TreeItem {
  activityId: number;
  activityTitle: string;
  artifactsId: number;
  artifactsTitle: string;
  disciplineId: number;
  disciplineTitle: string;
  artifactTypeId: string;
}

interface Item {
  activityId: number;
  activityTitle: string;
  artifactsId: number;
  artifactsTitle: string;
  disciplineId: number;
  disciplineTitle: string;
  artifactTypeId: string;
}

interface RequestType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  data?: Item[];
}

interface PhaseTreePropsType {
  setShowInputsModal: Function;
  setShowArtifactModal: Function;
  setShowDescriptionModal: Function;
  phase: any;
}

// types & interfaces
function PhaseTree(props: PhaseTreePropsType) {
  //  variables
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    setShowDescriptionModal,
    setShowInputsModal,
    setShowArtifactModal,
    phase,
  } = props;

  //  states
  const [treeData, setTreeData] = useState([]);

  //  hooks
  const treeApiState: RequestType = useGetTree(
    router.query.id,
    router.query.phase
  );

  const treeApiStateData: any = treeApiState.data;

  //  side effects
  useEffect(() => {
    if (!treeApiState.loading && !treeApiState.error) {
      const treeData: any = {};

      treeApiStateData.forEach((item: TreeItem) => {
        const {
          disciplineId,
          disciplineTitle,
          activityId,
          activityTitle,
          artifactsId,
          artifactsTitle,
        } = item;

        // Add the discipline to the tree
        {
          /* @ts-ignore */
        }
        if (!treeData[disciplineId]) {
          {
            /* @ts-ignore */
          }
          treeData[disciplineId] = {
            key: `disciplineId_${disciplineId}`,
            title: <span style={{ color: "#3300ff" }}>{disciplineTitle}</span>,
            children: {},
          };
        }

        // Add the activity to the discipline
        {
          /* @ts-ignore */
        }
        if (!treeData[disciplineId].children[activityId]) {
          {
            /* @ts-ignore */
          }
          treeData[disciplineId].children[activityId] = {
            key: `disciplineId_${disciplineId} activityId_${activityId}`,
            title: (
              <div>
                <span style={{ color: "#00581f" }}>{activityTitle}</span>
                <span
                  className="bg-[#00581f] ml-2 p-1 text-white text-[12px] cursor-pointer rounded font-normal hover:bg-[#009735] transition-all duration-500"
                  onClick={() => {
                    dispatch(changeActivityId(activityId));
                    dispatch(changeActivityTitle(activityTitle));
                    setShowInputsModal(true);
                  }}
                >
                  Inputs
                </span>
              </div>
            ),
            children: {},
          };
        }

        // Add the artifact to the activity
        {
          /* @ts-ignore */
        }
        if (
          !treeData[disciplineId].children[activityId].children[artifactsId]
        ) {
          {
            /* @ts-ignore */
          }
          treeData[disciplineId].children[activityId].children[artifactsId] = {
            key: `disciplineId_${disciplineId} activityId_${activityId} artifactsId_${artifactsId}`,
            title: (
              <div className="flex items-center">
                <span style={{ color: "#a76503" }}>{artifactsTitle}</span>
                <Link
                  href={{
                    pathname: `/projects/${router.query.id}/attachArtifact/${artifactsId}/${phase?.iterationsId}`,
                    query: {
                      phase: router.query.phase,
                      title: artifactsTitle,
                    },
                  }}
                  className="linkWithNextjs"
                >
                  <div className="artifactOptions">
                    <FiPaperclip />{" "}
                  </div>
                </Link>
                {/* <div className="artifactOptions">R</div> */}
                <div
                  className="artifactOptions cursor-pointer"
                  onClick={() => {
                    dispatch(changeArifactId(artifactsId));
                    dispatch(changeArtifactTitle(artifactsTitle));
                    dispatch(changeShowArtifactDocsModal(true));
                  }}
                >
                  L
                </div>
              </div>
            ),
          };
        }
      });

      // Convert the object to an array
      const result = Object.values(treeData).map((discipline: any) => {
        {
          /* @ts-ignore */
        }
        discipline.children = Object.values(discipline.children).map(
          (activity: any) => {
            {
              /* @ts-ignore */
            }
            activity.children = Object.values(activity.children);
            return activity;
          }
        );
        return discipline;
      });

      // sort data
      {
        /* @ts-ignore */
      }

      const startDate = phase?.iterationsStartDate
        ?.split("T")[0]
        .split("-")
        .join("/");
      const endDate = phase?.iterationsActualEndDate
        ?.split("T")[0]
        .split("-")
        .join("/");

      // console.log("phase : ", phase);

      const finalData: any = [
        {
          title: (
            <div
              className="flex w-full align-center items-center "
              style={{
                position: "relative",
                top: "-2px",
              }}
            >
              {/* <span>
                  paren1 */}
              {/* </span> */}

              <div className="flex align-center items-center">
                <FiRefreshCcw
                  className="mt-0.5 text-xl"
                  style={{ color: "rgb(3, 175, 8)" }}
                />
                <span className="font-bold text-black">
                  <FiHash
                    className="ml-2"
                    style={{
                      position: "relative",
                    }}
                  />
                  <span className="text-3xl ">{phase?.iterationsTitle}</span>
                </span>
              </div>

              <div className="ml-5 flex">
                <FiPlay className={"startIcon"} />
                <span className="ml-1">{startDate}</span>
              </div>

              <div className="dates-between-border"></div>

              <div className="flex">
                <FiSquare className={"stopIcon"} />
                <span className="ml-1">{endDate}</span>
              </div>

              <div className="ml-5 border-[#494949] flex ">
                <FiUser className="text-[20px]" />
                <span className="text-[18px] color-[#494949]">Owner Name</span>
              </div>

              <div
                className="ml-5 border-[#494949] flex cursor-pointer"
                onClick={() => setShowDescriptionModal(true)}
              >
                <TbFileDescription className="descIcon" />
                <span className="text-[18px] color-[#494949] underline">
                  Description
                </span>
              </div>

              {/* <div className="ml-5 flex">
              <span className="text-[#00841D]">Status</span>
            </div> */}

              <div>
                {/* <Progress
                    percent={30}
                    showInfo={false}
                    status="success"
                    strokeColor="#00841D"
                    trailColor="#B8B8B8"
                    className="ml-5 w-[150px] "
                  /> */}

                {/* <Slider className="project-iteration-progress-editable" /> */}
              </div>
            </div>
          ),
          key: "treeData",
          children: result,
        },
      ];

      {
        /* @ts-ignore */
      }

      setTreeData(finalData);
    }
    // return result;
  }, [treeApiState]);

  useEffect(() => {
    setTreeData([]);
  }, [router.query.phase, router.query.role]);

  return (
    <>
      {treeData.length ? (
        <Tree
          showLine
          showIcon
          defaultExpandedKeys={["0-0-0"]}
          treeData={treeData}
          style={{ marginTop: 30 }}
        />
      ) : (
        <Skeleton.Button
          active={true}
          shape="default"
          block={true}
          className="!h-10"
        />
      )}
    </>
  );
}

export default PhaseTree;
