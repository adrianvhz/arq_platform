import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setformValidation] = useState({});
    
    useEffect(() => {
        createValidators();
    }, [formState] );

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const isFormValid = useMemo(()=>{ 
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null ) return false;   
        }

        return true;
    }, [formValidation])

    const createValidators = () => {
        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = "Errores de validación"] = formValidations[formField]
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            setformValidation(formCheckValues);
        }
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}
