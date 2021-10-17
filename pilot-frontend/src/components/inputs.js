import React from 'react';
import Input from '../components/input'
export const Inputs = ({errors,items,handleChange}) => {
    return(
        <div>
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
        </div>
    );
}
export default Inputs;