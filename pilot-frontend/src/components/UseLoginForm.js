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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors(validate(items));
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                email: items.email,
                password: items.password,
            });
            if (res.data.status === 201) {
                if(res.data.response.user.admin === 0){
                    localStorage.setItem("tokenUser",JSON.stringify(res.data.response.token));
                }
                else if(res.data.response.user.admin === 1){
                    localStorage.setItem("tokenAdmin",JSON.stringify(res.data.response.token));
                }
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
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors,isSubmitting,callback]);
    return { handleChange, items, handleSubmit, errors };
};
export default useLogin;
