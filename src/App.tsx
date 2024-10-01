import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ROUTES } from "./utility/constant";

const Loading = lazy(() => import("./components/Loading"));
const EmployeeList = lazy(() => import("./components/EmployeeList"));
const EmployeeForm = lazy(() => import("./components/EmployeeForm"));

const App = () => {
  return (
    <Box className="App">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="*" element={<Navigate to={ROUTES.EMPLOYEE_LIST} replace />} />
            <Route path={ROUTES.EMPLOYEE_LIST} element={<EmployeeList />} />
            <Route path={ROUTES.EMPLOYEE_FORM} element={<EmployeeForm />} />
          </Routes>
        </Suspense>
      </Router>
    </Box>
  );
};

export default App;