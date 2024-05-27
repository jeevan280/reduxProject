import { createSlice } from "@reduxjs/toolkit";
import { Employee, EmployeeInitialState } from "@/types/employee";

const initialState: EmployeeInitialState = {
  employees: [
    {
      key: 1,
      id: 1,
      name: "John Smith",
      email: "john@mail.com",
      isActive: true,
    },
    {
      key: 2,
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      isActive: false,
    },
    {
      key: 3,
      id: 3,
      name: "Tom Smith",
      email: "tom@mail.com",
      isActive: true,
    },
  ] as Employee[],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    createEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      state.employees = state.employees.map((employee) => (employee.id === action.payload.id ? action.payload : employee));
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((employee) => employee.id !== action.payload);
    },
    backToInitial: (state) => {
      state.employees = initialState.employees;
    },
    addMultipleEmployee: (state) => {
      for (let i = 1; i <= 50; i++) {
        const existingIDs = state.employees.map((employee) => employee.id);
        let id;
        do {
          id = Math.floor(Math.random() * 5000) + 1;
        } while (existingIDs.includes(id));
        const key = id;
        const name = `Employee ${id}`;
        const email = `employee${id}@mail.com`;
        const isActive = Math.random() < 0.5;
        state.employees.push({ key, id, name, email, isActive });
      }
    },
    removeAllEmployee: (state) => {
      state.employees = [];
    },
  },
});

export const { createEmployee, updateEmployee, deleteEmployee, backToInitial, addMultipleEmployee, removeAllEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
