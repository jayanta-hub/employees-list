import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { deleteEmployee, setEmployees } from '../store/slice/employeeSlice';
import { Box, Button } from '@mui/material';
import { ROUTES } from '../utility/constant';
import EmployeeTable from './EmployeeTable';

const EmployeeList: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const employees = useSelector((state: RootState) => state.employees.employees);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/employees')
            .then(res => res.json())
            .then(json => dispatch(setEmployees(json.employees)));
    }, [dispatch]);

    const handleDelete = (id: number) => {
        fetch(`/api/employees/${id}`, { method: 'DELETE' })
            .then(() => dispatch(deleteEmployee(id)));
    };

    const handleEdit = (employee: object) => {
        navigate(ROUTES.EMPLOYEE_FORM, { state: { employee } });
    };

    return (
        <Box className="flex flex-row flex-wrap justify-center gap-4 p-4">
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" sx={{ m: 3 }} onClick={() => navigate(ROUTES.EMPLOYEE_FORM)}>Add Employee</Button>
            </Box>
            <Box sx={{ m: 3 }}>
                <EmployeeTable employee={employees} onDelete={handleDelete} onEdit={handleEdit} />
            </Box>
        </Box>
    );
};

export default EmployeeList;
