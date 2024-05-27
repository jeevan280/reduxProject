import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "@/store/features/employee/employeeSlice";
import { EmployeeInitialState } from "@/types/employee";

export interface Reducers {
  employee: EmployeeInitialState;
}

const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
  },
});

export default store;
