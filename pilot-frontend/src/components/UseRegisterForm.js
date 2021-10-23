import { useState, useEffect } from "react";
import axios from 'axios';

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(values));
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation
            });
            if (res.data.status === 201) {
                setIsSubmitting(true);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors,isSubmitting,callback]);
    return { handleChange, values, handleSubmit, errors };
};
export default useForm;