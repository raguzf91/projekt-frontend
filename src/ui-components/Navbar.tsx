import React, { useState } from 'react';
import logo from '../assets/images/logo.webp';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Login from './Login';
import Signup from './Signup';
import { CSSTransition } from 'react-transition-group';
import "./Navbar.css"
const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);

    const toggleLogin = () => {
        setLoginVisible(!loginVisible );
    }
    const toggleRegister = () => {
        setRegisterVisible(!registerVisible );
    }

    return (
        <section className="relative">
            {(loginVisible || registerVisible) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
            <nav className="navbar w-full flex justify-between items-center xl:gap-4 xl:p-4   2xl:mr-4 2xl:p-8 border border-b-gray-500">
                <img src={logo} alt="logo" className='2xl:w-48 xl:w-32'/>
                <div className="middle-navbar xl:ml-18 2xl:ml-24   rounded-3xl border flex items-center justify-between space-x-2">
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                        <input type="text" id="default-input-1" placeholder='Potraži destinaciju' className="outline-none 2xl:text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className="border-l-4 xl:h-8 2xl:h-12"></div>
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Kada</label>
                        <input type="text" id="default-input-2" placeholder='Dodaj datume' className="outline-none 2xl:text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className="border-l-4 xl:h-8 2xl:h-12"></div>
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-3" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Tko</label>
                        <input type="text" id="default-input-3" placeholder='Dodaj goste' className="outline-none 2xl:text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <div className='search-icon'>
                            <FaSearch className='xl:w-9 xl:h-9 xl:p-2 2xl:w-12 2xl:h-12 text-white bg-red-500 rounded-3xl 2xl:p-3 2xl:mr-6' />
                        </div>
                    </div>
                    
                </div>
                <div className='right-navbar flex xl:gap-3 xl:mr-3 2xl:gap-3  2xl:mr-4'>
                    <div className='2xl:w-40 2xl:h-14 hover:bg-gray-100  cursor-pointer rounded-xl flex items-center content-center justify-center '>  
                        <a className='upper-right-navbar-text  text-lg font-semibold text-center  '>Airbnb tvoj dom</a>
                    </div>

                    <div className='relative'>
                            <div className='profile-icon relative' onClick={toggleDropdown}>
                                <CgProfile className='xl:w-9 xl:h-9 2xl:w-14 2xl:h-14 2xl:p-2 ' />
                                <div className='absolute inset-0 border-4 border-transparent cursor-pointer hover:border-gray-700 rounded-full'></div>
                            </div>
                        {dropdownVisible && (
                            <div id="dropdownInformation" className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <div className=" text-lg border-b-2 text-gray-900 dark:text-white w-full">
                                    <a href="#" onClick={toggleRegister} className="block font-semibold px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Registracija</a>
                                    <a href="#" onClick={toggleLogin} className="block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Prijava</a>
                                </div>
                                <ul className="py-2 text-lg text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
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
            </nav>
            <CSSTransition
                in={loginVisible}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <Login toggleLogin={toggleLogin}/>
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