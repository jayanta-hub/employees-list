import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeTable from './EmployeeTable';

// Sample employee data
const mockEmployees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager' },
    { id: 3, name: 'Sam Brown', email: 'sam@example.com', role: 'Designer' },
    { id: 4, name: 'Chris Green', email: 'chris@example.com', role: 'Tester' },
];

// Mock functions for edit and delete actions
const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();

const renderEmployeeTable = (employees = mockEmployees) => {
    return render(
        <EmployeeTable employee={employees} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );
};

describe('EmployeeTable component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock functions before each test
    });

    it('renders table headers correctly', () => {
        renderEmployeeTable();

        // Checking if table headers are rendered correctly
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Role')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('renders the employee data correctly', () => {
        renderEmployeeTable();

        // Check if each employee's name, email, and role is rendered
        mockEmployees.forEach((employee) => {
            expect(screen.getByText(employee.name)).toBeInTheDocument();
            expect(screen.getByText(employee.email)).toBeInTheDocument();
            expect(screen.getByText(employee.role)).toBeInTheDocument();
        });
    });

    it('calls onDelete when the delete button is clicked', () => {
        renderEmployeeTable();

        // Click the delete button for the first employee
        const deleteButton = screen.getAllByLabelText('delete')[0];
        fireEvent.click(deleteButton);

        // Assert that onDelete was called with the correct employee ID
        expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    it('calls onEdit when the edit button is clicked', () => {
        renderEmployeeTable();

        // Click the edit button for the second employee
        const editButton = screen.getAllByLabelText('edit')[1];
        fireEvent.click(editButton);

        // Assert that onEdit was called with the correct employee object
        expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[1]);
    });

    it('changes pages when pagination is used', () => {
        renderEmployeeTable(mockEmployees);

        // Navigate to the next page (simulate clicking the "Next" button in pagination)
        const nextPageButton = screen.getByLabelText('Go to next page');
        fireEvent.click(nextPageButton);

        // Assert that the page has changed and different data is now visible
        expect(screen.queryByText(mockEmployees[0].name)).not.toBeInTheDocument();
    });

    it('changes the number of rows per page', () => {
        renderEmployeeTable(mockEmployees);

        // Change rows per page to 10
        const rowsPerPageSelect = screen.getByLabelText('rows per page');
        fireEvent.change(rowsPerPageSelect, { target: { value: '10' } });

        // Assert that the table now shows more rows
        mockEmployees.forEach((employee) => {
            expect(screen.getByText(employee.name)).toBeInTheDocument();
        });
    });

    it('renders empty rows when there are not enough employees to fill the page', () => {
        renderEmployeeTable(mockEmployees.slice(0, 2)); // Render only 2 employees

        // Assert that there are empty rows
        expect(screen.getAllByRole('row')).toHaveLength(7); // 2 rows with data + 5 empty rows
    });
});
