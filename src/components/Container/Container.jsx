import s from './Container.module.css';

const Container = ({ children }) => {
    return <section className={s.wrapper}>{children}</section>;
};

export default Container;
