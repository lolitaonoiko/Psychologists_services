import { lazy, Suspense } from 'react';

import s from './Layout.module.css';

const Header = lazy(() => import('../Header/Header'));

const Layout = ({ children }) => {
    return (
        <section>
            <Header />
            <Suspense fallback={<p className={s.loader}>Loading page...</p>}>{children}</Suspense>
        </section>
    );
};

export default Layout;
