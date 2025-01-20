import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { NavbarFilterProvider } from './context/NavbarFilterProvider';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <NavbarFilterProvider>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="listing/:id" element={<ListingPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </NavbarFilterProvider>
        </BrowserRouter>
    );
};

export default App;