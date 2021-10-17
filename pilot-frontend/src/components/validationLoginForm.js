export default function validationLoginForm(items) {
    let errors = {};

    if (!items.email) {
        errors.email = "Email address is required";
    } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            items.email
        )
    ) {
        errors.email = "Email address is invalid";
    }

    if (!items.password) {
        errors.password = "Password is required";
    } else if (items.password.length < 8) {
        errors.password = "Password needs to be 8 characters or more";
    }

    return errors;
}
