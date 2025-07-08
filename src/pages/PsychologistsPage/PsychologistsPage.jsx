import { lazy } from 'react';

const Container = lazy(() => import('../../components/Container/Container'));
const PsychologistsList = lazy(() => import('../../components/PsychologistsList/PsychologistsList'));
const FilterBar = lazy(() => import('../../components/FilterBar/FilterBar'));

const PsychologistsPage = () => {
    return (
        <div>
            <Container>
                <FilterBar />
                <PsychologistsList />
            </Container>
        </div>
    );
};

export default PsychologistsPage;
