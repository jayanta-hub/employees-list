import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { deleteEmployee, setEmployees } from '../store/slice/employeeSlice';
import { Box, Button } from '@mui/material';
import { API_ROUTES, BASE_URL, CONSTANT, METHOD, ROUTES } from '../utility/constant';
import EmployeeTable from './EmployeeTable';
import { EmployeeTableProps } from '../utility/types';

const EmployeeList: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const employees = useSelector<RootState>((state: RootState) => state.employees.employees);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}${API_ROUTES.EMPLOYEES}`, { method: METHOD.GET })
            .then(res => res.json())
            .then(json => dispatch(setEmployees(json.employees)));
    }, [dispatch]);

    /**
     * Deletes an employee by ID.
     *
     * @param {number} empId - The ID of the employee to delete.
     * @return {void} No return value.
     */
    const handleDelete = (empId: number): void => {
        fetch(`${BASE_URL}${API_ROUTES.EMPLOYEES}/${empId}`, { method: METHOD.DELETE })
            .then(() => dispatch(deleteEmployee(empId)));
    };
    /**
 * Navigates to the employee form page with the selected employee's data.
 *
 * @param {object} employeeInfo - The employeeInfo object to be edited.
 * @return {void} No return value.
 */
    const handleEdit = (employeeInfo: object): void => {
        navigate(ROUTES.EMPLOYEE_FORM, { state: { employeeInfo } });
    };

    const employeeTableProps: EmployeeTableProps = {
        employee: employees,
        onDelete: handleDelete,
        onEdit: handleEdit,
    }
    return (
        <Box className="flex flex-row flex-wrap justify-center gap-4 p-4">
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" sx={{ m: 3 }} onClick={() => navigate(ROUTES.EMPLOYEE_FORM)}>{CONSTANT.ADD_EMPLOYEE}</Button>
            </Box>
            <Box sx={{ m: 3 }}>
                <EmployeeTable {...employeeTableProps} />
            </Box>
        </Box>
    );
};

export default EmployeeList;
