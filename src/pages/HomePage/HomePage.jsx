// import { lazy } from 'react';

import { lazy } from 'react';

const Container = lazy(() => import('../../components/Container/Container'));
const HeroSection = lazy(() => import('../../components/HeroSection/HeroSection'));
// const Header = lazy(() => import('../../components/Header/Header'));

const HomePage = () => {
    return (
        <div>
            <Container>
                <HeroSection />
            </Container>
        </div>
    );
};

export default HomePage;
