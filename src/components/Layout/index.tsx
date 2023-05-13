import React, { ReactNode } from "react";
import Head from "next/head";

//  style
import indexStyle from "../../styles/pages/index.module.scss";
//  components
import Sidebar from "@/components/Sidebar";
import { message } from "antd";

//  types & intefaces
interface childrenProps {
  children: ReactNode;
  tabTitle: string;
  hasPadding: boolean;
}

function Layout(props: childrenProps) {
  //  variables
  const { children, tabTitle, hasPadding } = props;

  return (
    <>
      <Head>
        <title>rup | {tabTitle ?? ""}</title>
      </Head>
      <div className={indexStyle.indexContainer}>
        <div className={indexStyle.sidebarContainer}>
          <Sidebar />
        </div>

        <div className={indexStyle.bodyContainer}>
          <div
            className={indexStyle.body}
            style={{ padding: hasPadding ? "25px" : 0 }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
