import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useLogin = (callback, validate) => {
    const [items, setItems] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setItems({ ...items, [name]: value });
    };
    const renderData = async() => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', {
                email: items.email,
                password: items.password,
            });
                if (res.data.status === 201) {
                    setIsSubmitting(true);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email or password is wrong!',
                    });
                    setItems({
                        email: items.email,
                        password: ''
                    });
                }
            }
        catch(err){
            console.log(err.message);
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors(validate(items));
    };

    useEffect(() => {
        renderData();
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors,isSubmitting]);
    return { handleChange, items, handleSubmit, errors };
};
export default useLogin;