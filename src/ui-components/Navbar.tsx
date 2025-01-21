import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import Login from './Login';
import Signup from './Signup';
import { CSSTransition } from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import { IoIosOptions } from "react-icons/io";
import svijet from '../assets/images/svijet.jpg';
import europa from '../assets/images/europa.jpg';
import azija from '../assets/images/azija.jpg';
import sjevernaAmerika from '../assets/images/sjeverna-amerika.jpg';
import juznaAmerika from '../assets/images/juzna-amerika.jpg';
import afrika from '../assets/images/afrika.jpg';
import { DatePicker, Space, Carousel } from "antd";
import type { DatePickerProps } from 'antd';
import type { GetProps } from 'antd';
import AddRemove from './AddRemove';
import dayjs from 'dayjs';
import Search from './Search';
import "./css/Navbar.css"
import {toast} from 'react-toastify';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNavbarFilter } from '../context/NavbarFilterProvider';

interface NavbarProps {
    onShowFilterChange: (value: boolean) => void;
    setBrojNocenja: (value: number) => void;
    numberOfGuests: number;
}
const Navbar : React.FC<NavbarProps> = ({onShowFilterChange, setBrojNocenja}) => {
    const { brojNocenja, regija, dolazak, odlazak, gosti, handleShowSmallScFilter, showFilterSmallSc, setShowFilterSmallSc, handleListingFilterChange, location, period } = useNavbarFilter();
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [searchActive, setSearchActive] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const whereFieldRef = useRef<HTMLInputElement>(null);
    const whoFieldRef = useRef<HTMLInputElement>(null);
    const [whereActive, setWhereActive] = useState(false);
    const [whoActive, setWhoActive] = useState(false);
    const [gostiRef, setGostiRef] = useState(gosti);
    const [regijaRef, setRegijaRef] = useState(regija);
    const currentDate = dayjs().format('DD-MM-YYYY'); // Get the current date
    const nextDay = dayjs().add(1, 'day').format('DD-MM-YYYY'); // Get the day after the current date
    const [dolazakRef, setDolazakRef] = useState(dolazak);
    const [odlazakRef, setOdlazakRef] = useState(odlazak);
    const [searchParams, setSearchParams] = useSearchParams();
    const navbarRef = useRef<HTMLDivElement>(null);
    const datepickerRef = useRef<HTMLDivElement>(null);
    

    const handleClickOutside = (event: MouseEvent) => {
        if (
            navbarRef.current && !navbarRef.current.contains(event.target as Node) &&
            datepickerRef.current && !datepickerRef.current.contains(event.target as Node)
        ) {
            console.log("outside click");
            setSearchActive(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    



    const toggleLogin = () => {
        setLoginVisible(!loginVisible);
    }

    const toggleRegister = () => {
        setRegisterVisible(!registerVisible);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        
    };

    const handleFilterChange = () => {
        
        const showFilter = true;
        onShowFilterChange(showFilter);
    };

    const handleSearchActive = () => {
        setSearchActive(true);
        
    };

    const handleWhereActive = () => {
        setWhereActive(!whereActive);
        
    };

    const handleWhoActive = () => {
        setWhoActive(!whoActive);
    };

    const handleGostiPlus = (index: number) => {
        if(gostiRef > 12) {
            setGostiRef(12);
        } else {
            setGostiRef(gostiRef + 1);
           
        }
    };

    const handleWhereChange = (index: number) => {
        setRegijaRef(kontinenti[index].text); 
        toast.success('Odabrali ste regiju: '+kontinenti[index].text);
        setWhereActive(false);
        
    };

    const handleGostiMinus = (index: number) => {
        if (gostiRef > 0) {
            setGostiRef(gostiRef - 1);
        } else {
            setGostiRef(0);
        }
    };

    

    const ismdScreen = useMediaQuery({ query: '(max-width: 1280px)' });
    const isSmScreen = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);






    const kontinenti = [
        {img: svijet, text: 'Fleksibilan sam'},
        {img: europa, text: 'Europa'},
        {img: azija, text: 'Azija'},
        {img: sjevernaAmerika, text: 'Sjeverna Amerika'},
        {img: juznaAmerika, text: 'Južna Amerika'},
        {img: afrika, text: 'Afrika'}
    ]

    const tkoKategorije = [
        { item: 'Gosti', value: gostiRef },
    ]
    
    const onDolazakChange: DatePickerProps['onChange'] = (date, dateString) => {
            if (typeof dateString === 'string') {
                setDolazakRef(dateString);
                toast.success('Odabrali ste dolazak: '+dateString.replace(/-/g, '.'));
            }

            console.log("dolazakDate: "+date);
            console.log("dolazakDateString: "+dateString);
            console.log("dolazakRef: "+dolazakRef);
          };

    const onOdlazakChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (typeof dateString === 'string') {
            setOdlazakRef(dateString);
            toast.success('Odabrali ste odlazak: '+dateString.replace(/-/g, '.'));
        }
        console.log("odlazakDate: "+date);
        console.log("odlazakDateString: "+dateString);
        console.log("dolazakRef: "+odlazakRef);
    };

    type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

    const disableDolazak: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current > dayjs(odlazakRef, "DD-MM-YYYY").endOf('day');
      };

      const disableOdlazak: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs(dolazakRef, "DD-MM-YYYY").endOf('day');
      };

    const handleSendSearch = () => {
        handleListingFilterChange(regijaRef, dolazakRef, odlazakRef, gostiRef);
        setSearchActive(false);
        setWhereActive(false);
        setWhoActive(false);
        toast.success('Pretraga poslana!');
    };

    const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 486px)' });


    useEffect(() => {
        const calculateBrojNocenja = () => {
            const dolazakDate = dayjs(dolazakRef, 'DD-MM-YYYY');
            const odlazakDate = dayjs(odlazakRef, 'DD-MM-YYYY');
            const brojNocenja = odlazakDate.diff(dolazakDate, 'day');
            return brojNocenja;
    
        };
        const brojNocenja = calculateBrojNocenja();
        setBrojNocenja(brojNocenja);
    }, [dolazakRef, odlazakRef, setBrojNocenja]);

    const navigate = useNavigate();
    const handleNavigateToHome = () => {
        setRegijaRef('');
        setDolazakRef(dayjs().format('DD-MM-YYYY'));
        setOdlazakRef(dayjs().add(1, 'day').format('DD-MM-YYYY'));
        setGostiRef(1);

        // Use a callback to ensure state updates are applied before calling handleListingFilterChange
        setTimeout(() => {
            handleListingFilterChange('Fleksibilan sam', dayjs().format('DD-MM-YYYY'), dayjs().add(1, 'day').format('DD-MM-YYYY'), 1);
            setSearchParams({});
            navigate("/", { replace: true });
        }, 0);
    };


    return (
        <section ref={navbarRef} className="relative">
            {(loginVisible || registerVisible) && (
                
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
            <nav className='navbar'>
                <div className={`navbar-container ${isSmScreen ? 'hidden' : 'flex md:flex-col justify-between items-center p-4 2xl:mr-4 2xl:p-8 border border-b-gray-500'}`}>
                   
                    <div className='upper-navbar w-full flex justify-between items-center '>
                        <img onClick={handleNavigateToHome} src={logo} alt="logo" className='2xl:w-48 xl:w-32 md:w-32 md:mr-6 cursor-pointer ' />
                        {!ismdScreen && 
                            <div onClick={handleSearchActive} className={`not-active-navbar ${searchActive ? 'hidden' : 'flex justify-between items-center relative pl-6 xl:ml-18 2xl:ml-24 2xl:mr-24 3xl:ml-24 3xl:mr-24 rounded-3xl border-2 hover:shadow-xl cursor-pointer w-1/3 2xl:w-1/2 h-12 ml-8 '}`}>
                            <div className='left-navbar flex items-center justify-center'>
                                <p className='text-lg font-semibold'>{`${location === "" ? 'Bilo gdje' : location}`}</p>
                            </div>
                            <div className="border-l-4 h-8 2xl:h-12"></div>
                            <div className='middle-navbar'>
                            <p className='font-semibold text-lg'>{`${period === "" ? 'Bilo kada' : `Odabrani period: ${period}`}`}</p>
                            </div>
                            <div className="border-l-4 h-8 2xl:h-12"></div>
                            <div className='right-navbar'>
                                <p className='font-semibold text-lg'>{`${gostiRef === 1 ? 'Unesite broj gostiju' : `Broj gostiju: ${gostiRef}` }`}</p>
                            </div>
                            <div  className='search-icon cursor-pointer'>
                                    <FaSearch className={`${searchActive ? 'hidden' : ' h-10 w-10 2xl:w-12 2xl:h-12 2xl:p-3 p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-3xl  transition-colors duration-150'} `} />
                                    
                            </div>
                    </div>
                        }
                  
                    {searchActive && 

                    <CSSTransition
                        in={searchActive}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                    
                    <div className={`middle-navbar ${ismdScreen ? 'hidden' : 'relative xl:ml-18 2xl:ml-24 2xl:mr-24 3xl:ml-24 3xl:mr-24 rounded-3xl border flex items-center '}`}>
                    <div onClick={() => { handleSearchActive(); handleWhereActive(); }} className="input-field p-2 flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2">
                        <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                        <input type="text" id="default-input-1" placeholder={`${regijaRef === '' ? 'Pretraži destinaciju' : regijaRef}`} className="outline-none 2xl:text-md rounded-3xl   border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                        
                    </div>
                    <div ref={whereFieldRef} className={`${(whereActive && searchActive) ? 'where-container absolute top-full left-0 bg-white shadow-sm z-10 flex flex-col gap-2 p-4' : 'hidden'}`}>
                            <h2 className='text-lg text-black font-semibold'>Pretraživanje po regijama</h2>
                            <div className='grid grid-cols-3'>
                                {kontinenti.map((kontinent, index) => {
                                    return (
                                        <div key={index} onClick={(e) => { e.stopPropagation(); handleWhereChange(index); }} className='flex flex-col gap-2 items-center hover:bg-gray-200 p-3 rounded-3xl cursor-pointer z-50'>
                                            <img  className='w-30 h-28' src={kontinent.img} alt="kontinent" />
                                            <p className='text-sm font-semibold'>{kontinent.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                    </div>
                    
                    <div className="border-l-4 h-8 2xl:h-12"></div>
                    <div ref={datepickerRef} onMouseDown={(e) => e.stopPropagation()} onClick={() => { handleSearchActive();}} className='input-field p-2 ml-2  flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2'>
                        <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Dolazak</label>
                        <Space   direction="vertical">
                              <DatePicker
                                onClick={() => { setWhoActive(false); setWhereActive(false); }}
                                defaultValue={dayjs(currentDate, 'DD-MM-YYYY')}
                                className='dolazak-date'
                                variant='borderless'
                                placeholder='Odaberi dolazak'
                                value={dolazakRef === '' ? null : dayjs(dolazakRef, 'DD-MM-YYYY')}
                                disabledDate={disableDolazak}
                                format={{                                         
                                  format: 'DD-MM-YYYY',
                                  type: 'mask',
                                }}
                                onChange={onDolazakChange}
                              />
                        </Space>
                    </div>
                    
                    <div className="border-l-4 h-8 2xl:h-12"></div>
                    <div ref={datepickerRef} onMouseDown={(e) => e.stopPropagation()} onClick={handleSearchActive} className='input-field p-2 ml-2  flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2 '>
                        <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Odlazak</label>
                        <Space direction="vertical">
                              <DatePicker
                                onClick={() => { setWhoActive(false); setWhereActive(false); }}
                                defaultValue={dayjs(nextDay, 'DD-MM-YYYY')}
                                variant='borderless'
                                placeholder='Odaberi odlazak'
                                disabledDate={disableOdlazak}
                                value={odlazakRef === '' ? null : dayjs(odlazakRef, 'DD-MM-YYYY') }
                                format={{                                         
                                  format: 'DD-MM-YYYY',
                                  type: 'mask',
                                }}
                                onChange={onOdlazakChange}
                              />
                        </Space>        
                    </div>
                    <div className="border-l-4 h-8 2xl:h-12"></div>
                    <div  onClick={() => { handleSearchActive(); handleWhoActive(); }} className='input-field  p-2 ml-2 flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2'>
                        <label htmlFor="default-input-3" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Tko</label>
                        <input type="text" id="default-input-3" placeholder={`${gostiRef === 1 ? 'Unesi broj gostiju' : `Odabrali ste: ${gostiRef} gosta`}`} className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div ref={whoFieldRef}  className={`${(whoActive && searchActive) ? 'who-container absolute top-full right-36 bg-white shadow-sm z-10 flex flex-col gap-2 p-4' : 'hidden'}`}>
                    
                            {tkoKategorije.map((item, index) => {
                                    return (
                                        <AddRemove key={index} index={index} item={item} handleMinus={handleGostiMinus} handleAdd={handleGostiPlus} />
                                    );
                                })}

                    </div>
                   
                    <div className='input-field p-2  flex flex-col'>
                        <div  className='search-icon cursor-pointer'>
                            <FaSearch className={`${searchActive ? 'hidden' : ' h-10 w-10 2xl:w-12 2xl:h-12 2xl:p-3 p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-3xl 2xl:mr-6 transition-colors duration-150'} `} />
                            <CSSTransition
                                        in={searchActive}
                                        timeout={300}
                                        classNames="fade"
                                        unmountOnExit
                                    >
                                        <div onClick={handleSendSearch} className={`${searchActive ? 'search-icon w-32 h-12 cursor-pointer flex justify-center items-center gap-0 bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-600  rounded-3xl ' : 'hidden'}`}>
                                            <FaSearch className=' h-8 w-8 p-1.5  text-white bg-inherit  rounded-3xl transition-colors duration-150 ' />
                                            <p className='text-md text-white font-semibold pr-2'>Pretraži</p>
                                        </div>
                                    </CSSTransition>
                            
                        </div>
                    </div>
                </div>
                 
             </CSSTransition>
                        
                    }
                        
                        <div className='right-navbar flex gap-3 mr-3 2xl:gap-4 2xl:mr-4'>
                            <div className='2xl:w-40 2xl:h-14 md:w-36 md:h-12 mr-6 hover:bg-gray-100 cursor-pointer rounded-xl flex items-center content-center justify-center'>
                                <a className='upper-right-navbar-text text-md xl:text-lg font-semibold text-center'>Airbnb tvoj dom</a>
                            </div>
                            <div className='relative cursor-pointer flex gap-2 w-24 rounded-2xl hover:shadow-md justify-center items-center' onClick={toggleDropdown} ref={dropdownRef}>
                                <IoMdMenu className=' 2xl:w-16 2xl:h-16  w-7 h-7' />
                                <div className='profile-icon relative'>
                                    <CgProfile className='md:w-7 md:h-7 xl:w-9 xl:h-9 2xl:w-14 2xl:h-14 2xl:p-2' />
                                </div>
                                {dropdownVisible && (
                                    <div id="dropdownInformation" className="absolute right-0 top-8 mt-4 z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="text-md border-b-2 text-gray-900 dark:text-white w-full">
                                            <a href="#" onClick={toggleRegister} className="block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Registracija</a>
                                            <a href="#" onClick={toggleLogin} className="block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Prijava</a>
                                        </div>
                                        <ul className="py-2 text-md text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                            <li>
                                                <a href="#" className="block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                            </li>
                                        </ul>
                                        <div className="py-2">
                                            <a href="#" className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {ismdScreen && 
                        <div onClick={handleSearchActive} className={`not-active-navbar ${(searchActive) ? 'hidden' : `flex justify-between items-center relative   2xl:mr-24  3xl:mr-24 rounded-3xl border-2 hover:shadow-xl cursor-pointer w-1/2  h-12  shadow-md `}`}>
                        <div className='left-navbar flex items-center justify-center'>
                            <p className='pl-8 text-lg font-bold'>{`${location === "" ? 'Bilo gdje' : location}`}</p>
                        </div>
                        <div className="border-l-4 h-8 2xl:h-12"></div>
                        <div className='middle-navbar'>
                        <p>{`${period === "" ? 'Bilo kada' : period}`}</p>
                        </div>
                        <div className="border-l-4 h-8 2xl:h-12"></div>
                        <div className='right-navbar'>
                            <p>{`${gostiRef === 0 ? 'Unesite broj gostiju' : `Broj gostiju: ${gostiRef}`}`}</p>
                        </div>
                        <div  className='search-icon cursor-pointer'>
                                <FaSearch className={`${searchActive ? 'hidden' : ' h-10 w-10 2xl:w-12 2xl:h-12 2xl:p-3 p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-3xl  transition-colors duration-150'} `} />
                                
                        </div>
                </div>
                    }
                    
                    {searchActive && 
                        <div className={`lower-navbar ${searchActive ? 'md:w-4/5' : ''} ${ismdScreen ? 'md:w-3/5 mt-4 xl:ml-18 2xl:ml-24 rounded-3xl border  flex justify-between items-center space-x-2' : 'hidden'}`}>
                        <div onClick={() => { handleSearchActive(); handleWhereActive();}} className='input-field p-2 w-1/5  flex flex-col  hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2'>
                            <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                            <input type="text" id="default-input-1" placeholder={`${regijaRef === '' ? 'Pretraži destinaciju' : regijaRef}`} className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                        </div>
                        <div ref={whereFieldRef} className={`${(whereActive && searchActive) ? 'where-container absolute top-full left-0 bg-white shadow-sm z-10 flex flex-col gap-2 p-4' : 'hidden'}`}>
                                    <h2 className='text-lg text-black font-semibold'>Pretraživanje po regijama</h2>
                                    <div className='grid grid-cols-3'>
                                        {kontinenti.map((kontinent, index) => {
                                            return (
                                                <div key={index} onClick={(e) => { e.stopPropagation(); handleWhereChange(index); }} className='flex flex-col gap-2 items-center hover:bg-gray-200 p-3 rounded-3xl cursor-pointer'>
                                                    <img  className='w-30 h-28' src={kontinent.img} alt="kontinent" />
                                                    <p className='text-sm font-semibold'>{kontinent.text}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                            </div>
                        <div className="border-l-4 h-8 2xl:h-12"></div>
                        <div ref={datepickerRef} onMouseDown={(e) => e.stopPropagation()} onClick={() => { handleSearchActive();}} className='input-field w-1/5 p-2 ml-2  flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2'>
                                <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Dolazak</label>
                                <Space   direction="vertical">
                                      <DatePicker
                                        defaultValue={null}
                                        className='dolazak-date'
                                        variant='borderless'
                                        placeholder='Odaberi dolazak'
                                        value={dolazakRef === '' ? null : dayjs(dolazakRef, 'DD-MM-YYYY')}
                                        disabledDate={disableDolazak}
                                        format={{                                         
                                          format: 'DD-MM-YYYY',
                                          type: 'mask',
                                        }}
                                        onChange={onDolazakChange}
                                      />
                                </Space>
                        </div>
                        <div ref={datepickerRef} onMouseDown={(e) => e.stopPropagation()} onClick={handleSearchActive} className='input-field p-2 ml-2  flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2 '>
                                <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Odlazak</label>
                                <Space direction="vertical">
                                      <DatePicker
                                        variant='borderless'
                                        placeholder='Odaberi odlazak'
                                        disabledDate={disableOdlazak}
                                        value={odlazakRef === '' ? null : dayjs(odlazakRef, 'DD-MM-YYYY')}
                                        format={{                                         
                                          format: 'DD-MM-YYYY',
                                          type: 'mask',
                                        }}
                                        onChange={onOdlazakChange}
                                      />
                                </Space>        
                            </div>
                        <div className="border-l-4 h-8 2xl:h-12"></div>
                        <div  onClick={() => { handleSearchActive(); handleWhoActive(); }} className='input-field w-1/4  p-2 ml-2 flex flex-col hover:bg-gray-200 hover:cursor-pointer rounded-3xl mr-2'>
                                <label htmlFor="default-input-3" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Tko</label>
                                <input type="text" id="default-input-3" placeholder={`${gostiRef === 0 ? 'Unesi broj gostiju' : `Odabrali ste: ${gostiRef} gosta`}`} className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                            </div>
                            <div ref={whoFieldRef}  className={`${(whoActive && searchActive) ? 'who-container absolute top-full right-36 bg-white shadow-sm z-10 flex flex-col gap-2 p-4' : 'hidden'}`}>
                            
                                    {tkoKategorije.map((item, index) => {
                                            return (
                                                <AddRemove key={index} index={index} item={item} handleMinus={handleGostiMinus} handleAdd={handleGostiPlus} />
                                            );
                                        })}

                                </div>
                           
                        <div className=' input-field flex flex-col w-1/6'>
                            <div className={`${searchActive ? 'hidden' : 'search-icon cursor-pointer'} `}>
                                <FaSearch className='md:w-10 md:h-10 md:mr-3 xl:w-9 xl:h-9 2xl:w-12 2xl:h-12 2xl:p-3 xl:p-2 p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-3xl 2xl:mr-6 transition-colors duration-150' />
                            </div>
                            <div  className='search-icon cursor-pointer w-full'>
                                <CSSTransition
                                            in={searchActive}
                                            timeout={300}
                                            classNames="fade"
                                            unmountOnExit
                                        >
                                            <div onClick={handleSendSearch} className={`${searchActive ? 'search-icon w-28 h-12 cursor-pointer flex justify-center items-center gap-0 bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-600  rounded-3xl ' : 'hidden'}`}>
                                                <FaSearch className=' h-8 w-8 p-1.5  text-white bg-inherit  rounded-3xl transition-colors duration-150 ' />
                                                <p className='text-md text-white font-semibold pr-2'>Pretraži</p>
                                            </div>
                                        </CSSTransition>
                                
                            </div>
                            
                        </div>
                    </div>
                    }
                </div>
                
                <div className={`${searchVisible ? 'hidden' : ''} ${isSmScreen? 'small-nav-container flex align-middle justify-center': 'hidden'}`}>
                    <div className='small-navbar w-5/6 flex justify-between items-center p-4  '>
                        <div onClick={toggleSearch} className='search flex h-14 flex-grow pl-2  items-center rounded-3xl border-2 shadow-lg cursor-pointer hover:border-slate-950 transition-all duration-200 '>
                            <div className='search-icon w-10 h-10 flex justify-center items-center bg-red-500 hover:bg-red-600 rounded-3xl p-2'>
                                <FaSearch className={`${isExtraSmallScreen ? 'h-4 w-4 p-0.5' : ''} h-6 w-6 text-white rounded-3xl p-1`} />
                            </div>
                            <div  className='search-bar pl-2 ml-1 font-semibold text-lg '>
                                <button className={`${isExtraSmallScreen ? 'text-sm' : ''}`}>Započnite sa pretraživanjem</button>
                            </div>
                        </div>
                        <div onClick={handleFilterChange} className={`${isExtraSmallScreen ? 'w-10 h-8 p-1' : 'w-12 h-12'}filter flex justify-center items-center ml-8 p-2 rounded-full border-2 cursor-pointer hover:border-slate-950 transition-all duration-200 hover:shadow-xl`}>
                            <IoIosOptions  className={`${isExtraSmallScreen ? 'w-6 h-6 mt-0 ml-0' : 'w-full h-full  '}   text-slate-950 `} />
                        </div>
                    </div>
                </div>
                <div>

                </div>
                
            </nav>
            <CSSTransition
                in={loginVisible}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <Login toggleLogin={toggleLogin} />
            </CSSTransition>
            <CSSTransition
                in={registerVisible}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <Signup toggleRegister={toggleRegister} />
            </CSSTransition>
            <CSSTransition
                in={searchVisible}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <Search  toggleSearchContainer={toggleSearch} />
            </CSSTransition>
        </section>
        
    );
}

export default Navbar;