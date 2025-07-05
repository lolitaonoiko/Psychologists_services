import { useFormType } from './useFormType';
import { FORM_CONFIGS } from '../constants/formConfig';

export const useFormConfig = () => {
    const formType = useFormType();
    return FORM_CONFIGS[formType];
};
