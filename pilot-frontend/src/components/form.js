import React from "react";
import { Link } from "react-router-dom";

import Input from "../components/input";
import Inputs from "../components/inputs";
import RegisterInputs from "./RegisterInputs";

export const Form = ({handleSubmit,title,errors,items,handleChange,action,secAction}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div className="validate-input">
                {secAction === "Create your Account" && (
                    <>
                    <h4 className="text-center title">{title}</h4>
                        <Inputs errors={errors} items={items} handleChange={handleChange}/>
                        <div className="container-button">
                            <button className="button-login">{action}</button>
                        </div>
                        <div className="new-user">
                            <Link className="button-create" to="/register">
                                {secAction}
                            </Link>
                        </div>
                    </>)} {secAction==="Login" && (
                <>
                    <h4 className="text-center title">{title}</h4>
                    <RegisterInputs errors={errors} items={items} handleChange={handleChange}/>
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
                {action==="Create Account" && (
                    <div>
                        <h4 className="text-center title">{title}</h4>
                        <RegisterInputs errors={errors} items={items} handleChange={handleChange}/>
                        <select className="form-control" name="admin" onChange={handleChange}>
                            <option value="" disabled selected>Admin</option>
                            <option value="0">False</option>
                            <option value="1">True</option>
                        </select>
                        <div className="container-button">
                            <button className="button-create">{action}</button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}
export default Form;