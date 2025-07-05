import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import s from './ModalBackdrop.module.css';
import { useSelector } from 'react-redux';
import { selectAppointmentModal, selectLoginModal, selectRegisterModal } from '../../redux/auth/selectors';

const ModalBackdrop = ({ onClose, children }) => {
    const loginModal = useSelector(selectLoginModal);
    const registerModal = useSelector(selectRegisterModal);
    const appointmentModal = useSelector(selectAppointmentModal);

    const isModalOpen = loginModal || registerModal || appointmentModal;

    useEffect(() => {
        const handleEscape = event => {
            if (event.key === 'Escape' && isModalOpen) {
                onClose();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);

            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, onClose]);

    if (!isModalOpen) return null;

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={s.backdrop} onClick={handleBackdropClick}>
            <div className={s.modal} onClick={e => e.stopPropagation()}>
                <AiOutlineClose size={24} onClick={onClose} className={s.closeButton} />
                {children}
            </div>
        </div>
    );
};

export default ModalBackdrop;
