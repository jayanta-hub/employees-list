import { TextField } from "@mui/material";
import { memo, useContext } from "react";
import FormContext from "../utility/context/FormContext";
import { CustomFormInputProps } from "../utility/types";

const CustomFormInput = ({ inputType, label, required, variant }: CustomFormInputProps): JSX.Element => {
    const { formData, setFormData } = useContext(FormContext);
    /**
     * This function takes a label and returns the lowercase version of it.
     * 
     * @param {string} label - Label to be converted to lowercase.
     * @returns {string} - Lowercase version of the label.
     */
    const getLowercaseLabel = (label: string): string => label?.toLocaleLowerCase();

    /**
     * This function takes an input type and returns the corresponding MUI TextField 
     * component with the label, variant and value set based on the props passed to 
     * CustomFormInput.
     * 
     * @param {string} inputType - Input type to be rendered. Currently only "TextField" is supported.
     * @returns {JSX.Element} - MUI TextField component with the props set based on the inputType.
     */
    const getInputComponent = (inputType: string): JSX.Element | string => {
        switch (inputType) {
            case "TextField":
                return (
                    <TextField
                        label={label}
                        type={getLowercaseLabel(label)}
                        variant={variant}
                        value={formData[getLowercaseLabel(label)] || ""}
                        onChange={(e) => setFormData({ ...formData, [getLowercaseLabel(label)]: e.target.value })}
                        required={required}
                    />
                );
            default:
                return "Input type not Found";
        }
    }

    return (
        <>
            {getInputComponent(inputType)}
        </>
    )
}
export default memo(CustomFormInput);