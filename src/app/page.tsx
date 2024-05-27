"use client";

import { Card, Tabs, TabsProps } from "antd";
import style from "./page.module.css";
import React from "react";
import EmployeeListTable from "@/components/employee/EmployeeListTable";

const EmployeeList = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Employee List (Store from client)",
      children: <EmployeeListTable />,
    },
    {
      key: "2",
      label: "Task List (Store from Server)",
      children: <>Task List (Store from Server) using Redux Store</>,
    },
    {
      key: "3",
      label: "Task List (Cache from Server)",
      children: <>Task List (Cache from Server) using Tanstack Query</>,
    },
  ];

  return (
    <div className={style.main}>
      <Card className={style.card} title="State and Cache Management">
        <Tabs defaultActiveKey="1" items={items} style={{ marginTop: -20 }} />
      </Card>
    </div>
  );
};

export default EmployeeList;
