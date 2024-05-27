## <u> Sample Project </u>

## Getting Started

Firstly you need to run npm install to install all the dependencies 
```bash
npm i
```

Once its completed you can run the development server:

```bash
npm run dev
```

Lastly open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Redux - State Management

Employee data management will be stored in Redux.

Below are the following items added as for Redux:-

1. Created a slice for employee
2. Added create, update and delete functions
3. Added additional 3 quick action functions

## Ant Design

Using ant design for the UI Components. Ant design also have support for Form management, theme and others.

## Quick Action Section

Added Quick Actions Section for :

1. resetting the employee data to the initial state/reloading the page
2. add addition 50 employee to the list
3. remove all the employee from the list

## Component Overview

1. CreateUpdateEmployeeForm: This component is used for updating / creating employee. This is standalone component as it can be in modal or an individual page.
2. EmployeeListTable: This component is used for render the employee table, this component also consist of pagination and modal for the update.
3. FormSubmitButton: This component is used to render the submit button along with validation for the form input, checking for null, undefined, and empty strings.

Common reasons for these Components:

1. Reduce code redundancy
2. allow re-usability/dynamic components
