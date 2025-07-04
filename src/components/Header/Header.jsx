import { lazy, useState } from 'react';
import useMedia from '../../hooks/useMedia';

import s from './Header.module.css';

const Navigation = lazy(() => import('../Navigation/Navigation'));
const Logo = lazy(() => import('../Logo/Logo'));
const BurgerMenu = lazy(() => import('../BurgerMenu/BurgerMenu'));
const LoginButton = lazy(() => import('../LoginButton/LoginButton'));
const RegistrationButton = lazy(() => import('../RegistrationButton/RegistrationButton'));

const Header = () => {
    const { isMobile, isTablet } = useMedia();
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);

    const loginOnClick = () => {
        setIsLoginModal(true);
    };
    const registerOnClick = () => {
        setIsRegisterModal(true);
    };

    return (
        <header className={s.header}>
            <div className={s.headerContent}>
                <Logo />
                {isTablet && (
                    <>
                        <Navigation />
                        <div className={s.btnBox}>
                            <LoginButton variant={'outline'} size={'small'} onClick={loginOnClick}>
                                Login
                            </LoginButton>
                            <RegistrationButton onClick={registerOnClick}>Registration</RegistrationButton>
                        </div>
                    </>
                )}

                {isMobile && <BurgerMenu />}
            </div>
        </header>
    );
};

export default Header;
