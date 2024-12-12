import { GiWoodCabin } from "react-icons/gi";
import React, { useState } from 'react';
import { GiIsland } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import { PiFarmFill } from "react-icons/pi";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiPanorama } from "react-icons/pi";
import { GiPalmTree } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { MdVilla } from "react-icons/md";
import { PiCastleTurret } from "react-icons/pi";
import { IoIosOptions } from "react-icons/io";
import { LuFlame } from "react-icons/lu";
const MenuBar = () => {
    /*
        handleClick function updates the clickedIndex state to the index of the clicked option
        and it checks if the current index is the same as the clickedIndex
    */
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setClickedIndex(index);
    }

    const options = [
        { id: 0, label: 'Kabina', icon: <GiWoodCabin /> },
        { id: 1, label: 'Otoci', icon: <GiIsland /> },
        { id: 2, label: 'Izvanredni bazeni', icon: <FaSwimmingPool /> },
        { id: 3, label: 'Na farmi', icon: <PiFarmFill /> },
        { id: 4, label: 'Skijanje', icon: <FaSkiing /> },
        { id: 5, label: 'Novo', icon: <MdOutlineWatchLater />},
        { id: 6, label: 'Nevjerovatni pogledi', icon: <PiPanorama /> },
        { id: 7, label: 'Tropski smještaji', icon: <GiPalmTree /> },
        { id: 8, label: 'Male kuće', icon: <FaHouse/> },
        { id: 9, label: 'Vile', icon: <MdVilla /> },
        { id: 10, label: 'Povijesni smještaji', icon: <PiCastleTurret /> },
        { id: 11, label: 'Popularno', icon: <LuFlame /> }

    ];

    return (
        <section className="menubar-section flex gap-36 ">
            <div className="menubar-container flex gap-14 m-4 ">
            {options.map((option, index) => (
                <div
                    key={option.id}
                    onClick={() => handleClick(index)}
                    className={`option flex-row w-20 cursor-pointer ml-4 transition-all duration-200 hover:border-b-4 ${clickedIndex === index ? ' border-b-4 border-b-gray-700' : 'border-b-gray-200'}`}
                >
                    {option.icon && React.cloneElement(option.icon, { className: "w-20 h-10" })}
                    <p className={`text-center text-sm font-semibold pb-1  transition-all duration-200 ${clickedIndex === index ? 'whitespace-normal break-words ' : 'whitespace-nowrap overflow-hidden'}`}>
                        {option.label}
                    </p>
                </div>
            ))}
        </div>
        <div className="filter flex justify-center w-44 h-16 mt-5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-100 items-center content-center hover:border-4 hover:border-gray-700 gap-6">
            <IoIosOptions className="w-14 h-10" />
            <p className="text-center text-sm font-bold pb-1">Filteri</p>
        </div>
        </section>
        
    );
}
export default MenuBar;