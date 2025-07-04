import { lazy } from 'react';

const Button = lazy(() => import('../Button/Button'));

export const LoginButton = (props, children) => <Button {...props}>{children || 'Login'}</Button>;

export default LoginButton;
