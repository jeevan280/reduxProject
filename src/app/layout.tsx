"use client";

import "./globals.css";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ConfigProvider } from "antd";
import { antDesignCustomTheme } from "../../theme";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ConfigProvider theme={antDesignCustomTheme}>
      <Provider store={store}>
        <html lang="en">
          <title>Sample Project </title>
          <body>{children}</body>
        </html>
      </Provider>
    </ConfigProvider>
  );
}
