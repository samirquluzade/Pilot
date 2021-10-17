import React from "react";
import { Link } from "react-router-dom";

import Input from "../components/input";
import useLogin from "../components/UseLoginForm";
import validate from "../components/validationLoginForm";

export default function LoginScreen({ createForm }) {
    const { handleChange, items, errors, handleSubmit } = useLogin(
        createForm,
        validate
    );
    return (
        <form onSubmit={handleSubmit}>
            <h4 className="text-center title">Login to continue</h4>
            <div className="validate-input">
                {errors.email && <p>{errors.email}</p>}
                <Input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={items.email}
                    handleChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
                <Input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={items.password}
                    handleChange={handleChange}
                />
                <div className="container-button">
                    <button className="button-login">Login</button>
                </div>
            </div>
            <div className="new-user">
                <Link className="button-create" to="/register">
                    Create your Account
                </Link>
            </div>
        </form>
    );
}
