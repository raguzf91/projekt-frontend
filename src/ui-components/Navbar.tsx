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
            <nav className="navbar w-full flex items-center gap-96  mr-6 p-8 border border-b-gray-500">
                <img src={logo} alt="logo" className='w-36'/>
                <div className="middle-navbar w-5/12 rounded-3xl border flex items-center justify-between space-x-2">
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                        <input type="text" id="default-input-1" placeholder='Potraži destinaciju' className="outline-none text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className="border-l-4 h-12"></div>
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-2" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Kada</label>
                        <input type="text" id="default-input-2" placeholder='Dodaj datume' className="outline-none text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className="border-l-4 h-12"></div>
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-3" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white">Tko</label>
                        <input type="text" id="default-input-3" placeholder='Dodaj goste' className="outline-none text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className='search-icon'>
                        <FaSearch className='w-12 h-12 text-white bg-red-500 rounded-3xl p-3 mr-6' />
                    </div>
                </div>
                <div className='right-navbar flex gap-20'>
                    <div className='w-40 h-14 hover:bg-gray-100  cursor-pointer rounded-xl flex items-center content-center justify-center '>  
                        <a className='upper-right-navbar-text  text-lg font-semibold text-center  '>Airbnb tvoj dom</a>
                    </div>

                    <div className='relative'>
                            <div className='profile-icon relative' onClick={toggleDropdown}>
                                <CgProfile className='w-14 h-14 p-2 ' />
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