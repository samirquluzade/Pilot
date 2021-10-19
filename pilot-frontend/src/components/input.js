import React from "react";

export const Input = (props) => {
    return (
        <input
            type={props.type}
            name={props.name}
            className={props.className}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
        />
    );
};
export default Input;
