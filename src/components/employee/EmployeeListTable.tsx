import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Flex, Input, message, Modal, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "@/store/store";
import { deleteEmployee, Employee } from "@/store/features/employee/employeeSlice";
import CreateUpdateEmployeeForm from "@/components/employee/CreateUpdateEmployeeForm";
import { ColumnType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import style from "@/app/page.module.css";

const EmployeeListTable: FC = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [searched, setSearched] = useState('');
  const getEmployees = useSelector((state: Reducers) => state.employee.employees);
  const [employees, setEmployees] = useState<Employee[]>();

  const showSuccessMsg = () => {
    messageApi.open({
      type: "success",
      content: `Employee Successfully Deleted!`,
    });
  };

  const confirmDeleteEmployee = (employeeId: number) => {
    dispatch(deleteEmployee(employeeId!));
    showSuccessMsg();
  };

  const openUpdateModal = (id: number) => {
    const employee = getEmployees.find((emp) => emp.id === id);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const columns: ColumnType<Employee>[] = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (_, record: Employee) => {
        const color = record?.isActive ? "green" : "red";
        const label = record?.isActive ? "ACTIVE" : "DEACTIVATED";
        return (
          <Tag color={color} key={record.id}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record: Employee) => {
        return (
          <Flex gap={20} justify={"center"}>
            {record?.isActive && (
              <Tooltip title={"Update Employee"}>
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => openUpdateModal(record?.id)} />
              </Tooltip>
            )}

            <Popconfirm
              title="Delete the Employee"
              description="Are you sure to delete this Employee?"
              onConfirm={() => confirmDeleteEmployee(record?.id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                danger: true,
              }}
              icon={<DeleteOutlined style={{ color: "red" }} rev={undefined} />}
            >
              <Tooltip title={"Delete Employee"}>
                <Button shape="circle" danger>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    setEmployees(getEmployees)
  },[getEmployees])

  useEffect(() => {
    const searchedItems = searched !== '' ? getEmployees.filter(item =>
      item.name?.toLowerCase().includes(searched.toLowerCase()) || item.email?.toLowerCase().includes(searched.toLowerCase())
    ) : getEmployees
    setEmployees(searchedItems)
  }, [searched])

  return (
    <div>
      {contextHolder}
      <Input placeholder={"Search for Name or Email..."} allowClear onChange={(event: ChangeEvent<HTMLInputElement>) => setSearched(event.target.value)} style={{ marginBottom: 10}}/>
      <Table
        dataSource={employees}
        columns={columns}
        pagination={{ total: getEmployees.length, showTotal: (total) => `Total ${total} Employees`, showSizeChanger: true }}
        bordered
        className={style.tableHeight}
      />
      {selectedEmployee && (
        <Modal title="Update Employee" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} centered>
          <CreateUpdateEmployeeForm isEdit employeeData={selectedEmployee} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default EmployeeListTable;
