import MenuBar from "../ui-components/MenuBar";
import FooterMenu from "../ui-components/FooterMenu";
import Filters from "../ui-components/Filters";
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../ui-components/css/Filter.css'; // Import the CSS for CSSTransition animations
import Navbar from "../ui-components/Navbar";
import Hero from "../ui-components/Hero";
const HomePage = () => {
    const [showFilter, setShowFilter] = useState(false);

    const handleShowFilterChange = (value: boolean) => {
        setShowFilter(value);
    };

    return (
        <>
        <Navbar onShowFilterChange={handleShowFilterChange} />
        <main className="home-page relative">
            {showFilter && <div className="fixed inset-0 bg-black opacity-50"></div>}
            <MenuBar onShowFilterChange={handleShowFilterChange} />
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
            <Hero />
            
        </main>
        </>
        
    );
};

export default HomePage;