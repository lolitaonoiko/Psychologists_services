import { lazy, useEffect, useRef, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

import s from './BurgerMenu.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { closeFormModal, openFormModal } from '../../redux/auth/slice';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { logoutThunk } from '../../redux/auth/operations';

const Navigation = lazy(() => import('../Navigation/Navigation'));
// const LoginButton = lazy(() => import('../LoginButton/LoginButton'));
// const RegistrationButton = lazy(() => import('../RegistrationButton/RegistrationButton'));
const FormButton = lazy(() => import('../FormButton/FormButton'));

const BurgerMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();

    const handleOnClickLogInModal = e => {
        dispatch(openFormModal(e.target.innerText));
        handleClose();
    };
    const handleOnClickLogOut = () => {
        dispatch(closeFormModal());
        dispatch(logoutThunk());
        handleClose();
    };

    const handleOnClickBurgerMenu = () => {
        if (isOpen) {
            handleClose();
        } else {
            setOpen(true);
        }
    };

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    const handleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsClosing(true);
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
            timeoutRef.current = null;
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <div>
                <RxHamburgerMenu size={24} onClick={handleOnClickBurgerMenu} className={s.burger} />
            </div>
            {isOpen && (
                <div className={clsx(s.backdrop, isClosing && s.backdropClosing)} onClick={handleBackdropClick}>
                    <div className={clsx(s.modal, isClosing && s.modalClosing)}>
                        <div className={s.modalHeader}>
                            <AiOutlineClose size={24} onClick={handleClose} className={s.closeButton} />
                        </div>
                        <div className={s.modalContent}>
                            <Navigation onNavigate={handleClose} burger />
                            {!isLoggedIn && (
                                <>
                                    <FormButton onClick={e => handleOnClickLogInModal(e)} variant={'outline'} size={'small'}>
                                        Login
                                    </FormButton>
                                    <FormButton onClick={e => handleOnClickLogInModal(e)}>Registration</FormButton>
                                </>
                            )}
                            {isLoggedIn && (
                                <FormButton onClick={handleOnClickLogOut} variant={'logout'}>
                                    Log out
                                </FormButton>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default BurgerMenu;
