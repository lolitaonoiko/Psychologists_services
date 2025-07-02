import { lazy } from 'react';

const Navigation = lazy(() => import('../../components/Navigation/Navigation'));

const HomePage = () => {
    return (
        <div>
            <Navigation />
        </div>
    );
};

export default HomePage;
