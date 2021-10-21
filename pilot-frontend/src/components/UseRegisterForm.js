import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Redirect} from "react-router-dom";

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
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
            setIsSubmitting(true);
            const res = await axios.post('http://127.0.0.1:8000/api/register', {
                name: values.name,
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm
            });
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'You have successfully registered!',
                    showConfirmButton: false,
                    timer: 1500
                })
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
    }, [errors]);
    return { handleChange, values, handleSubmit, errors };
};
export default useForm;