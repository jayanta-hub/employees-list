import { TextFieldVariants, TextField } from "@mui/material";
import { memo, useContext } from "react";
import FormContext from "../utility/context/FormContext";

const CustomFormInput = ({ inputType, label, required, variant }: { inputType: string, label: string, required: boolean, variant: TextFieldVariants | undefined }): JSX.Element => {
    const { formData, setFormData } = useContext(FormContext);
    const getInputType = (inputType: string) => {
        switch (inputType) {
            case "TextField":
                return <TextField
                    label={label}
                    variant={variant}
                    value={formData[label?.toLocaleLowerCase()] || ""}
                    onChange={(e) => setFormData({ ...formData, [label?.toLocaleLowerCase()]: e.target.value })}
                    required={required}
                />;
            default:
                return "Input type not found";
        }
    }

    return (
        <>
            {getInputType(inputType)}
        </>
    )
}
export default memo(CustomFormInput);