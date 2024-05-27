export interface Employee {
  key: number;
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface EmployeeInitialState {
  employees: Employee[];
}
