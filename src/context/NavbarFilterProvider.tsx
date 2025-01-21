import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import dayjs from 'dayjs';
interface NavbarFilterContextProps {
    brojNocenja: number;
    setBrojNocenja: (value: number) => void;
    handleListingFilterChange: (regija: string, dolazak: string, odlazak: string, gosti: number) => void;
    regija: string;
    dolazak: string;
    odlazak: string;
    gosti: number;
    showFilterSmallSc: boolean;
    setShowFilterSmallSc: (value: boolean) => void;
    location: string;
    period: string;
    handleShowSmallScFilter: (value: boolean) => void;
}

const NavbarFilterContext = createContext<NavbarFilterContextProps | undefined>(undefined);

export const useNavbarFilter = () => {
    const context = useContext(NavbarFilterContext);
    if (!context) {
        throw new Error('useNavbarFilter must be used within a NavbarFilterProvider');
    }
    return context;
};

interface NavbarFilterProviderProps {
    children: ReactNode;
}



export const NavbarFilterProvider: React.FC<NavbarFilterProviderProps> = ({ children }) => {
    const [brojNocenja, setBrojNocenja] = useState<number>(1);
    const [regija, setRegija] = useState<string>('Fleksibilan Sam');
    const currentDay = dayjs().format('DD-MM-YYYY');
    const nextDay = dayjs().add(1, 'day').format('DD-MM-YYYY');
    const [dolazak, setDolazak] = useState<string>(currentDay);
    const [odlazak, setOdlazak] = useState<string>(nextDay);
    const [gosti, setGosti] = useState<number>(1);
    const [showFilterSmallSc, setShowFilterSmallSc] = useState<boolean>(false);
    const [location, setLocation] = useState<string>('');
   

    const handleShowSmallScFilter = (value: boolean) => {
        setShowFilterSmallSc(value);
    };

    const stayingPeriod = (dolazak: string, odlazak: string) => {
        const dolazakMonth = dolazak.split('-')[1];
        const dolazakDay = dolazak.split('-')[0];
        const dolazakYear = dolazak.split('-')[2];

        const odlazakMonth = odlazak.split('-')[1];
        const odlazakDay = odlazak.split('-')[0];
        const odlazakYear = odlazak.split('-')[2];
       

        if (dolazakMonth === odlazakMonth && dolazakYear === odlazakYear) {
            return `${dolazakDay} - ${odlazakDay}.${dolazakMonth}`;
        } else if (dolazakMonth !== odlazakMonth && dolazakYear === odlazakYear) {
            return `${dolazakDay}.${dolazakMonth} - ${odlazakDay}.${odlazakMonth} `;
        } else if (dolazakMonth === odlazakMonth && dolazakYear !== odlazakYear) {
            return `${dolazakDay} - ${odlazakDay}.${dolazakMonth}.${odlazakYear}`;
        } else {
            return `${dolazakDay}.${dolazakMonth}.${dolazakYear} - ${odlazakDay}.${odlazakMonth}.${odlazakYear}`;
        }
    };

    const [period, setPeriod] = useState<string>(stayingPeriod(currentDay, nextDay));


    const handleListingFilterChange = (regija: string, dolazak: string, odlazak: string, gosti: number) => {
        console.log("filter change change: ");
        setRegija(regija);
        console.log("asdaa " + regija);
        if(dolazak === ''){
            setDolazak(dayjs().format('DD-MM-YYYY'));
            
        }
        if(odlazak === ''){
            setOdlazak(dayjs().add(1, 'day').format('DD-MM-YYYY'));
        }
        setDolazak(dolazak);
        setOdlazak(odlazak);
        setGosti(gosti);
        setPeriod(stayingPeriod(dolazak, odlazak));
        setLocation(regija);

    };
    

    return (
        <NavbarFilterContext.Provider value={{ brojNocenja, handleShowSmallScFilter, setBrojNocenja, regija, dolazak, odlazak, gosti, handleListingFilterChange, showFilterSmallSc, setShowFilterSmallSc, location, period }}>
            {children}
        </NavbarFilterContext.Provider>
    );
};

export default NavbarFilterContext;