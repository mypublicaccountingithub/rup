import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Form, Input, Button, message } from "antd";
import Cookies from "universal-cookie";

//  styles
import loginStyle from "../styles/pages/login.module.scss";
// icon
import { FiLogIn, FiUser, FiLock } from "react-icons/fi";
//  hooks
import useLogin from "../hooks/login";
import useUser from "../hooks/user";

//  types & inerfaces
type loginDataType = {
  userName: string;
  userPass: string;
};

function Login() {
  //  variables
  const router = useRouter();
  const cookie = new Cookies();

  //  hooks
  const login = useLogin();
  const user = useUser();

  //  states
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  //  handlers
  const handleLogin = async (loginData: loginDataType) => {
    setIsLoading(true);

    var loginObject = {
      mobileNumber: "string",
      deviceId: 0,
      otpCode: "string",
      languageId: 0,
      domain: "string",
      version: "string",
      licence: "string",
    };

    try {
      const loginResult = await login({ ...loginObject, ...loginData });
      if (loginResult.status === 200) {
        messageApi.success("Login was successful");
        cookie.set("token", loginResult?.data?.data?.pToken);
        router.push("/projects");
      }
    } catch (error: any) {
      setIsLoading(false);

      switch (error?.response?.status) {
        case 400:
          messageApi.error(error.response.data.title);
          break;
        case 401:
          messageApi.error("your password or username is incorrect");
          break;
      }
    }
  };

  useEffect(() => {
    if (user?.data) {
      router.push("/projects");
    } else if (user.isError) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className={loginStyle.loginContainer}>
      {contextHolder}

      <Image
        fill
        src="/assets/login/bg_svg.svg"
        alt="bg"
        className={loginStyle.loginBG}
      />

      <div className={loginStyle.formContainer}>
        <FiLogIn className="text-8xl text-white " />

        <Form onFinish={handleLogin} disabled={isLoading} className="mt-8">
          <Form.Item
            name="userName"
            className="loginFormItem"
            rules={[
              {
                required: true,
                message: "username is require",
              },
            ]}
          >
            <Input
              placeholder="USERNAME"
              size="large"
              prefix={<FiUser />}
              className="loginInput"
            />
          </Form.Item>

          <Form.Item
            name="userPass"
            rules={[
              {
                required: true,
                message: "password is require",
              },
            ]}
          >
            <Input.Password
              placeholder="PASSWORD"
              size="large"
              prefix={<FiLock />}
              className="loginInput"
            />
          </Form.Item>

          <Button
            size="large"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
