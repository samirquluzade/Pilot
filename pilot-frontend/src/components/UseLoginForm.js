import { useState, useEffect } from "react";

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
    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(items));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);
    return { handleChange, items, handleSubmit, errors };
};
export default useLogin;
