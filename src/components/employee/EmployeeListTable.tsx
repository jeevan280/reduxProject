import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {Button, Divider, Flex, Input, message, Modal, Popconfirm, Table, Tag, Tooltip} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "@/store/store";
import {
  addMultipleEmployee,
  backToInitial,
  deleteEmployee,
  Employee,
  removeAllEmployee
} from "@/store/features/employee/employeeSlice";
import CreateUpdateEmployeeForm from "@/components/employee/CreateUpdateEmployeeForm";
import { ColumnType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined
} from "@ant-design/icons";
import style from "@/app/page.module.css";

const EmployeeListTable: FC = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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
    setIsUpdateModalOpen(true);
  };

  const openCreateModal = (isOpen = false) => {
    setIsCreateModalOpen(isOpen);
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
      <Flex gap={20}>
        <Input placeholder={"Search for Name or Email..."} allowClear onChange={(event: ChangeEvent<HTMLInputElement>) => setSearched(event.target.value)} style={{ marginBottom: 10}}/>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => openCreateModal(true)}>
          Create New Employee
        </Button>
      </Flex>

     <Table
        dataSource={employees}
        columns={columns}
        pagination={{ total: getEmployees.length, showTotal: (total) => `Total ${total} Employees`, showSizeChanger: true }}
        bordered
        className={style.tableHeight}
      />

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

      <Modal title="Create Employee" open={isCreateModalOpen} onCancel={() => openCreateModal()} footer={null} centered>
        <CreateUpdateEmployeeForm isEdit={false} onCancel={() => openCreateModal()} />
      </Modal>

      {selectedEmployee && (
        <Modal title="Update Employee" open={isUpdateModalOpen} onCancel={() => setIsUpdateModalOpen(false)} footer={null} centered>
          <CreateUpdateEmployeeForm isEdit employeeData={selectedEmployee} onCancel={() => setIsUpdateModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default EmployeeListTable;
