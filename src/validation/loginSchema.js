import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email must be in the format: example@domain.com')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, 'Email must be in the format: example@domain.com')
        .required('Email is required')
        .min(3, 'Must be at least 3 characters long')
        .max(50, 'Too long'),
    password: yup.string().required('Password is required').min(8, 'Must be at least 8 characters long').max(12, 'Too long'),
});
