import React, { useState, ReactNode } from 'react';
import NavbarFilterContext from './NavbarFilterContext';

interface NavbarFilterProviderProps {
    children: ReactNode;
}

export const NavbarFilterProvider: React.FC<NavbarFilterProviderProps> = ({ children }) => {
    const [brojNocenja, setBrojNocenja] = useState<number>(1);
    const [regija, setRegija] = useState<string>('Fleksibilan Sam');
    const [dolazak, setDolazak] = useState<string>('');
    const [odlazak, setOdlazak] = useState<string>('');
    const [gosti, setGosti] = useState<number>(1);

    const handleListingFilterChange = (regija: string, dolazak: string, odlazak: string, gosti: number) => {
        setRegija(regija);
        setDolazak(dolazak);
        setOdlazak(odlazak);
        setGosti(gosti);
    };

    return (
        <NavbarFilterContext.Provider value={{ brojNocenja, setBrojNocenja, regija, dolazak, odlazak, gosti, handleListingFilterChange }}>
            {children}
        </NavbarFilterContext.Provider>
    );
};