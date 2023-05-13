import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";

import { Button,Upload,Row,Col,notification } from "antd";

//  actions
import { selectCount } from "@/redux/slices/pagination";
import { changeArifactId } from "@/redux/slices/app";

//  layout
import Layout from "@/components/Layout";
//  components
import TextEditor from "@/components/Projects/TextEditor";
import ArtifactDocs from "@/components/Projects/ArtifactDocs";
//  icons
import { FiArrowLeft } from "react-icons/fi";
//  api
import { authApi } from "@/api";
//  types & interfaces
interface artifactDataTypes {
  iterationId: number;
  artifactId: number;
  projectMemberId: number;
  documentSrc: string;
  createDate: string;
  artifactNote: string;
}

interface artifactDataTypes {
  file: string;
  artifactNote: string;
}

function ArtifactEdit(): JSX.Element {
  //  variables
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [api,contextHolder] = notification.useNotification();

  //  states
  const [newArtifactData,setNewArtifactData] = useState<any>();
  const [isLoading,setIsLoading] = useState(false);

  //  side effects
  useEffect(() => {
    if(router.query.artifact) {
      dispatch(changeArifactId(Number(router.query.artifact)))
    }
  },[router.query]);

  //  handlers
  const handleChangeArtifactNote = (e: string) => {
    var newArtifact: any = {
      ...newArtifactData,
      artifactNote: e,
    };
    setNewArtifactData(newArtifact);
  };

  const handleChangeDocumentSrc = (e: any) => {
    if(e.fileList.length > 0) {
      var file = e.fileList[0].originFileObj;

      const newArtifact: any = {
        ...newArtifactData,
        file: file,
      };
      setNewArtifactData(newArtifact);
    } else {
      if(e.fileList.length === 0) {
        const newArtifact: any = {
          ...newArtifactData,
          file: null,
        };
        setNewArtifactData(newArtifact);
      }
    }
  };

  const handleSubmitArtifact = () => {
    setIsLoading(true);
    const artifactFormData = new FormData();

    artifactFormData.append("iterationId",String(router.query.iteration));
    artifactFormData.append("artifactId",String(router.query.artifact));
    artifactFormData.append("file",newArtifactData?.file);
    artifactFormData.append("artifactNote",newArtifactData.artifactNote);

    authApi
      .post("/NewRup/ArtifactDocs",artifactFormData)
      .then((res) => {
        api.success({
          message: "artifact docs was successfully added",
        });

        setTimeout(() => {
          router.push({
            pathname: `/projects/${router.query.id}`,
            query: {
              phase: router.query.phase,
            },
          });
        },1500);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error : ",error);
      });
  };

  return (
    <Layout tabTitle="Attach Artifact" hasPadding={true}>
      {contextHolder}
      <Row>
        <Col span={12}>
          <div className="pageHeader">
            <Button
              className="backButton"
              onClick={() =>
                router.push({
                  pathname: `/projects/${router.query.id}`,
                  query: { phase: router.query.phase },
                })
              }
              size="large"
              icon={<FiArrowLeft fontSize={30} />}
            />
            <h1>Attach Artifact</h1>{" "}
            <span className="text-lg text-gray-500">
              ( {router.query.title || null} )
            </span>
          </div>

          <TextEditor
            value={newArtifactData?.artifactNote}
            onChange={handleChangeArtifactNote}
            isLoading={isLoading}
          />

          <Upload
            name="avatar"
            listType="picture-card"
            className="form-upload-input max-sm:w-full"
            onChange={handleChangeDocumentSrc}
            beforeUpload={() => {
              return false;
            }}
          >
            {!newArtifactData?.file && <span>Upload File</span>}
          </Upload>

          <Button
            size="large"
            type="primary"
            className="w-1/3 max-sm:w-full"
            loading={isLoading}
            onClick={handleSubmitArtifact}
          >
            SUBMIT
          </Button>
        </Col>

        <Col span={24} className=" h-[600px] overflow-auto mt-10">
          <h1>All ArtifactDocs List</h1>
          <ArtifactDocs />
        </Col>
      </Row>
    </Layout>
  );
}

export default ArtifactEdit;
