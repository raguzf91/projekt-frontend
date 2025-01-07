import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import Slider from './Slider';
import { FaWifi } from "react-icons/fa";
import { TbToolsKitchen } from "react-icons/tb";
import { FaRegSnowflake } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { LuWashingMachine } from "react-icons/lu";
import { BiSolidDryer } from "react-icons/bi";
import { TbTemperatureSun } from "react-icons/tb";
import { PiCity } from "react-icons/pi";
import { FaUmbrellaBeach } from "react-icons/fa";
import { FaSkiing } from "react-icons/fa";
import { LuHouse } from "react-icons/lu";
import { PiBuildingApartment } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";

const Filters = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [rangeValue, setRangeValue] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
    const [spavaceSobe, setSpavaceSobe] = useState(0);
    const [kreveti, setKreveti] = useState(0);
    const [kupaonice, setKupaonice] = useState(0);

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    const handleRangeChange = (min: number, max: number) => {
        setRangeValue({ min, max });
    };

    const handleSobeKrevetiMinus = (index: number) => {
        if (index === 0 && spavaceSobe > 0) {
            setSpavaceSobe(spavaceSobe - 1);
        } else if (index === 1 && kreveti > 0) {
            setKreveti(kreveti - 1);
        } else if (index === 2 && kupaonice > 0) {
            setKupaonice(kupaonice - 1);
        }
    };

    const handleSobeKrevetiAdd = (index: number) => {
        if (index === 0) {
            setSpavaceSobe(spavaceSobe + 1);
        } else if (index === 1) {
            setKreveti(kreveti + 1);
        } else if (index === 2) {
            setKupaonice(kupaonice + 1);
        }
    };

    const sobeKreveti = [
        { item: 'Spavaće sobe', value: spavaceSobe },
        { item: 'Kreveti', value: kreveti },
        { item: 'Kupaonice', value: kupaonice },
    ];

    const znacajke = [
        {icon: <FaWifi />, text: 'Wi-Fi'},
        {icon: <TbToolsKitchen />, text: 'Kuhinja'},
        {icon: <FaRegSnowflake />, text: 'Klima-uređaj'},
        {icon: <FaTv />, text: 'TV'},
        {icon: <LuWashingMachine />, text: 'Perilica'},
        {icon: <BiSolidDryer />, text: 'Sušilica'},
        {icon: <TbTemperatureSun />, text: 'Grijanje'}

    ];

    const lokacije = [
        {icon: <PiCity /> , text: 'Centar grada'},
        {icon: <FaUmbrellaBeach />, text: 'Plaža'},
        {icon: <FaSkiing /> , text: 'Skijalište'},
    ];

    const vrsteSmjestaja = [
        {icon: <LuHouse />, text: 'Kuća'},
        {icon: <PiBuildingApartment />, text: 'Stan'},
        {icon: <IoPeopleOutline />, text: 'Dijeljenje stana'},
    ];

    return (
        <div className="filter-container flex-col w-full justify-center items-center">
            <div className="header flex mt-2 h-12 border-b-2">
                <div className="w-10 flex ml-2 p-1.5 items-center justify-center cursor-pointer">
                    <IoMdClose className="w-10 h-8 rounded-full hover:bg-slate-100" />
                </div>
                <div className="flex flex-grow justify-center items-center mr-12">
                    <h1 className="font-bold text-2xl text-center">Filtri</h1>
                </div>
            </div>
            <div className="vrste-smjestaja m-4 flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold mb-4">Vrste smještaja</h2>
                <div className="flex items-center justify-between rounded-3xl border-2 p-2">
                    <button
                        className={`text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 ${
                            activeButton === 'Sve vrste'
                                ? 'border-slate-950 border-2'
                                : 'hover:bg-slate-100'
                        }`}
                        onClick={() => handleButtonClick('Sve vrste')}
                    >
                        Sve vrste
                    </button>
                    <button
                        className={`text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 ${
                            activeButton === 'Soba'
                                ? 'border-slate-950 border-2'
                                : 'hover:bg-slate-100'
                        }`}
                        onClick={() => handleButtonClick('Soba')}
                    >
                        Soba
                    </button>
                    <button
                        className={`text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 ${
                            activeButton === 'Cijeli prostor'
                                ? 'border-slate-950 border-2'
                                : 'hover:bg-slate-100'
                        }`}
                        onClick={() => handleButtonClick('Cijeli prostor')}
                    >
                        Cijeli prostor
                    </button>
                </div>
            </div>
            <div className="raspon-cijena m-4 flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold">Raspon cijena</h2>
                <h3 className="text-base">Cijena noćenja uključujući naknade i poreze</h3>
                <div>
                    <Slider min={rangeValue.min} max={rangeValue.max} currencyText="€" onChange={() => handleRangeChange} />
                </div>
            </div>
            <div className="sobe-kreveti m-4 flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold">Sobe i kreveti</h2>
                {sobeKreveti.map((item, index) => {
                    return (
                        <div key={index} className="flex justify-between items-center ml-4 mr-4">
                            <p className="text-lg font-semibold">{item.item}</p>
                            <div className="flex gap-4 justify-center items-center">
                                <CiCircleMinus onClick={() => handleSobeKrevetiMinus(index)} className={`w-8 h-8 cursor-pointer ${item.value === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:border-2 hover:border-slate-950'}`} />
                                <p className="text-lg">{item.value}</p>
                                <CiCirclePlus onClick={() => handleSobeKrevetiAdd(index)} className="w-8 h-8 cursor-pointer hover:border-2 hover:border-slate-950" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='sadrzaji m-4 flex-col justify-center items-center border-b-2 pb-8'>
                <h2 className='text-xl h-12 font-bold'>Sadržaji</h2>
                <h3 className="text-lg font-bold mb-2">Osnovni sadržaji</h3>
                <div className='grid grid-cols-4 gap-2'>
                        {znacajke.map((znacajka, index) => {
                            return (
                                <div key={index} className='flex justify-center items-center rounded-3xl border-2 w-40 p-2 hover:border-slate-950 transition-all duration-100 cursor-pointer gap-y-4 gap-x-2'>
                                    <div className='  flex justify-center items-center'>
                                        {React.cloneElement(znacajka.icon, { className: 'w-8 h-8' })}
                                    </div>
                                    <p className='text-lg '>{znacajka.text}</p>
                                </div>
                            );
                        })}
                    
                </div>
                <div className='lokacija mt-4 border-b-2 border-b-slate-400 pb-8'>
                    <h2 className='text-xl h-12 font-bold'>Lokacije</h2>
                    <div className='flex items-center gap-4'>
                    {lokacije.map((lokacija, index) => {
                        return (
                            <div key={index} className='flex justify-center  items-center rounded-3xl border-2 w-40 p-2 hover:border-slate-950 transition-all duration-100 cursor-pointer gap-y-4 gap-4'>
                                <div className='  flex justify-center items-center'>
                                    {React.cloneElement(lokacija.icon, { className: 'w-8 h-8' })}
                                </div>
                                <p className='text-lg '>{lokacija.text}</p>
                            </div>
                        );
                    })}

                    </div>
                    
                </div>

                <div className='vrsta-smjestaja mt-4 border-b-2 border-b-slate-400 pb-8'>
                <h2 className='text-xl h-12 font-bold'>Vrste smještaja</h2>
                    <div className='flex items-center gap-4'>
                    {vrsteSmjestaja.map((vrsteSmjestaja, index) => {
                        return (
                            <div key={index} className='flex justify-center  items-center rounded-3xl border-2 w-40 p-2 hover:border-slate-950 transition-all duration-100 cursor-pointer gap-y-4 gap-4'>
                                <div className='  flex justify-center items-center'>
                                    {React.cloneElement(vrsteSmjestaja.icon, { className: 'w-8 h-8' })}
                                </div>
                                <p className='text-lg '>{vrsteSmjestaja.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Filters;