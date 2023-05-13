import React,{ useEffect,useState } from "react";
import { useRouter } from "next/router";
import { Divider,Select,Skeleton } from "antd";

//  styles

import projectStyle from "../../../styles/components/projects/project.module.scss";
//  layouts
import Layout from "@/components/Layout";
//  components
import Phase from "@/components/Projects/Phase";
import PhaseTree from "@/components/Projects/Tree";
import InputArtifacts from "@/components/Projects/InputArtifacts";
import ArtifactDocsListModal from "@/components/Projects/ArtifactDocsListModal";
//  hooks
import useGetRoles from "@/hooks/getRoles";
import { useGetIterations } from "@/hooks/iterations";
import TreeDescriptionModal from "@/components/Projects/TreeDescriptionModal";
import { useAppSelector } from "@/redux/hooks";

//  types & interfaces
interface IterationsDataType {
  iterationsTitle?: string;
  phasesId?: number;
  phasesTitle?: string;
  iterationsStartDate?: string;
  iterationsActualEndDate?: string;
  projectTitle?: string;
}

interface RolesDataType {
  id: number;
  projectId: number;
  memberId: number;
  joinDate: string;
  status: number;
  title: string;
  roleId: number;
}

function ProjectDetail() {
  //  variables
  const router = useRouter();

  // states
  const [phasesData,setPhasesData] = useState<IterationsDataType[]>([]);
  const [showInputsModal,setShowInputsModal] = useState(false);
  const [showArtifactModal,setShowArtifactModal] = useState(false);
  const [showDescriptionModal,setShowDescriptionModal] = useState(false);


  const showArtifactDocsModal = useAppSelector((state) => state.app.showArtifactDocsModal)

  // hooks
  const iterationsApiState = useGetIterations(router.query.id);
  // const rolesApiState = useGetRoles(router.query.id);

  //  side effects
  useEffect(() => {
    if(iterationsApiState.data) {
      setPhasesData(iterationsApiState.data);
    }
  },[iterationsApiState]);

  // useEffect(() => {
  //   if (rolesApiState?.data?.length) {
  //     router.push({
  //       pathname: `/projects/${router.query.id}`,
  //       query: {
  //         role: rolesApiState?.data[0].roleId,
  //         ...(router.query.phase && { phase: router.query.phase }),
  //       },
  //     });
  //   }

  //   var dataTimeout = setTimeout(() => {
  //     if (rolesApiState?.data?.length) {
  //       setRolesData(rolesApiState?.data);
  //     }
  //   }, 1500);

  //   return () => clearTimeout(dataTimeout);
  // }, [rolesApiState]);

  return (
    <Layout tabTitle={`${phasesData[0]?.projectTitle ?? ""}`} hasPadding={true}>
      <div className="flex justify-between items-center">
        {phasesData[0] ? (
          <p className={projectStyle.projectTitle}>
            {phasesData[0]?.projectTitle}
          </p>
        ) : (
          <Skeleton.Button
            active={true}
            shape="default"
            className="!w-32 !h-8 text-center "
          />
        )}

        {/* {rolesData.length ? (
          <Select
            placeholder="Select role"
            className="text-center w-36"
            defaultValue={Number(router.query.role)}
            onChange={(e) => {
              router.push({
                pathname: `/projects/${router.query.id}`,
                query: {
                  role: e,
                  ...(router.query.phase && { phase: router.query.phase }),
                },
              });
            }}
          >
            {rolesData.length > 0 &&
              rolesData.map((item, index) => (
                <Select.Option value={item.roleId} key={index}>
                  {item.title}
                </Select.Option>
              ))}
          </Select>
        ) : (
          <Skeleton.Button
            active={true}
            shape="default"
            className="!w-56 !h-8 text-center"
          />
        )} */}
      </div>

      <Divider className="border-gray-300" />

      <div className={projectStyle.phasesContainer}>
        {phasesData.length > 0
          ? phasesData.map((item,index) => <Phase data={item} key={index} />)
          : [...Array(4)].map((_,index) => (
            <div className="px-4 w-full" key={index}>
              <Skeleton.Button
                active={true}
                size="large"
                shape="default"
                block={true}
                className="!h-24"
              />
            </div>
          ))}
      </div>

      {router.query.phase && (
        <PhaseTree
          setShowInputsModal={setShowInputsModal}
          setShowDescriptionModal={setShowDescriptionModal}
          setShowArtifactModal={setShowArtifactModal}
          phase={phasesData.find((i: any) => i.phasesId == router.query.phase)}
        />
      )}

      {showInputsModal && (
        <InputArtifacts setShowInputsModal={setShowInputsModal} />
      )}

      {showArtifactDocsModal && (
        <ArtifactDocsListModal setShowArtifactModal={setShowArtifactModal} />
      )}

      {showDescriptionModal && (
        <TreeDescriptionModal
          setShowDescriptionModal={setShowDescriptionModal}
        />
      )}
    </Layout>
  );
}

export default ProjectDetail;
