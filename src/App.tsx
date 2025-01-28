import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { NavbarFilterProvider } from './context/NavbarFilterProvider';
import { useJsApiLoader} from '@react-google-maps/api'
import VerificationPage from './pages/VerificationPage';
import { UserProvider } from './context/UserContext';
import BookingPage from './pages/BookingPage';
import CreateListingHomePage from './pages/create-listing/CreateListingHomePage';
import CreateListingPage from './pages/create-listing/CreateListingPage';
const App: React.FC = () => {
    const servicesFee = 0.1;
    const API_KEY = 'AIzaSyBT-yY4QFK8OxvU91Wsx6rkdsTaV68x_5M';
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: ['places']
    });

    
    


    return (
        <BrowserRouter>
            <UserProvider>
                <NavbarFilterProvider>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="listing/:id" element={<ListingPage isLoaded={isLoaded} API_KEY={API_KEY} servicesFee={servicesFee} />} />
                            <Route path="*" element={<NotFoundPage />} />
                            <Route path="verify-account" element={<VerificationPage />} />
                            <Route path="booking" element={<BookingPage />} />
                            <Route path="become-a-host" element={<CreateListingHomePage />} />
                            <Route path="become-a-host/listing-type" element={<CreateListingPage API_KEY={API_KEY} isLoaded={isLoaded} />} />
                        </Route>
                    </Routes>
                </NavbarFilterProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;