import { Button, Form, FormInstance } from "antd";
import { FC, useEffect, useState } from "react";

interface FormSubmitButtonProps {
  form: FormInstance;
}

const FormSubmitButton: FC<FormSubmitButtonProps> = ({ form }) => {
  const [isDisable, setIsDisable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    let hasEmptyOrNullValues = false;
    if (values) {
      for (const key in values) {
        const invalidInputs = [null, undefined, ""];
        if (invalidInputs.includes(values[key])) {
          hasEmptyOrNullValues = true;
          break;
        }
      }
      setIsDisable(hasEmptyOrNullValues);
    }
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={isDisable}>
      Submit
    </Button>
  );
};

export default FormSubmitButton;
