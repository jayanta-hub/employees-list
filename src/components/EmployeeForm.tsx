import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../store/slice/employeeSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { API_ROUTES, BASE_URL, CONSTANT, METHOD, ROUTES } from '../utility/constant';
import { ContextValue, EmployeeFormProps } from '../utility/types';
import { AppDispatch } from '../store/store';
import FormContext from '../utility/context/FormContext';
import CustomFormInput from '../commonComponent/CustomFormInput';
import { employeeFormData, formArray } from '../utility/jsonData';


const EmployeeForm: React.FC = (): JSX.Element => {
    let { state } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<EmployeeFormProps>(state?.employeeInfo || employeeFormData);
    const dispatch = useDispatch<AppDispatch>();

    /**
     * Handles the submission of the employee form, either creating a new employee or updating an existing one.
     *
     * @param {React.FormEvent} e - The form event triggered by the submission.
     * @return {void}
     */
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (state?.employeeInfo) {
            fetch(`${BASE_URL}${API_ROUTES.EMPLOYEES}/${state?.employeeInfo.id}`, {
                method: METHOD.PUT,
                body: JSON.stringify(formData),
            }).then(() => { dispatch(updateEmployee(formData)); navigate(ROUTES.EMPLOYEE_LIST); });
        } else {

            if (!formData.name || !formData.email || !formData.role) {
                alert('Please fill in all the fields');
                return;
            }
            fetch(`${BASE_URL}${API_ROUTES.EMPLOYEES}`, {
                method: METHOD.POST,
                body: JSON.stringify(formData),
            }).then(() => { dispatch(addEmployee(formData)); navigate(ROUTES.EMPLOYEE_LIST); });
        }
    };
    const contextValue: ContextValue = {
        formData,
        setFormData
    }
    return (
        <>
            <FormContext.Provider value={contextValue}>
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
                        {formArray?.map((item) => (
                            <CustomFormInput {...item} />))}
                        <Button type="submit" variant="contained" color="primary">
                            {state?.employeeInfo ? CONSTANT.UPDATE : CONSTANT.ADD}
                        </Button>
                    </Box>
                </Box>
            </FormContext.Provider>
        </>
    );
};

export default EmployeeForm;
