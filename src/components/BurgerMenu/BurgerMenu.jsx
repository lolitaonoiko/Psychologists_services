import { lazy, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

import s from './BurgerMenu.module.css';
import clsx from 'clsx';

const Navigation = lazy(() => import('../Navigation/Navigation'));

const BurgerMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleOnClick = () => {
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
        setIsClosing(true);
        setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
        }, 300);
    };

    return (
        <>
            <div>
                <RxHamburgerMenu size={24} onClick={handleOnClick} className={s.burger} />
            </div>
            {isOpen && (
                <div className={clsx(s.backdrop, isClosing && s.backdropClosing)} onClick={handleBackdropClick}>
                    <div className={clsx(s.modal, isClosing && s.modalClosing)}>
                        <div className={s.modalHeader}>
                            <AiOutlineClose size={24} onClick={handleClose} className={s.closeButton} />
                        </div>
                        <div className={s.modalContent}>
                            <Navigation onNavigate={handleClose} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default BurgerMenu;
