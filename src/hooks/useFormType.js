import { useSelector } from 'react-redux';
import { selectLoginModal, selectRegisterModal } from '../redux/auth/selectors';

export const useFormType = () => {
    const isLoginModal = useSelector(selectLoginModal);
    const isRegisterModal = useSelector(selectRegisterModal);

    if (isLoginModal) return 'login';
    if (isRegisterModal) return 'register';
    return 'login';
};
