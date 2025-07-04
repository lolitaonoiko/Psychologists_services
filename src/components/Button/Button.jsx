import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../../redux/auth/selectors';

import s from './Button.module.css';

const Button = ({ variant = 'basic', type = 'button', size = 'medium', disabled = false, children, className = '', ...props }) => {
    const isLoading = useSelector(selectIsLoading);

    const buildBtnClasses = () => clsx(s.button, s[variant], s[size], disabled && s.disabled, isLoading && s.loading, className);

    return (
        <button className={buildBtnClasses()} type={type} disabled={disabled || isLoading} {...props}>
            {isLoading && <span className={s.spinner}></span>}
            <span className={isLoading ? s.hiddenText : ''}>{children}</span>
        </button>
    );
};

export default Button;
