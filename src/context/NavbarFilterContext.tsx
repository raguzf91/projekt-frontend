import { createContext, useContext } from 'react';

interface NavbarFilterContextProps {
    brojNocenja: number;
    setBrojNocenja: (value: number) => void;
    handleListingFilterChange: (regija: string, dolazak: string, odlazak: string, gosti: number) => void;
    regija: string;
    dolazak: string;
    odlazak: string;
    gosti: number;
}

const NavbarFilterContext = createContext<NavbarFilterContextProps | undefined>(undefined);

export const useNavbarFilter = () => {
    const context = useContext(NavbarFilterContext);
    if (!context) {
        throw new Error('useNavbarFilter must be used within a NavbarFilterProvider');
    }
    return context;
};

export default NavbarFilterContext;