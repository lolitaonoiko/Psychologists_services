import s from './Logo.module.css';

const Logo = () => {
    return (
        <>
            <svg width="218" height="28">
                <use href="/icons/sprite.svg#icon-logo"></use>
            </svg>
        </>
    );
};

export default Logo;
