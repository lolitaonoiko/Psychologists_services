import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';
import useMedia from '../../hooks/useMedia';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = ({ onNavigate }) => {
    const { isMobile, isTablet } = useMedia();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const buildMobWrapperClass = isMobile => {
        return clsx(isMobile && s.mobWrapper);
    };

    const classNavLink = ({ isActive }) => clsx(s.navLink, isActive && s.active);

    const handleNavClick = () => {
        // Викликаємо callback для закриття модалки при навігації
        if (onNavigate) {
            onNavigate();
        }
    };

    return (
        <div className={buildMobWrapperClass(isMobile)}>
            <nav>
                <ul className={s.navList}>
                    <li>
                        <NavLink className={classNavLink} to="/" onClick={handleNavClick}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={classNavLink} to="/psychologists" onClick={handleNavClick}>
                            Psychologists
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <NavLink className={classNavLink} to="/favorites" onClick={handleNavClick}>
                                Favorites
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
