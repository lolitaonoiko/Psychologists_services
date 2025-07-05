import { loginValidationSchema } from '../validation/loginSchema';
import { registerValidationSchema } from '../validation/registerSchema';

export const FORM_CONFIGS = {
    login: {
        type: 'login',
        description: 'Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.',
        buttonText: 'Log In',
        schema: loginValidationSchema,
    },
    register: {
        type: 'register',
        description: 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.',
        buttonText: 'Sign Up',
        schema: registerValidationSchema,
    },
};
