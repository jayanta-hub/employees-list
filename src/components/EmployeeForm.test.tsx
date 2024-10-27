/* eslint-disable testing-library/no-unnecessary-act */
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { addEmployee, updateEmployee } from '../store/slice/employeeSlice';
import { CONSTANT, ROUTES } from '../utility/constant';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('EmployeeForm component', () => {
    const mockNavigate = jest.fn();
    const mockDispatch = jest.fn();
    const mockState = null;  // Or provide mock data for edit functionality

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useLocation as jest.Mock).mockReturnValue({ state: mockState });
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form fields correctly', async () => {
        await act(async () => {
            render(<EmployeeForm />);
        });

        // Check if the form fields are present
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Role')).toBeInTheDocument();
    });

    it('calls addEmployee and navigates on successful form submission', async () => {
        await act(async () => {
            render(<EmployeeForm />);
        });

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'Software Engineer' } });

        fireEvent.click(screen.getByText(CONSTANT.ADD));

        expect(mockDispatch).toHaveBeenCalledWith(addEmployee({
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Software Engineer',
            id:1
        }));
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EMPLOYEE_LIST);
    });

    it('shows an alert when required fields are missing', async () => {
        window.alert = jest.fn(); // Mock window alert

        await act(async () => {
            render(<EmployeeForm />);
        });

        fireEvent.click(screen.getByText(CONSTANT.ADD));

        // Expect an alert to be shown
        expect(window.alert).toHaveBeenCalledWith('Please fill in all the fields');
    });
});






// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import { addEmployee, updateEmployee } from '../store/slice/employeeSlice';
// import EmployeeForm from '../components/EmployeeForm';
// import { CONSTANT, ROUTES } from '../utility/constant';
// import { formArray } from '../utility/jsonData';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// // Mocking necessary dependencies
// const mockDispatch = jest.fn();
// const mockNavigate = jest.fn();
// const mockUseLocation = jest.fn();

// jest.mock('react-redux', () => ({
//     useDispatch: () => mockDispatch,
// }));

// jest.mock('react-router-dom', () => ({
//     useNavigate: () => mockNavigate,
//     useLocation: () => mockUseLocation(),
// }));

// describe('EmployeeForm component', () => {
//     const mockNavigate = jest.fn();
//     const mockDispatch = jest.fn();
//     const mockState = null;  // or some state if you're testing "update"

//     beforeEach(() => {
//         (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
//         (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
//         (useLocation as jest.Mock).mockReturnValue({ state: mockState });
//     });
//     it('renders the form fields correctly', async () => {
//         render(<EmployeeForm />); 
//         // Ensure the EmployeeForm component is properly rendered.
    
//         // Use `findByLabelText` with async to wait for the fields if necessary.
//         expect(await screen.findByLabelText('Name')).toBeInTheDocument();
//         expect(screen.getByLabelText('Email')).toBeInTheDocument();
//         expect(screen.getByLabelText('Role')).toBeInTheDocument();
//     });
    

//     it('calls addEmployee and navigates on successful form submission', async () => {
//         render(<EmployeeForm />);
    
//         // Fill out form fields
//         fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
//         fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
//         fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'Software Engineer' } });
    
//         // Submit form
//         fireEvent.click(screen.getByText(CONSTANT.ADD));
    
//         // Assert dispatch and navigation are called
//         await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(addEmployee({
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             role: 'Software Engineer',
//             id: 1
//         })));
//         expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EMPLOYEE_LIST);
//     });
    
//     it('calls updateEmployee and navigates on successful form submission', async () => {
//         // Simulate the scenario where the form is used to update an existing employee
//         const employeeData = { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Software Engineer' };
//         render(<EmployeeForm />, { wrapper: ({ children }) => <Router location={{ state: { employeeInfo: employeeData } }}>{children}</Router> });
    
//         // Submit form
//         fireEvent.click(screen.getByText(CONSTANT.UPDATE));
    
//         // Assert dispatch and navigation are called
//         await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(updateEmployee(employeeData)));
//         expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EMPLOYEE_LIST);
//     });
    

//     it('shows an alert when required fields are missing', () => {
//         // Mock window alert
//         window.alert = jest.fn();

//         mockUseLocation.mockReturnValue({ state: null });

//         render(<EmployeeForm />);

//         // Simulate submitting the form with missing required fields
//         fireEvent.click(screen.getByText(CONSTANT.ADD));

//         // Assert that the alert is triggered
//         expect(window.alert).toHaveBeenCalledWith('Please fill in all the fields');
//     });
// });
