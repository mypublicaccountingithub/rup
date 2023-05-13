import { useRouter } from "next/router";


import { Button, Upload, Typography } from "antd";

//  layout
import Layout from "@/components/Layout";
//  components
import Comment from "@/components/Projects/Comment";
import CancelButton from "@/components/Projects/CancelButton";
import TextEditor from "@/components/Projects/TextEditor";

//  icons
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";


function ArtifactEdit(): JSX.Element {
  //  variables
  const router = useRouter();

  return (
    <Layout tabTitle="Edit Artifact" hasPadding={true}>
      <div className="pageHeader">
            <Button
              className="backButton"
              onClick={() => router.push("/projects")}
              size="large"
              icon={<FiArrowLeft fontSize={30} />}
            />

          <h1>
            Edit Artifact
          </h1> 
        </div>

      {/* @ts-ignore */}
      <TextEditor />

      <Upload
        name="avatar"
        listType="picture-card"
        className="form-upload-input max-sm:w-full"
        multiple={true}
        // beforeUpload={}
        // onChange={handleChange}
      >
        Upload File
      </Upload>

      <Button 
        size="large" 
        type="primary"
        className="w-full" 
      >
        SUBMIT
      </Button>

      {/* <CancelButton href="/projects/test" /> */}

      <div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </Layout>
  );
}

export default ArtifactEdit;



