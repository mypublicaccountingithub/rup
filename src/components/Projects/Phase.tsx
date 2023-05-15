import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Progress } from "antd";

//  style
import phaseStyle from "../../styles/components/projects/phase.module.scss";
//  icons
import {
  FiRefreshCcw,
  FiHash,
  FiPlay,
  FiPlusSquare,
  FiSquare,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

interface phaseDataType {
  iterationsTitle?: string;
  phasesId?: number;
  phasesTitle?: string;
  iterationsStartDate?: string;
  iterationsActualEndDate?: string;
  projectTitle?: string;
}

//  TODO : delete additional logs

interface phasePropsType {
  data: phaseDataType;
}

function Phase(props: phasePropsType) {
  //  variables
  const { data } = props;
  const router = useRouter();

  console.log("dataaaaaaa : ", data);

  const startDate = data.iterationsStartDate
    ?.split("T")[0]
    .split("-")
    .join("/");
  const endDate = data.iterationsActualEndDate
    ?.split("T")[0]
    .split("-")
    .join("/");

  return (
    <div className={phaseStyle.phaseContainer}>
      <div className={phaseStyle.phaseHeaderTitle}>
        <span className={phaseStyle.phaseTitle}>{data.phasesTitle}</span>

        <div className={phaseStyle.phaseHeader}>
          <div className={phaseStyle.firstPart}>
            <FiRefreshCcw color="#03af08" className="w-5" />
            <FiHash color="#333" className="w-5" />
            <span className={phaseStyle.ITNumber}>{data.iterationsTitle}</span>
          </div>

          <div className={phaseStyle.phasAction}>
            <Link
              href={{
                pathname: `/projects/${router.query.id}/${data.phasesId}/iteration/add`,
                query: { phasesTitle: data.phasesTitle },
              }}
              className="linkWithNextjs w-5 flex justify-center items-center"
            >
              <FiPlusSquare className={phaseStyle.addBtn} />
            </Link>

            <Link
              href={{
                pathname: `/projects/${router.query.id}`,
                query: {
                  phase: data.phasesId,
                },
              }}
              className="linkWithNextjs w-5 flex justify-center items-center"
            >
              {router.query.phase === String(data.phasesId) ? (
                <Link
                  href={{
                    pathname: `/projects/${router.query.id}`,
                    // query: { role: router.query.role },
                  }}
                >
                  <FiEyeOff className={phaseStyle.eyeBtnOff} />
                </Link>
              ) : (
                <FiEye className={phaseStyle.eyeBtn} />
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className={phaseStyle.secondRow}>
        <div className={phaseStyle.firstPart}>
          <FiPlay className={"startIcon"} />
          <span>{startDate}</span>
        </div>
        <div className={phaseStyle.secondPart}>
          <FiSquare className={"stopIcon"} />
          <span>{endDate}</span>
        </div>
      </div>

      <div className={phaseStyle.firstRow}>
        <div className={phaseStyle.secondPart}>
          <Progress
            percent={30}
            showInfo={false}
            status="success"
            strokeColor="#21a700"
            trailColor="#B8B8B8"
            className="project-phase-progress"
          />
        </div>
      </div>
    </div>
  );
}

export default Phase;
