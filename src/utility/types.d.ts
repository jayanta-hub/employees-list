export interface EmployeeTableProps {
    employee: any;
    onDelete: (id: number) => void;
    onEdit: (employee: object) => void;
}
export interface EmployeeFormProps {
    id: number,
    name: string,
    email: string,
    role: string,
}