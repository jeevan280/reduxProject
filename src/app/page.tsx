"use client";

import { Button, Card, Divider, Flex, Modal } from "antd";
import style from "./page.module.css";
import React, { useState } from "react";
import EmployeeListTable from "@/components/employee/EmployeeListTable";
import CreateUpdateEmployeeForm from "@/components/employee/CreateUpdateEmployeeForm";
import { ReloadOutlined, UserAddOutlined, UsergroupAddOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addMultipleEmployee, backToInitial, removeAllEmployee } from "@/store/features/employee/employeeSlice";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (isClose = false) => {
    setIsModalOpen(isClose);
  };

  return (
    <div className={style.main}>
      <Card
        className={style.card}
        title="Employee List"
        extra={
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => handleModal(true)}>
            Create New Employee
          </Button>
        }
      >
        <EmployeeListTable />
        <Modal title="Create Employee" open={isModalOpen} onCancel={() => handleModal()} footer={null} centered>
          <CreateUpdateEmployeeForm isEdit={false} onCancel={() => setIsModalOpen(false)} />
        </Modal>

        <Divider>
          <div className={style.quickActionLabel}>Quick Actions</div>
        </Divider>

        <Flex wrap={"wrap"} justify={"center"} gap={15}>
          <Button icon={<ReloadOutlined />} onClick={() => dispatch(backToInitial())}>
            Reload
          </Button>
          <Button icon={<UsergroupAddOutlined />} onClick={() => dispatch(addMultipleEmployee())}>
            Add 50 Employees
          </Button>
          <Button icon={<UsergroupDeleteOutlined />} onClick={() => dispatch(removeAllEmployee())}>
            Remove All Employees
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default EmployeeList;
