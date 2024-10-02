import * as yup from "yup";

export const registerSchema = yup
    .object({
        username: yup
            .string()
            .required("Username is Required!")
            .min(5, "Username should be at least 5 cgarachers."),
        email: yup
            .string()
            .required("Email is Required!")
            .matches(/^[^@]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
        password: yup
            .string()
            .required("Password is Required!")
            .min(6, "Password should be at least 6 cgarachers."),
    })
    .required();
