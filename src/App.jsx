import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { lazy } from 'react';

import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const PsychologistsPage = lazy(() => import('./pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const PsychologistsReviews = lazy(() => import('./components/PsychologistsReviews/PsychologistsReviews'));
const Layout = lazy(() => import('./components/Layout/Layout'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute/PrivateRoute'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/psychologists" element={<PsychologistsPage />}>
                        <Route path="reviews" element={<PsychologistsReviews />} />
                    </Route>
                    <Route path="/favorites" element={<PrivateRoute component={<FavoritesPage />} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ToastContainer position="top-center" pauseOnHover />
            </Layout>
        </>
    );
}

export default App;
