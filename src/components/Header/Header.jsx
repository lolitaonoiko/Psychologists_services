import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useMedia from '../../hooks/useMedia';
import { selectIsLoggedIn, selectLoginModal, selectRegisterModal } from '../../redux/auth/selectors';

import s from './Header.module.css';
import { closeFormModal, openFormModal } from '../../redux/auth/slice';
import { logoutThunk } from '../../redux/auth/operations';

const Navigation = lazy(() => import('../Navigation/Navigation'));
const Logo = lazy(() => import('../Logo/Logo'));
const BurgerMenu = lazy(() => import('../BurgerMenu/BurgerMenu'));
// const LoginButton = lazy(() => import('../LoginButton/LoginButton'));
const FormButton = lazy(() => import('../FormButton/FormButton'));
// const RegistrationButton = lazy(() => import('../RegistrationButton/RegistrationButton'));
const Form = lazy(() => import('../Form/Form'));

const Header = () => {
    const { isMobile, isTablet } = useMedia();
    const dispatch = useDispatch();
    const isLoginOpen = useSelector(selectLoginModal);
    const isRegisterOpen = useSelector(selectRegisterModal);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const handleOnClickLogInModal = e => {
        dispatch(openFormModal(e.target.innerText));
    };

    const handleOnClickLogOut = () => {
        dispatch(closeFormModal());
        dispatch(logoutThunk());
    };

    return (
        <header className={s.header}>
            <div className={s.headerContent}>
                <Logo />
                {isTablet && (
                    <>
                        <Navigation />
                        <div className={s.btnBox}>
                            {!isLoggedIn && (
                                <>
                                    <FormButton variant={'outline'} size={'small'} onClick={e => handleOnClickLogInModal(e)}>
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
                    </>
                )}
                {isLoginOpen && <Form>Log In</Form>}
                {isRegisterOpen && <Form>Registration</Form>}
                {isMobile && <BurgerMenu />}
            </div>
        </header>
    );
};

export default Header;
