import MenuBar from "../ui-components/MenuBar";
import Filters from "../ui-components/Filters";
import React, { useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import '../ui-components/css/Filter.css'; // Import the CSS for CSSTransition animations
import Hero from "../ui-components/Hero";
import { useNavbarFilter } from '../context/NavbarFilterProvider';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";


const HomePage  = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [currentMenuFilter, setCurrentMenuFilter] = useState<string>('');
    const { brojNocenja} = useNavbarFilter();
    const [filters, setFilters] = useState<any>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const { handleListingFilterChange } = useNavbarFilter();

    const { user } = useUser();
    const navigate = useNavigate();

    const handleShowFilterChange = (value: boolean) => {
        setShowFilter(value);
    };


    const handleMenuFilterChange = (value : string) => {
        setCurrentMenuFilter(value);

    }

    const handleNavigateToListing = (id: number) => {
        if(user === null) {
            toast.error('Morate biti prijavljeni da biste videli detalje o smeštaju');
            navigate('');
            return;
        }
        console.log("navigating");
        setCurrentMenuFilter('');
        navigate(`/listing/${id}`);
    };

    useEffect(() => {
        if (filters) {
           handleShowFilterChange(false);
          }
    }, [filters]);


   
    

    return (
        <>
        <main className="home-page relative">
            {showFilter && <div className="fixed inset-0 bg-black opacity-50"></div>}
            <MenuBar onShowFilterChange={handleShowFilterChange} onFilterChange={handleMenuFilterChange} />
            <CSSTransition
                in={showFilter}
                timeout={300}
                classNames="filter"
                unmountOnExit
            >
                <div className="fixed inset-0 flex items-center justify-center z-40 ">
                    <div className="absolute inset-0  bg-black opacity-50"></div>
                    <Filters onShowFilterChange={handleShowFilterChange} onSubmitFilters={setFilters} />
                </div>
            </CSSTransition>
            <Hero filters={filters} brojNocenja={brojNocenja} menuFilter={currentMenuFilter} navigateToListing={handleNavigateToListing} />
        </main>
        </>
        
    );
};

export default HomePage;