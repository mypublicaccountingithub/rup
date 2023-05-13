import React from "react";
import { useRouter } from "next/router";

import { Button, Form, Input, Select } from "antd";

const { TextArea } = Input;

import Layout from "@/components/Layout";
//  icons
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

//   back button for all add forms

const Activities: React.FC = () => {
  //  variables
  const [form] = Form.useForm();
  const router = useRouter();

  //  handlers
  const onFinish = (values: any) => {
    form.resetFields();
  };

  return (
    <>
      <Layout tabTitle={`${router.query.name ?? ""}`} hasPadding={true}>
        <div className="pageHeader">
          <Button
            className="backButton"
            onClick={() => router.push("/projects/activities/list")}
            // type="primary"
            size="large"
            icon={<FiArrowLeft fontSize={30} />}
          />

          <h1>Add Activities</h1>
        </div>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please enter role",
              },
            ]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="asas">asas</Select.Option>
              <Select.Option value="qqwqw">qqwqw</Select.Option>
              <Select.Option value="bvv">bvv</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Discipline"
            name="discipline"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="asas">asas</Select.Option>
              <Select.Option value="qqwqw">qqwqw</Select.Option>
              <Select.Option value="bvv">bvv</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Result Artifacts"
            name="resultArtifacts"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="asas">asas</Select.Option>
              <Select.Option value="qqwqw">qqwqw</Select.Option>
              <Select.Option value="bvv">bvv</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Discipline"
            name="disciplineTextarea"
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

            <Button 
              className="w-full"
              size="large"
              type="primary" 
              htmlType="submit"
            >
              Submit
            </Button>
        </Form>
      </Layout>
    </>
  );
};

export default Activities;
