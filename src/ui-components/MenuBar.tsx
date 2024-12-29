import { GiWoodCabin } from "react-icons/gi";
import React, { useRef, useState } from 'react';
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
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import "./MenuBar.css";
const MenuBar = () => {
    /*
        handleClick function updates the clickedIndex state to the index of the clicked option
        and it checks if the current index is the same as the clickedIndex
    */
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
        }
    }
    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
        }
    }
    
    const handleClick = (index: number) => {
        setClickedIndex(index);
    }

    const options = [
        { id: 0, label: 'Kabina', icon: <GiWoodCabin className="" /> },
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
        <section className="menubar-section w-full flex justify-center  2xl:gap-8  2xl:mt-4 xl:mt-4">
            <div ref={containerRef} className="menubar-container overflow-x-auto flex 2xl:gap-4 xl:gap-2 m-4 ">
            <button onClick={handleScrollLeft} className="absolute top-40   transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-300">
                <IoIosArrowDropleft className="w-8 h-8 " />
            </button>
            {options.map((option, index) => (
                <div
                    key={option.id}
                    onClick={() => handleClick(index)}
                    className={`option flex-row cursor-pointer ml-4  transition-all duration-200 hover:border-b-4 ${clickedIndex === index ? 'border-b-4 border-b-gray-700' : 'border-b-gray-200'}`}
                >
                     {option.icon && React.cloneElement(option.icon, { className: `w-20 h-10 xl:w-14 xl:h-8` })}
                    <p className={`text-center text-sm font-semibold pb-1   transition-all duration-200 ${clickedIndex === index ? 'whitespace-normal break-words ' : 'whitespace-nowrap overflow-hidden'}`}>
                        {option.label}
                    </p>
                </div>
            ))}
            <button onClick={handleScrollRight} className="absolute right-36 top-40 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-300">
                <IoIosArrowDropright className="w-8 h-8 " />
            </button>
        </div>
        
        <div className="filter flex justify-center xl:w-40 xl:h-16 2xl:w-44 2xl:h-16 mt-5 mr-4 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-100 items-center content-center hover:border-4 hover:border-gray-700 gap-6">
            <IoIosOptions className="xl:w-8 xl:h-8 2xl:w-14 2xl:h-10" />
            <p className="text-center text-sm font-bold pb-1">Filteri</p>
        </div>
        </section>
        
    );
}
export default MenuBar;