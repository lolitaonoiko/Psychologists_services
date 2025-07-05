import { lazy } from 'react';

const Button = lazy(() => import('../Button/Button'));

const FormButton = ({ children, ...props }) => <Button {...props}>{children}</Button>;

export default FormButton;
