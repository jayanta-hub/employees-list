export const CONSTANT = Object.freeze({
    DASHBOARD: "Dashboard",
    SUBMIT: "Submit",
    SUCCESS: "Success",
    ERROR: "Error",
    ADD_EMPLOYEE : "Add Employee",
    EMPLOYEE: "employee",
    ADD:"Add",
    EDIT:"Edit",
    DELETE:"Delete",
    UPDATE:"Update",
  });
  export const ROUTES = Object.freeze({ 
    DASHBOARD: "/dashboard",
    EMPLOYEE_FORM: "/employee-form",
    EMPLOYEE_LIST: "/employee-list",

  });
  export const API_ROUTES = Object.freeze({ 
    EMPLOYEES: "/employees",
    EMPLOYEES_ID: "/employees/:id",
  });

  export const METHOD=Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  }) 
  export const BASE_URL = "/api";
