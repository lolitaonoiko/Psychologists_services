import { lazy } from 'react';
import useMedia from '../../hooks/useMedia';

import s from './Header.module.css';

const Navigation = lazy(() => import('../Navigation/Navigation'));
const Logo = lazy(() => import('../Logo/Logo'));
const BurgerMenu = lazy(() => import('../BurgerMenu/BurgerMenu'));

const Header = () => {
    const { isMobile, isTablet } = useMedia();

    return (
        <header className={s.header}>
            <div className={s.headerContent}>
                <Logo />
                {isTablet && <Navigation />}
                {isMobile && <BurgerMenu />}
            </div>
        </header>
    );
};

export default Header;
