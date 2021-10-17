import React from "react";

import Form from '../components/form';
import useForm from "../components/UseRegisterForm";
import validate from "../components/validationRegisterForm";

export default function RegisterScreen({ submitForm }) {
    const { handleChange, values, handleSubmit, errors } = useForm(
        submitForm,
        validate
    );
    return (
        <Form handleSubmit={handleSubmit} title="Register to continue" items={values} handleChange={handleChange} errors={errors} action="Sign Up" secAction="Login"/>
    );
}
