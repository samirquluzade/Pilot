import React from "react";
import { Link } from "react-router-dom";

import Input from "../components/input";
import Inputs from "../components/inputs";

export const Form = ({handleSubmit,title,errors,items,handleChange,action,secAction}) => {
    return(
        <form onSubmit={handleSubmit}>
            <h4 className="text-center title">{title}</h4>
            <div className="validate-input">
                {secAction === "Create your Account" ? (
                    <>
                        <Inputs errors={errors} items={items} handleChange={handleChange}/>
                        <div className="container-button">
                            <button className="button-login">{action}</button>
                        </div>
                        <div className="new-user">
                            <Link className="button-create" to="/register">
                                {secAction}
                            </Link>
                        </div>
                    </>) : (
                <>
                    {errors.name && <p>{errors.name}</p>}
                    <Input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={items.name}
                        handleChange={handleChange}
                    />
                    <Inputs errors={errors} items={items} handleChange={handleChange}/>
                    {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
                    <Input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        placeholder="Password Confirm"
                        value={items.password_confirmation}
                        handleChange={handleChange}
                    />
                <div className="container-button">
                    <button className="button-create">{action}</button>
                </div>
                <div className="signed-up text-center pt-3">
                    <label>
                    Already signed up?{" "}
                        <Link to="/login" className="forgot">
                            {secAction}
                        </Link>
                    </label>
                </div>
                </>
                )
            }
            </div>
        </form>
    );
}
export default Form;