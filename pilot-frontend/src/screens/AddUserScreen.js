import React from "react";
import useForm from "../components/UseRegisterForm";
import validate from "../components/validationRegisterForm";
import Form from "../components/form";

export default function AddUser({logoutHandler,submitForm}) {
    const { handleChange, values, handleSubmit, errors } = useForm(
        submitForm,
        validate
    );
    return(
        <div>
            <Form handleSubmit={handleSubmit} title="Create Account" items={values} handleChange={handleChange} errors={errors} action="Create Account" secAction="null"/>
            <div className="text-center p-2">
                <button className="btn btn-warning" onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    );
}
