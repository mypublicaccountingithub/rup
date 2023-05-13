import axios from "axios";
import Cookies from "universal-cookie";

import { notification } from "antd";

import { useRouter } from "next/router";
import { message } from "antd";

const api = axios.create({
  baseURL: "https://rup.weeorder.co.uk/",
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = axios.create({
  baseURL: "https://rup.weeorder.co.uk/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

const useAxiosInterseptors = () => {
  //  variables
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  if (authApi.interceptors.request.handlers.length > 0) {
    authApi.interceptors.request.handlers = [];
  }

  //  interspectors
  authApi.interceptors.request.use(
    function (config) {
      //  variables
      const cookie = new Cookies();
      const token = cookie.get("token");

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  authApi.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      switch (error?.response?.status) {
        case 401:
          router.push("/login");
          break;

        default:
          // api.error({
          //   message: "Something Went Wrong",
          //   description: error.response.data || "",
          // });
          break;
      }
      return Promise.reject(error);
    }
  );

  return contextHolder;
};

export { api, authApi, useAxiosInterseptors };
