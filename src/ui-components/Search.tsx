import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoMdClose } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import svijet from '../assets/images/svijet.jpg';
import europa from '../assets/images/europa.jpg';
import azija from '../assets/images/azija.jpg';
import sjevernaAmerika from '../assets/images/sjeverna-amerika.jpg';
import juznaAmerika from '../assets/images/juzna-amerika.jpg';
import afrika from '../assets/images/afrika.jpg';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { DatePicker, Space, RangePicker } from "antd";
import type { DatePickerProps } from 'antd';
import type { GetProps } from 'antd';
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';
import AddRemove from './AddRemove';

interface SearchProps {
    toggleSearchContainer: (searchVisible : boolean) => void,
}
const Search: React.FC<SearchProps> = ({ toggleSearchContainer })  => {
    const isSmScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const [searchActive, setSearchActive] = useState(false);
    const [whereActive, setWhereActive] = useState(true);
    const [regija, setRegija] = useState('Fleksibilan sam');
    const [dolazak, setDolazak] = useState('');
    const [odlazak, setOdlazak] = useState('');
    const [whenActive, setWhenActive] = useState(false);
    const [whoActive, setWhoActive] = useState(false);
    const { RangePicker } = DatePicker;
    const [gosti, setGosti] = useState(0);
    const kontinenti = [
        {img: svijet, text: 'Fleksibilan sam'},
        {img: europa, text: 'Europa'},
        {img: azija, text: 'Azija'},
        {img: sjevernaAmerika, text: 'Sjeverna Amerika'},
        {img: juznaAmerika, text: 'Južna Amerika'},
        {img: afrika, text: 'Afrika'}
    ]

    const tkoKategorije = [
        { item: 'Gosti', value: gosti },
    ]

    const toggleWhere = (index : number) => {
        setRegija(kontinenti[index].text);
        setWhenActive(false);
        setWhereActive(!whereActive);
        toast.success('Odabrali ste regiju');
    };

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        
    };

     

    const onDateChange: DatePickerProps['onChange'] = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
            const dolazakString = dateStrings[0];
            const odlazakString = dateStrings[1];
            setDolazak(dolazakString);
            setOdlazak(odlazakString);
            console.log('Dolazak: ', dolazak, ', Odlazak: ', odlazak);
            
            toast.success('Odabrali ste datum putovanja');
        }
    };

    
    
        const handleGostiMinus = (index: number) => {
            if (gosti > 0) {
                setGosti(gosti - 1);
                console.log("gosti: "+gosti);
            } else {
                setGosti(0);
            }
        };


        const handleGostiPlus = (index: number) => {
            if(gosti > 12) {
                setGosti(12);
            } else {
                setGosti(gosti + 1);
                console.log("gosti: "+gosti);
            }
        };

        const handleIzbrisiSve = () => {
            setRegija('');
            setDolazak('');
            setOdlazak('');
            setGosti(0);
            setWhereActive(true);
            setWhenActive(false);
            setWhoActive(false);
            toast.success('Izbrisali ste filtere');
        };

        const handleSendSearch = () => {
            console.log('Regija: ', regija, ', Dolazak: ', dolazak, ', Odlazak: ', odlazak, ', Gosti: ', gosti);
            toggleSearchContainer(false);
        };
    
        


    return (
        <>
             <div className={`${isSmScreen ? 'fixed w-full h-full z-50 bg-gray-100 p-6 flex flex-col items-center gap-8 overflow-y-scroll ' : 'hidden'} ` }>
            <div className="absolute top-5 left-10 rounded-full border-2 border-gray-400 bg-white shadow-sm hover:shadow-lg" onClick={() => toggleSearchContainer(false)}>
                <IoMdClose className="w-8 h-8 p-2 rounded-full hover:bg-white cursor-pointer   " />
            </div>
            <h1 className='text-center text-2xl font-bold underline underline-offset-8 mb-8'>Odaberi smještaj</h1>
            <div onClick={() => {setWhereActive(true); setWhenActive(false); setWhoActive(false)}} className={`${whereActive ? 'hidden ' : 'flex justify-between items-center p-2 pr-4 pl-4 w-full h-16 bg-white rounded-3xl hover:shadow-lg cursor-pointer'} where-small`}>
                <p className='text-md text-gray-600'>Kamo</p>
                <p className='text-md text-slate-900 font-semibold'>{regija}</p>
            </div>
            <div className={`${whereActive ? 'flex flex-col p-2 pr-4 pl-4 w-full bg-white rounded-3xl shadow-lg mr-2 ml-2 gap-8 ' : 'hidden' } 'where-large`}>
                <h2 className='font-bold text-left text-2xl mt-4'>Kamo?</h2>
                <div className='pretrazi-odredista'>
                    <div onClick={toggleSearch} className='search flex  items-center  border-2 border-black shadow-lg hover:shadow-xl cursor-pointer hover:border-slate-950 transition-all duration-200 '>
                            <div className='search-icon w-11 h-11 flex justify-center items-center p-2'>
                                <FaSearch className=' h-4 w-4 text-black ' />
                            </div>
                            <div  className='search-bar ml-1 text-lg p-2 '>
                                <button onClick={toggleSearch}>Pretražite odredišta</button>
                            </div>
                           
                    </div>
                </div>
                <div className='grid grid-cols-3'>
                    {kontinenti.map((kontinent, index) => {
                        return (
                            <div key={index} onClick={() => toggleWhere(index)}  className='flex flex-col gap-2 items-center hover:bg-gray-200 p-3 rounded-3xl cursor-pointer'>
                                <img  className='w-30 h-28' src={kontinent.img} alt="kontinent" />
                                <p className='text-sm font-semibold'>{kontinent.text}</p>
                            </div>
                        )
                    })}
                </div>

            </div>

            <div onClick={() => {setWhenActive(true); setWhereActive(false); setWhoActive(false)}} className={`${whenActive ? 'hidden ' : 'flex justify-between items-center p-2 pr-4 pl-4 w-full h-16 bg-white rounded-3xl hover:shadow-lg cursor-pointer'} where-small`}>
                <p className='text-md text-gray-600'>Kada</p>
                <p className='text-md text-slate-900 font-semibold'>{`${(dolazak && odlazak === '') ? 'Odaberi datume' : `${dolazak.replace(/-/g, '.')} - ${odlazak.replace(/-/g, '.')}`}`}</p>
            </div>
            <div className={`${whenActive ? 'flex flex-col p-2 pr-4 pl-4 w-full bg-white rounded-3xl shadow-lg mr-2 ml-2 gap-8 ' : 'hidden' } 'where-large`}>
                <h2 className='font-bold text-left text-2xl mt-4'>Kada putujete?</h2>
                
                <Space direction="vertical">
                    <RangePicker
                      variant='outlined'
                      placeholder={dolazak && odlazak === '' ? ['Odaberi dolazak', 'Odaberi odlazak'] : [dolazak || 'Odaberi dolazak', odlazak || 'Odaberi odlazak']}
                      disabledDate={(current) => {
                        if (whenActive) {
                          return current && current < dayjs().endOf('day');
                        }
                        return current && (current < dayjs(dolazak, "DD-MM-YYYY").endOf('day') || current > dayjs(odlazak, "DD-MM-YYYY").endOf('day'));
                      }}
                      defaultValue={[dolazak === '' ? null : dayjs(odlazak, 'DD-MM-YYYY'), odlazak === '' ? null : dayjs(dolazak, 'DD-MM-YYYY')]}
                      format={{                                         
                        format: 'DD-MM-YYYY',
                        type: 'mask',
                      }}
                      onChange={onDateChange}
                    />
                </Space>  

            </div>
            <div onClick={() => {setWhoActive(true); setWhereActive(false); setWhenActive(false)}} className={`${whoActive ? 'hidden ' : 'flex justify-between items-center p-2 pr-4 pl-4 w-full h-16 bg-white rounded-3xl hover:shadow-lg cursor-pointer'} where-small`}>
                <p className='text-md text-gray-600'>Tko</p>
                <p className='text-md text-slate-900 font-semibold'>{(gosti === 0) ? 'Dodajte goste' : `Broj gostiju: ${gosti}`}</p>
            </div>
            <div className={`${whoActive ? 'flex flex-col p-2 pr-4 pl-4 w-full bg-white rounded-3xl shadow-lg mr-2 ml-2 gap-8 ' : 'hidden' } 'where-large`}>
                <h2 className='font-bold text-left text-2xl mt-4'>Tko?</h2>
                <div className='grid grid-cols-3'>
                    {tkoKategorije.map((item, index) => {
                            return (
                                <AddRemove key={index} index={index} item={item} handleMinus={handleGostiMinus} handleAdd={handleGostiPlus} />
                            );
                        })}
                </div>
            </div>
            <div className='footer flex justify-between items-center w-full border-2 p-3 rounded-2xl bg-white'>
                <p onClick={handleIzbrisiSve} className='underline underline-offset-4 text-md font-semibold text-black hover:bg-gray-200 hover:shadow-md cursor-pointer'>Izbriši sve</p>
                <div onClick={handleSendSearch} className='search-icon w-32 h-12 cursor-pointer flex justify-center items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-600  rounded-3xl '>
                    <FaSearch className=' h-8 w-8 p-1.5  text-white bg-inherit  rounded-3xl transition-colors duration-150 ' />
                    <p className='text-md text-white font-semibold pr-2'>Pretraži</p>
                </div>
            </div>
        </div>
        <div className={`${searchActive ? 'fixed w-screen h-screen z-50 bg-gray-100 p-6 flex flex-col items-center gap-8 overflow-y-scroll ' : 'hidden'} `}>
            <div className='search w-full flex  items-center  border-2 border-black shadow-lg hover:shadow-xl cursor-pointer hover:border-slate-950 transition-all duration-200 '>
                <div onClick={toggleSearch} className='back-icon flex justify-center items-center p-2'>
                    <FaArrowLeft className=' h-4 w-4 text-black ' />
                </div>
                <div  className='search-bar ml-1 text-lg p-2 flex-grow '>
                    <input placeholder='Pretražite odredišta' className='bg-inherit w-full '></input>
                </div>
                        
            </div>       
        </div>

        </>
       
    );
};
export default Search;