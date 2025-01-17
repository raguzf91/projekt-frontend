import MenuBar from "../ui-components/MenuBar";
import Filters from "../ui-components/Filters";
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../ui-components/css/Filter.css'; // Import the CSS for CSSTransition animations
import Hero from "../ui-components/Hero";
import { useNavbarFilter } from '../context/NavbarFilterContext';
import { useSearchParams } from "react-router-dom";


const HomePage  = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [currentMenuFilter, setCurrentMenuFilter] = useState<string>('Sve');
    const { brojNocenja, dolazak, odlazak, gosti, regija } = useNavbarFilter();
    const handleShowFilterChange = (value: boolean) => {
        setShowFilter(value);
    };

    const [searchParams, setSearchParams] = useSearchParams();
    
     
    const handleMenuFilterChange = (value : string) => {
        setCurrentMenuFilter(value);

    }

    useEffect(() => {
        setSearchParams({ category: currentMenuFilter, regija: regija, brojNocenja: brojNocenja.toString(), dolazak: dolazak, odlazak: odlazak, gosti: gosti.toString() });
    }, [currentMenuFilter, brojNocenja, setSearchParams, dolazak, odlazak, gosti, regija]);

    

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
                    <Filters onShowFilterChange={handleShowFilterChange} />
                </div>
            </CSSTransition>
            <Hero brojNocenja={brojNocenja} menuFilter={currentMenuFilter} />
        </main>
        </>
        
    );
};

export default HomePage;