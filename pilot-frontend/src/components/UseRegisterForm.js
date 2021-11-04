import { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        admin:0
    });
    const history = useHistory();

    const tokenAdmin = localStorage.getItem('tokenAdmin');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreating,setIsCreating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        // setValues(prevState => ({
        //     ...prevState,name:value
        // }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(values));
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
                admin:values.admin
            });
            if (res.data.status === 201) {
                setIsSubmitting(true);
            }
            if(tokenAdmin!==null){
                history.push('/user');
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(() => {
        if ((Object.keys(errors).length === 0 && isSubmitting) || (Object.keys(errors).length === 0 && isCreating)) {
            callback();
        }
    }, [errors,isSubmitting,callback]);
    return { handleChange, values, handleSubmit, errors };
};
export default useForm;