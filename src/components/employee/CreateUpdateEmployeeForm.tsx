import React, { FC, useEffect } from "react";
import { Button, Flex, Form, Input, message, Radio } from "antd";
import { createEmployee, updateEmployee } from "@/store/features/employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "@/store/store";
import FormSubmitButton from "@/components/common/FormSubmitButton";
import { Employee } from "@/types/employee";

interface CreateUpdateEmployeeFormProps {
  isEdit?: boolean;
  employeeData?: Employee;
  onCancel: () => void;
}

const CreateUpdateEmployeeForm: FC<CreateUpdateEmployeeFormProps> = ({ isEdit, employeeData, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const employees = useSelector((state: Reducers) => state.employee.employees);
  const existingIds = employees.map((emp) => emp.id);

  const showSuccessMsg = () => {
    messageApi.open({
      type: "success",
      content: `Employee Successfully ${isEdit ? "Updated" : "Created"}!`,
    });
  };

  const onFinish = (values: Employee) => {
    let randomizedID: number;
    do {
      randomizedID = 1 + Math.floor(Math.random() * (existingIds.length + 1));
    } while (existingIds.includes(randomizedID));

    const payload = {
      ...values,
      id: isEdit ? values.id : randomizedID,
    };
    isEdit ? dispatch(updateEmployee(payload)) : dispatch(createEmployee(payload));
    form.resetFields();
    onCancel();
    showSuccessMsg();
  };

  useEffect(() => {
    isEdit && employeeData ? form.setFieldsValue(employeeData) : form.resetFields();
  }, [isEdit, employeeData]);

  return (
    <Form form={form} name="validateOnly" onFinish={onFinish} layout="vertical">
      {contextHolder}
      {isEdit && (
        <Form.Item label="Employee ID" name="id">
          <Input disabled />
        </Form.Item>
      )}

      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please Enter Name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please Enter Email!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Status" name="isActive" rules={[{ required: true, message: "Please Pick a Status!" }]}>
        <Radio.Group
          options={[
            { label: "ACTIVE", value: true },
            { label: "DEACTIVATED", value: false },
          ]}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Flex gap={10} justify={"flex-end"}>
          <Button htmlType="reset">Reset</Button>
          <FormSubmitButton form={form} />
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default CreateUpdateEmployeeForm;
