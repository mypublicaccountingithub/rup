import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Button,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  notification,
  Switch,
} from "antd";

//  layout
import Layout from "@/components/Layout";
//  components
import TextEditor from "@/components/Projects/TextEditor";
//  api
import { authApi } from "@/api";
//  hooks
import useAddIteration from "../../../../../hooks/iterations/add";
//  icons
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const AddIteration = () => {
  //  variables
  const [form] = Form.useForm();
  const router = useRouter();
  const projectId = router.query.id;
  const phaseId = router.query.phase;

  //  hooks
  const addIteraion = useAddIteration();

  //  states
  const [notif, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  //  handelrs
  const handleSubmit = async (values: any) => {
    console.log("values : ", values);
    // setIsLoading(true);
    const iterationFormData: any = {};

    iterationFormData["startDate"] = new Date(values.date[0])
      .toISOString()
      .split("T")[0];
    iterationFormData["actualEndDate"] = new Date(values.date[1])
      .toISOString()
      .split("T")[0];
    iterationFormData["estimatedEndDate"] = new Date()
      .toISOString()
      .split("T")[0];
    iterationFormData["title"] = values.title;
    iterationFormData["body"] = values.body;
    iterationFormData["status"] = values.status ? 1 : 0;
    iterationFormData["projectId"] = Number(projectId);
    iterationFormData["phaseId"] = Number(phaseId);

    try {
      await addIteraion(iterationFormData);
      form.resetFields();
      notif.success({
        message: "iteration was added successful",
        duration: 2,
      });

      setTimeout(() => {
        router.push(`/projects/${router.query.id}`);
      }, 1500);
    } catch (error: any) {
      setIsLoading(false);
      notif.error({
        message: "something went wrong",
        description: error?.response?.data,
        duration: 0,
      });
    }
  };

  return (
    <Layout tabTitle="Add Iteration" hasPadding={true}>
      {contextHolder}

      <div className="pageHeader">
        <Button
          className="backButton"
          onClick={() => {
            router.push(`/projects/${router.query.id}`);
          }}
          size="large"
          icon={<FiArrowLeft fontSize={22} />}
        />

        <h1>Add Iteration</h1>
      </div>

      <Row className="max-sm:mt-12">
        <Col lg={12} md={16} sm={24}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            disabled={isLoading}
            initialValues={{
              status: true,
            }}
          >
            <Form.Item
              name="title"
              label="title"
              rules={[
                {
                  required: true,
                  message: "title is require",
                },
              ]}
            >
              <Input
                addonBefore="#"
                placeholder="Iteration number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="date"
              label="start-date & end-date"
              rules={[
                {
                  required: true,
                  message: "date is require",
                },
              ]}
            >
              <DatePicker.RangePicker
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "5px",
                  padding: "0 11px",
                  fontSize: "16px",
                }}
              />
            </Form.Item>

            <Form.Item name="status" label="status">
              <Switch
                defaultChecked
                onChange={(e) => {
                  console.log("eee : ", e);
                }}
              />
            </Form.Item>

            <Form.Item
              name="body"
              className="pb-4"
              rules={[
                {
                  required: true,
                  message: "body is require",
                },
              ]}
            >
              {/* @ts-ignore */}
              <TextEditor isLoading={isLoading} />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
              className="submit-button mt-10 max-sm:w-full"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddIteration;
