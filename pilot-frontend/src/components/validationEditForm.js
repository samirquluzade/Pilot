export default function validationEditForm(items) {
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

    if (!items.name) {
        errors.name = "Name is required";
    }

    return errors;
}
