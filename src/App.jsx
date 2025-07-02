import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import './App.css';
import { ToastContainer } from 'react-toastify';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const PsychologistsPage = lazy(() => import('./pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/psychologists" element={<PsychologistsPage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
            <ToastContainer position="top-center" pauseOnHover/>
        </>
    );
}

export default App;
