import React from "react";

import Form from '../components/form';
import useLogin from "../components/UseLoginForm";
import validate from "../components/validationLoginForm";

export default function LoginScreen({ createForm }) {
    const { handleChange, items, errors, handleSubmit } = useLogin(
        createForm,
        validate
    );
    return (
        <Form handleSubmit={handleSubmit} title="Login to continue" items={items} handleChange={handleChange} errors={errors} action="Login" secAction="Create your Account"/>
    );
}
