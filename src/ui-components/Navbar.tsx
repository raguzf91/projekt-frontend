import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.webp';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import Login from './Login';
import Signup from './Signup';
import { CSSTransition } from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import { IoIosOptions } from "react-icons/io";
import "./css/Navbar.css"

interface NavbarProps {
    onShowFilterChange: (value: boolean) => void;
}
const Navbar : React.FC<NavbarProps> = ({onShowFilterChange}) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleLogin = () => {
        setLoginVisible(!loginVisible);
    }

    const toggleRegister = () => {
        setRegisterVisible(!registerVisible);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleFilterChange = () => {
        const showFilter = true;
        onShowFilterChange(showFilter);
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

    return (
        <section className="relative">
            {(loginVisible || registerVisible) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
            <nav className="navbar">
                <div className={`navbar-container ${isSmScreen ? 'hidden' : 'flex md:flex-col justify-between items-center p-4 2xl:mr-4 2xl:p-8 border border-b-gray-500'}`}>
                    <div className='upper-navbar w-full flex justify-between items-center '>
                        <img src={logo} alt="logo" className='2xl:w-48 xl:w-32 md:w-32 md:mr-6' />
                        <div className={`middle-navbar ${ismdScreen ? 'hidden' : 'xl:ml-18 2xl:ml-24 2xl:mr-24 3xl:ml-24 3xl:mr-24 rounded-3xl border flex items-center '}`}>
                            <div className='input-field p-2 flex flex-col '>
                                <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                                <input type="text" id="default-input-1" placeholder='Potraži destinaciju' className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                            </div>
                            <div className="border-l-4 h-8 2xl:h-12"></div>
                            <div className='input-field p-2  flex flex-col '>
                                <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Kada</label>
                                <input type="text" id="default-input-2" placeholder='Dodaj datume' className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                            </div>
                            <div className="border-l-4 h-8 2xl:h-12"></div>
                            <div className='input-field  p-2 flex flex-col '>
                                <label htmlFor="default-input-3" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Tko</label>
                                <input type="text" id="default-input-3" placeholder='Dodaj goste' className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                            </div>
                            <div className='input-field p-2  flex flex-col'>
                                <div className='search-icon cursor-pointer'>
                                    <FaSearch className=' h-10 w-10 2xl:w-12 2xl:h-12 2xl:p-3 p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-3xl 2xl:mr-6 transition-colors duration-150' />
                                </div>
                            </div>
                        </div>
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
                    <div className={`lower-navbar ${ismdScreen ? 'md:w-3/5 mt-4 xl:ml-18 2xl:ml-24 rounded-3xl border  flex justify-between items-center space-x-2' : 'hidden'}`}>
                        <div className='input-field p-2  flex flex-col w-1/4'>
                            <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                            <input type="text" id="default-input-1" placeholder='Potraži destinaciju' className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                        </div>
                        <div className="border-l-4 h-8 2xl:h-12"></div>
                        <div className='input-field p-2 flex flex-col w-1/4'>
                            <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Kada</label>
                            <input type="text" id="default-input-2" placeholder='Dodaj datume' className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                        </div>
                        <div className="border-l-4 h-8 2xl:h-12"></div>
                        <div className='input-field p-2  flex flex-col w-1/4'>
                            <label htmlFor="default-input-3" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Tko</label>
                            <input type="text" id="default-input-3" placeholder='Dodaj goste' className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                        </div>
                        <div className='input-field flex flex-col w-12'>
                            <div className='search-icon cursor-pointer'>
                                <FaSearch className='md:w-10 md:h-10 md:mr-3 xl:w-9 xl:h-9 2xl:w-12 2xl:h-12 2xl:p-3 xl:p-2 p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-3xl 2xl:mr-6 transition-colors duration-150' />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={`${isSmScreen? 'small-nav-container flex align-middle justify-center': 'hidden'}`}>
                    <div className='small-navbar w-5/6 flex justify-between items-center p-4  '>
                        <div className='search flex h-14 flex-grow pl-2  items-center rounded-3xl border-2 shadow-lg cursor-pointer hover:border-slate-950 transition-all duration-200 '>
                            <div className='search-icon'>
                                <FaSearch className=' h-10 w-10  rounded-3xl p-2' />
                            </div>
                            <div className='search-bar pl-2 ml-1 font-semibold text-lg '>
                                <button>Započnite sa pretraživanjem</button>
                            </div>
                        </div>
                        <div className='filter w-12 h-12 ml-8 p-0.5 rounded-3xl border-2 cursor-pointer hover:border-slate-950 transition-all duration-200 '>
                            <IoIosOptions onClick={handleFilterChange} className="w-4/5 h-4/5 mt-1 ml-1 text-slate-950 " />
                        </div>
                    </div>
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
        </section>
    );
}

export default Navbar;