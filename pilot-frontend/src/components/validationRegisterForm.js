export default function validationRegisterForm(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    }

    if (!values.email) {
        errors.email = "Email address is required";
    } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            values.email
        )
    ) {
        errors.email = "Email address is invalid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 8) {
        errors.password = "Password needs to be 8 characters or more";
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = "Password is required";
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = "Passwords do not match";
    }

    return errors;
}
