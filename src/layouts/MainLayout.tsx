import React from "react";
import Navbar from "../ui-components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Filters from "../ui-components/Filters";
import { CSSTransition } from 'react-transition-group';
import { SearchParamsProvider } from '../context/SearchParamsContext';
import { useNavbarFilter } from '../context/NavbarFilterProvider';
import FooterMenu from "../ui-components/FooterMenu";
const MainLayout = () => {
    const { setBrojNocenja, handleShowSmallScFilter,  gosti, showFilterSmallSc } = useNavbarFilter();
    



    return (
        <SearchParamsProvider>
            <CSSTransition
                in={showFilterSmallSc}
                timeout={300}
                classNames="filter"
                unmountOnExit
            >
                <div className="fixed inset-0 flex items-center justify-center z-40 ">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <Filters onShowFilterChange={handleShowSmallScFilter} />
                </div>
            </CSSTransition>

            <Navbar
                onShowFilterChange={handleShowSmallScFilter}
                setBrojNocenja={setBrojNocenja}
                numberOfGuests={gosti}
            />
            <Outlet />
            <FooterMenu/>
            <ToastContainer />
        </SearchParamsProvider>
    );
};

export default MainLayout;