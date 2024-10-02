import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../store/slice/employeeSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import { ROUTES } from '../utility/constant';
import { EmployeeFormProps } from '../utility/types';
import { AppDispatch } from '../store/store';


const EmployeeForm: React.FC = (): JSX.Element => {
    let { state } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<EmployeeFormProps>(state?.employeeInfo || { name: '', email: '', role: '' });
    const dispatch = useDispatch<AppDispatch>();
    console.log('formData', formData, state)

    /**
         * Handles the submission of the employee form, either creating a new employee or updating an existing one.
         *
         * @param {React.FormEvent} e - The form event triggered by the submission.
         * @return {void}
         */
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (state?.employee) {
            fetch(`/api/employees/${state?.employee.id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
            }).then(() => { dispatch(updateEmployee(formData)); navigate(ROUTES.EMPLOYEE_LIST); });
        } else {

            if (!formData.name || !formData.email || !formData.role) {
                alert('Please fill in all the fields');
                return;
            }
            fetch('/api/employees', {
                method: 'POST',
                body: JSON.stringify(formData),
            }).then(() => { dispatch(addEmployee(formData)); navigate(ROUTES.EMPLOYEE_LIST); });
        }
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto' }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Role"
                        variant="outlined"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {state?.employee ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default EmployeeForm;
