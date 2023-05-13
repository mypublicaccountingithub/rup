import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Button, Form, Input, Select } from "antd";
import React from "react";
import type { SelectProps } from "antd";
import { FiArrowLeft } from "react-icons/fi";

const { TextArea } = Input;

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const ArtifactsForm: React.FC = () => {
  //  variables
  const [form] = Form.useForm();
  const router = useRouter();

  //  handlers
  const handleOnFinish = () => {
    form.resetFields();
  };


  return (
    <>
      <Layout tabTitle={`${router.query.name ?? ""}`} hasPadding={true}>
        <div className="pageHeader">
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => router.push("/projects")}
            type="default"
            icon={<FiArrowLeft fontSize={22} />}
          />
          <h1>Artifacts Form</h1>

        </div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleOnFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <Input 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="title"
            name="title2"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Steps"
            name="steps"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <Select
              mode="multiple"
              size="large"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              //   defaultValue={["a10", "c12"]}
              //   onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="max-sm:w-full"
            >
              Submit
            </Button>
            
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};

export default ArtifactsForm;
