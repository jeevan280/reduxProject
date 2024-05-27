import { configureStore } from "@reduxjs/toolkit";
import { EmployeeInitialState, employeeSlice } from "@/store/features/employee/employeeSlice";

export interface Reducers {
  employee: EmployeeInitialState;
}

const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
  },
});

export default store;
