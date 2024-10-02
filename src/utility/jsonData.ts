import { TextFieldVariants } from "@mui/material"
import { EmployeeFormProps } from "./types"

export const formArray: {
    inputType: string
    label: string,
    type: "text" | "email",
    required: boolean,
    variant: TextFieldVariants | undefined
}[] = [{
    inputType: "TextField",
    label: 'Name',
    type: "text",
    variant: 'outlined',
    required: true
},
{
    inputType: "TextField",
    label: 'Email',
    type: "email",
    variant: 'outlined',
    required: true,
},
{
    inputType: "TextField",
    label: 'Role',
    type: "text",
    variant: 'outlined',
    required: true,
}]
export const employeeFormData = {
    name: '',
    email: '',
    role: ''
}