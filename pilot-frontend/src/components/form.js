import React from "react";
import { Link } from "react-router-dom";

import Input from "../components/input";

export const Form = ({handleSubmit,title,errors,items,handleChange,action,secAction}) => {
    return(
        <form onSubmit={handleSubmit}>
            <h4 className="text-center title">{title}</h4>
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
                    <button className="button-login">{action}</button>
                </div>
            </div>
            <div className="new-user">
                <Link className="button-create" to="/register">
                    {secAction}
                </Link>
            </div>
        </form>
    );
}
export default Form;