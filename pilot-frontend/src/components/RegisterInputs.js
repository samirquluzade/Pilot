import React from 'react';
import Input from "./input";
import Inputs from "./inputs";

export const RegisterInputs = ({errors,items,handleChange}) => {
    return(
        <React.Fragment>
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
            {errors.password_confirmation && <p>{errors.password_confirmation}</p>}
            <Input
                type="password"
                name="password_confirmation"
                className="form-control"
                placeholder="Password Confirm"
                value={items.password_confirmation}
                handleChange={handleChange}
            />
        </React.Fragment>
    );
}
export default RegisterInputs;