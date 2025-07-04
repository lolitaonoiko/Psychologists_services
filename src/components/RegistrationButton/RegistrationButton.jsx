import { lazy } from 'react';

const Button = lazy(() => import('../Button/Button'));

export const RegistrationButton = (props, children) => <Button {...props}>{children || 'Registration'}</Button>;

export default RegistrationButton;
