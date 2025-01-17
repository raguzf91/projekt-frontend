import { useState } from "react";
import Navbar from "../ui-components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarFilterContext from '../context/NavbarFilterContext';
const MainLayout = () =>  {
    const [showFilter, setShowFilter] = useState(false);
    const [brojNocenja, setBrojNocenja] = useState<number>(1);
    const [regija, setRegija] = useState<string>('');
    const [dolazak, setDolazak] = useState<string>('');
    const [odlazak, setOdlazak] = useState<string>('');
    const [gosti, setGosti] = useState<number>(1);
    
    const handleShowFilterChange = (value: boolean) => {
        setShowFilter(value);
    };

    const handleListingFilterChange = (regija: string, dolazak: string, odlazak: string, gosti: number) => {
        setRegija(regija);
        setDolazak(dolazak);
        setOdlazak(odlazak);
        setGosti(gosti);
    };
   

    return (
        <>  
        <NavbarFilterContext.Provider value={{ brojNocenja, setBrojNocenja, handleListingFilterChange, regija, dolazak, odlazak, gosti }}>
            <Navbar onShowFilterChange={handleShowFilterChange} setBrojNocenja={setBrojNocenja} handleListingFilterChange={handleListingFilterChange} />
            <Outlet />
            <ToastContainer />
        </NavbarFilterContext.Provider>
        </>
    )
}
export default MainLayout;