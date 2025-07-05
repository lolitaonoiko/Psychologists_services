import { lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './Form.module.css';
import { closeFormModal } from '../../redux/auth/slice';
import { useFormConfig } from '../../hooks/useFormConfig';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { loginThunk, registerThunk } from '../../redux/auth/operations';

const ModalBackdrop = lazy(() => import('../ModalBackdrop/ModalBackdrop'));
// const LoginButton = lazy(() => import('../LoginButton/LoginButton'));
const FormButton = lazy(() => import('../FormButton/FormButton'));

const Form = ({ children = 'Log In' }) => {
    const [hiddenPass, setHiddenPass] = useState(true);
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const config = useFormConfig();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(config.schema),
        mode: 'onChange',
    });

    const toggleHiddenPass = () => {
        setHiddenPass(prev => !prev);
    };

    const handleOnCloseModal = () => {
        reset();
        dispatch(closeFormModal());
    };

    const handleOnSubmitForm = async data => {
        setHasTriedSubmit(false);

        try {
            if (config.type === 'register') {
                await dispatch(
                    registerThunk({
                        name: data.name.trim(),
                        email: data.email.trim(),
                        password: data.password.trim(),
                    })
                )
                    .unwrap()
                    .then(() => handleOnCloseModal())
                    .then(() => navigate('/psychologists'));
            } else if (config.type === 'login') {
                await dispatch(
                    loginThunk({
                        email: data.email.trim(),
                        password: data.password.trim(),
                    })
                )
                    .unwrap()
                    .then(() => handleOnCloseModal())
                    .then(() => navigate('/psychologists'));
            }

            reset();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <ModalBackdrop onClose={handleOnCloseModal}>
                <h2 className={s.title}>{children}</h2>
                <p className={s.descr}>{config.description}</p>

                <form
                    className={s.form}
                    onSubmit={handleSubmit(
                        data => handleOnSubmitForm(data),
                        () => setHasTriedSubmit(true)
                    )}
                >
                    <ul className={s.list}>
                        {children === 'Registration' && (
                            <li className={s.listItem}>
                                <label className={s.label}>
                                    <span className={s.span}>Name</span>
                                    <input className={`${s.inpt} ${s.name}`} {...register('name')} type="text" />
                                    {errors.name && <span className={s.errorMessage}>{errors.name.message}</span>}
                                </label>
                            </li>
                        )}
                        <li className={s.listItem}>
                            <label className={s.label}>
                                <span className={s.span}>Email</span>
                                <input className={`${s.inpt} ${s.email}`} {...register('email')} type="email" />
                                {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                            </label>
                        </li>
                        <li className={s.listItem}>
                            <label className={s.label}>
                                <span className={s.span}>Password</span>
                                <input className={`${s.inpt} ${s.pass}`} {...register('password')} type={hiddenPass ? 'password' : 'text'} />
                                {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
                            </label>
                            <button className={s.iconEye} type="button" onClick={toggleHiddenPass}>
                                {hiddenPass ? <FiEyeOff size={'20'} /> : <FiEye size={'20'} />}
                            </button>
                        </li>
                    </ul>
                    <span className={s.btnSpan}>
                        <FormButton type={'submit'} size={'long'} disabled={hasTriedSubmit && !isValid}>
                            {config.buttonText}
                        </FormButton>
                    </span>
                </form>
            </ModalBackdrop>
        </>
    );
};

export default Form;
