import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

//  api
import { useAxiosInterseptors } from "../api";

//  styles
import "@/styles/globals.scss";
//  variables
const antdTheme = {
  token: {
    colorPrimary: "#785FDC",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const notificationHolder = useAxiosInterseptors();

  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        {notificationHolder}
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}
