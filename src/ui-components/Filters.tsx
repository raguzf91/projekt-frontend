import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
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
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import './css/Filter.css';
import { toast } from 'react-toastify';
import AddRemove from './AddRemove';
import { Slider, Switch } from 'antd';
import { set } from '@cloudinary/url-gen/actions/variable';

interface FiltersProps {
    onShowFilterChange: (value: boolean) => void;
    onSubmitFilters: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({onShowFilterChange, onSubmitFilters}) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [rangeValue, setRangeValue] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
    const [spavaceSobe, setSpavaceSobe] = useState(0);
    const [kreveti, setKreveti] = useState(0);
    const [kupaonice, setKupaonice] = useState(0);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [addedZnacajke, setAddedZnacajke] = useState<{index:number, text: string}[]>([]);
    const [addedLokacije, setAddedLokacije] = useState<{index:number, text: string}[]>([]);
    const [addedVrsteSmjestaja, setAddedVrsteSmjestaja] = useState<{index:number, text: string}[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [uncheckAll, setUncheckAll] = useState(false);
    const [resetSlider, setResetSlider] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);
    const [minimalPrice, setMinimalPrice] = useState(0);
    const [maximumPrice, setMaximumPrice] = useState(10000);

    const scrollToTop = () => {
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    const handleFilterChange = () => {
        const showFilter = false;
        onShowFilterChange(showFilter);
    };

    const handleRangeChange = ({ min, max }: { min: number; max: number }) => {
        setMinimalPrice(min);
        setMaximumPrice(max);
        setResetSlider(false);
        console.log(resetSlider)
        console.log('Min:', min, 'Max:', max);
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

    useEffect(() => {
        // This effect will run whenever resetSlider changes
        if (resetSlider) {
            setResetSlider(false);
        }
    }, [resetSlider]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        if(checked) {
            setLanguages([...languages, value]);
        } else {
            setLanguages(languages.filter((lang) => lang !== value));
        };
        
    };

    const handleAddedZnacajke = (index: number) => {
        console.log("added znacajke: ", addedZnacajke)
        if(addedZnacajke.some(znacajka => znacajka.index === index)) {
            setAddedZnacajke(addedZnacajke.filter((znacajka) => znacajka.index !== index));
        } else {
            setAddedZnacajke([...addedZnacajke, { index, text: znacajke[index].text }]);
    };

    
    };

    const handleAddedLokacije = (index: number, text: string) => {
        console.log("added lokacije: ", addedLokacije)
       setAddedLokacije([{index, text}]);
    };

    const handleAddedVrsteSmjestaja = (index: number, text: string) => {
        console.log("added vrste smjestaja: ", addedVrsteSmjestaja)
        setAddedVrsteSmjestaja([{index, text}]);
    };

    
    useEffect(() => {
        if (uncheckAll) {
            setLanguages([]); // Uncheck all checkboxes
            setUncheckAll(false); // Reset the uncheckAll state
        }
    }, [uncheckAll]);
    

   


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    

    const izbrisiSve = () => {
        setActiveButton(null);
        setSpavaceSobe(0);
        setKreveti(0);
        setKupaonice(0);
        setResetSlider(true);
        setAddedZnacajke([]);
        setAddedLokacije([]);
        setAddedVrsteSmjestaja([]);
        setUncheckAll(true);
        console.log('Uncheck all drugi put: ' + uncheckAll);
        scrollToTop();
        toast.success('Filteri su uspješno izbrisani');
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


    const handleSubmitFilters = async () => {
        addedZnacajke.forEach((znacajka) => console.log(znacajka.text));
    
        const filters = {
            minimalPrice: minimalPrice ? minimalPrice : 0,
            maximalPrice: maximumPrice ? maximumPrice : 10000,
            rooms: [
                {"bedrooms" : spavaceSobe == 0 ? 0 : spavaceSobe},
                {"beds" : kreveti == 0 ? 0 : kreveti},
                {"bathrooms" : kupaonice == 0 ? 0 : kupaonice}
        ],
            amenities: addedZnacajke.length > 0 ? addedZnacajke.map(zn => zn.text) : [],
            location: addedLokacije[0]?.text || '',
            typeOfListing: addedVrsteSmjestaja[0]?.text || '',
            speaksLanguages: languages ? languages : [],
        };

        console.log("location", addedLokacije);
        console.log("amenities", addedZnacajke);
        console.log("type of listing", addedVrsteSmjestaja);
        
       onSubmitFilters(filters);
    };

    const handleMinimalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === '' || parseInt(e.target.value) < 0) {
            setMinimalPrice(0);
        } else if(parseInt(e.target.value) > 10000) { 
            setMinimalPrice(10000);
        } else if(parseInt(e.target.value) > maximumPrice) {
            setMinimalPrice(maximumPrice);
        }
        else {
            setMinimalPrice(parseInt(e.target.value));
        }
    };


    const handleMaximumPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === '' || parseInt(e.target.value) < 0) {
            setMaximumPrice(0);
        } else if(parseInt(e.target.value) > 10000) { 
            setMaximumPrice(10000);
        } else if(parseInt(e.target.value) < minimalPrice) {
            setMaximumPrice(minimalPrice);
        }
        else {
            setMaximumPrice(parseInt(e.target.value));
        }
    };




    return (
        <div className="filter-container  flex-col  max-w-lg h-5/6 bg-white justify-center items-center z-50 overflow-scroll p-4 mb-0 border-b-0 pb-0 pt-0">
            <div ref={topRef}></div>
            <div className="header flex mt-2 h-12 border-b-2 sticky top-0 bg-white z-50">
                <div className="w-10 flex ml-2 p-1.5 items-center justify-center cursor-pointer" onClick={handleFilterChange}>
                    <IoMdClose className="w-10 h-8 rounded-full hover:bg-slate-100" />
                </div>
                <div className="flex flex-grow justify-center items-center mr-12">
                    <h1 className="font-bold text-2xl text-center">Filtri</h1>
                </div>
            </div>
            
            <div className="raspon-cijena m-4 flex flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold">Raspon cijena</h2>
                <h3 className="text-base">Cijena noćenja uključujući naknade i poreze</h3>
                <Slider
                style={{ width: 300 }}
                    range
                    min={0}
                    max={10000}
                    defaultValue={[0, 10000]}
                    value={[minimalPrice, maximumPrice]}
                    onChange={(value) => handleRangeChange({ min: value[0], max: value[1] })}
                />
                <div className='flex justify-between items-center gap-4'>
                    <div className='flex flex-col justify-center items-center w-1/2 '>
                        <label htmlFor="minimalPrice">Minimalna cijena</label>
                        <input className='border-2 p-2 rounded-md w-1/2 hover:bg-gray-200 transition-all duration-75 text-center ' type="text" value={minimalPrice} onChange={handleMinimalPriceChange} />
                    </div>
                    <div className='flex flex-col justify-center items-center w-1/2 '>
                        <label htmlFor="minimalPrice">Maksimalna cijena</label>
                        <input className='border-2 p-2 rounded-md w-1/2 hover:bg-gray-200 transition-all duration-75 text-center ' type="text" value={maximumPrice} onChange={handleMaximumPriceChange} />
                    </div>
                </div>
            </div>
            <div className="sobe-kreveti m-4 flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold">Sobe i kreveti</h2>
                {sobeKreveti.map((item, index) => {
                    return (
                        <AddRemove key={index} index={index} item={item} handleMinus={handleSobeKrevetiMinus} handleAdd={handleSobeKrevetiAdd} />
                    );
                })}
            </div>
            <div className='sadrzaji m-4 flex-col justify-center items-center mb-0'>
                <h2 className='text-xl h-12 font-bold'>Sadržaji</h2>
                <h3 className="text-lg font-bold mb-2">Osnovni sadržaji</h3>
                <div className='grid grid-cols-2 gap-4'>
                        {znacajke.map((znacajka, index) => {
                            const isSelected = addedZnacajke.some(item => item.index === index);
                            return (
                                <div key={index} onClick={() => handleAddedZnacajke(index)} className={`${isSelected ? ' bg-slate-200' : ''} flex justify-center items-center rounded-3xl border-2 w-40 p-2 hover:border-slate-950 transition-all duration-100 cursor-pointer gap-y-4 gap-x-2`}>
                                    <div className='  flex justify-center items-center'>
                                        {React.cloneElement(znacajka.icon, { className: 'w-6 h-6' })}
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
                        const isSelected = addedLokacije.some(item => item.index === index);
                        return (
                            <div key={index} onClick={() => handleAddedLokacije(index, lokacije[index].text )} className={`${index == 0 ? 'w-56 text-nowrap' : ''} ${isSelected ? ' bg-slate-200' : ''} flex justify-center  items-center rounded-3xl border-2 w-40 p-2 hover:border-slate-950 transition-all duration-100 cursor-pointer gap-y-4 gap-4`}>
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
                        const isSelected = addedVrsteSmjestaja.some(item => item.index === index);
                        return (
                            <div key={index} onClick={() => handleAddedVrsteSmjestaja(index, vrsteSmjestaja.text)} className={`${index == 2 ? 'w-56 text-nowrap' : ''} ${isSelected ? ' bg-slate-200' : ''}  flex justify-center   items-center rounded-3xl border-2 w-40 p-2 hover:border-slate-950 transition-all duration-100 cursor-pointer gap-y-4 gap-4 `}>
                                <div className='  flex justify-center items-center'>
                                    {React.cloneElement(vrsteSmjestaja.icon, { className: 'w-8 h-8' })}
                                </div>
                                <p className="text-lg">{vrsteSmjestaja.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='jezici mt-4 border-b-2 border-b-slate-400 pb-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl h-12 font-bold'>Jezici koje domačin govori</h2>
                    <IoIosArrowDown onClick={toggleDropdown} className={`${dropdownVisible ? 'hidden ' : 'w-8 h-8 cursor-pointer'}`} />
                    <IoIosArrowUp onClick={toggleDropdown} className={`${dropdownVisible ? 'w-8 h-8 cursor-pointer ' : 'hidden'}`} />
                </div>
                {dropdownVisible && (

                    <div>
                        <form className='grid grid-cols-3'>
                            <div className='checkbox-container flex  items-center h-8 gap-3'>
                                <input  key={0} checked = {languages.includes("Hrvatski")}  className={`${(languages.includes("Hrvatski") && uncheckAll) ? '' : 'bg-white'}w-4 h-4 cursor-pointer`} type="checkbox" name="jezik" id="hrvatski" value="Hrvatski" onChange={(e) => { handleLanguageChange(e); }} />
                                <label className='w-8 h-8 text-xl cursor-pointer' htmlFor="hrvatski">Hrvatski</label><br />
                            </div>
                            <div className='checkbox-container flex items-center h-8 gap-3'>
                                <input  key={1}   checked = {languages.includes("Engleski")}  className={`${(languages.includes("Engleski") && uncheckAll) ? '' : 'bg-white'}w-4 h-4 cursor-pointer`} type="checkbox" name="jezik" id="engleski" value="Engleski" onChange={(e) => { handleLanguageChange(e);}} />
                                <label className='w-8 h-8 text-xl cursor-pointer' htmlFor="engleski">Engleski</label><br />
                            </div>
                            <div className='checkbox-container flex  items-center h-8 gap-3'>
                                <input  key={2}  checked = {languages.includes("Njemački")}  className={`${(languages.includes("Njemački") && uncheckAll) ? '' : 'bg-white'}w-4 h-4 cursor-pointer`} type="checkbox" name="jezik" id="njemački" value="Njemački" onChange={(e) => { handleLanguageChange(e);}} />
                                <label className='w-8 h-8 text-xl cursor-pointer' htmlFor="njemački">Njemački</label><br />
                            </div>
                            <div className='checkbox-container flex  items-center h-8 gap-3'>
                                <input  key={3}  checked = {languages.includes("Talijanski")}  className={`${(languages.includes("Talijanski") && uncheckAll) ? '' : 'bg-white'}w-4 h-4 cursor-pointer`} type="checkbox" name="jezik" id="talijanski" value="Talijanski" onChange={(e) => { handleLanguageChange(e);}} />
                                <label className='w-8 h-8 text-xl cursor-pointer' htmlFor="talijanski">Talijanski</label><br />
                            </div>
                            <div className='checkbox-container flex  items-center h-8 gap-3'>
                                <input  key={4}  checked = {languages.includes("Francuski")}  className={`${(languages.includes("Francuski") && uncheckAll) ? '' : 'bg-white'}w-4 h-4 cursor-pointer`} type="checkbox" name="jezik" id="francuski" value="Francuski" onChange={(e) => { handleLanguageChange(e);}} />
                                <label className='w-8 h-8 text-xl cursor-pointer' htmlFor="francuski">Francuski</label><br />
                            </div>
                            <div className='checkbox-container flex items-center h-8 gap-3'>
                                <input  key={5}  checked = {languages.includes("Španjolski")}  className={`${(languages.includes("Španjolski") && uncheckAll) ? '' : 'bg-white'}w-4 h-4 cursor-pointer`} type="checkbox" name="jezik" id="španjolski" value="Španjolski" onChange={(e) => { handleLanguageChange(e); }} />
                                <label className='w-8 h-8 text-xl cursor-pointer' htmlFor="španjolski">Španjolski</label><br />
                            </div>

                        </form>
                    </div>
                )
                
                
                }
            
            </div>
            <div className='izbrisi-sve mt-4 flex justify-center items-center sticky bottom-0 bg-white z-10 p-2'>
                <button onClick={izbrisiSve} className='text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 border-2 border-slate-950 hover:bg-slate-100'>Izbriši sve</button>
            </div>
            {(spavaceSobe > 0 || kreveti > 0 || kupaonice > 0 || minimalPrice > 0 || maximumPrice < 10000 || addedZnacajke.length > 0 || addedLokacije.length > 0 || addedVrsteSmjestaja.length > 0 || languages.length > 0 ) && (
            <div className='izbrisi-sve mt-4 flex justify-center items-center sticky bottom-0 bg-white z-10 p-2'>
                 <button onClick={handleSubmitFilters} className='text-lg bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-700 transition-all duration-100 text-white p-2 rounded-2xl'>Filtriraj</button>
             </div>
            )}
           
        </div>
    </div>
    );
};


export default Filters;