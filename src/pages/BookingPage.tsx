import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSearchParamsContext } from '../context/SearchParamsContext';
import { RiVisaFill } from "react-icons/ri";
import { FaCcPaypal } from "react-icons/fa";
import { RiMastercardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import React from "react";



const BookingPage = () => {
    const { searchParams, setSearchParams } = useSearchParamsContext();
    const listingId = searchParams.get('listingId');
    const dolazak = searchParams.get('dolazak')?.replace(/-/g, '.')
    const odlazak = searchParams.get('odlazak')?.replace(/-/g, '.');
    const gosti = searchParams.get('gosti');

    const totalNightsCost = parseInt(searchParams.get('totalNightsCost') || '0', 10);
    const cleaningFeeCost = parseInt(searchParams.get('totalCleaningFeeCost') || '0', 10);
    const servicesFeeCost = parseInt(searchParams.get('totalServicesFeeCost') || '0', 10);
    const [paymentOption, setPaymentOption] = useState('now');

    const [creditCardActive, setCreditCardActive] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberActive, setCardNumberActive] = useState(false);
    const [cardNumberInvalid, setCardNumberInvalid] = useState(false);
    const cardNumberRef = React.createRef<HTMLInputElement>();

    const handleNavigateBack = () => {
        window.history.back();
    };

    const handlePaymentOptionActive = (option : string) => {
        setPaymentOption(option);
    };

    
    const handleCreditCardActive = () => {
        setCreditCardActive(true);
    };

    const handleCardNumberActive = () => {
        setCardNumberActive(true);
    };

    useEffect(() => {
        if(cardNumber.length === 16 ) {
            setCardNumberInvalid(false);
        }
    }, [cardNumber]);


    useEffect(() => {
        const handleCardNumberClickOutside = (event: MouseEvent) => {
            if (
                cardNumberRef.current && !cardNumberRef.current.contains(event.target as Node) && cardNumberActive 
            ) {
                if(cardNumber.length < 16 || cardNumber.length > 16) {
                    setCardNumberInvalid(true);
                } else {
                    setCardNumberInvalid(false);
                }
                console.log(cardNumber.length);
               
            }
        };

            document.addEventListener('mousedown', handleCardNumberClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleCardNumberClickOutside);
            };
        }, [cardNumberRef, cardNumberActive, cardNumber.length]);

        

    
    



    return (
        <div className="container p-20">
            <div className="flex">
                <MdKeyboardArrowLeft onClick={handleNavigateBack} className="w-8 h-8 cursor-pointer" />
                <h1 className="text-3xl font-semibold">Potvrda i plaćanje</h1>
            </div>
            <div className="flex booking-container mt-10 pl-8">
                <div className="left-container flex flex-col w-1/2 pr-10 ">
                    <h2 className="text-2xl font-semibold">Vaše putovanje</h2>
                    <div className="flex flex-col mt-4">
                        <div className="flex justify-between">
                            <p className="font-semibold text-lg">Datumi</p>
                            <p className="underline">Uredite</p>
                        </div>
                        <div>
                            <p>{`${dolazak} - ${odlazak}`}</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 pb-16 border-b-2">
                        <div className="flex justify-between">
                            <p className="font-semibold text-lg">Gosti</p>
                            <p className="underline">Uredite</p>
                        </div>
                        <div>
                            <p>{`${gosti} ${gosti === '1' ? 'gost' : 'gosta'}`}</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 pb-16 border-b-2">
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-semibold">Odaberite naćin plačanja</h2>
                            <div className="flex gap-1">
                                <RiVisaFill className="w-6 h-6" />
                                <FaCcPaypal className="w-6 h-6" />
                                <RiMastercardLine className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="flex flex-col mt-4">
                            <div onClick={() => handlePaymentOptionActive('now')} className={`${paymentOption === 'now' ? 'border-2 border-black' : 'border'} plati-odmah flex justify-between  p-4 rounded-t-lg cursor-pointer`}>
                                <p className="text-lg font-semibold">
                                    {`Platite € ${totalNightsCost + cleaningFeeCost + servicesFeeCost} odmah`}
                                </p>
                                <div className={`${paymentOption === 'now' ? 'bg-black' : 'bg-white border-2 border-black'} rounded-full w-6 h-6`}> </div>
                            </div>
                            <div onClick={() => handlePaymentOptionActive('later')} className={`${paymentOption === 'later' ? 'border-2 border-black' : 'border'}  p-4 rounded-b-lg cursor-pointer`}>
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <p>
                                        Dio platite sada, a dio kasnije
                                        </p>
                                        <p className="text-base font-semibold">
                                            {`Danas ćete platiti € ${(totalNightsCost + cleaningFeeCost + servicesFeeCost) / 2}, a € ${(totalNightsCost + cleaningFeeCost + servicesFeeCost) / 2} ćete platiti do ${odlazak}`}
                                        </p>
                                    </div>
                              
                                <div className={`${paymentOption === 'later' ? 'bg-black' : 'bg-white border-2 border-black'} rounded-full w-6 h-6`}> </div>
                                </div>
                                
                            </div>
                        </div>
                        
                          
                    </div>
                    <div className="placanje flex flex-col mt-4">
                        <h2 className="text-3xl font-semibold">Plaćanje</h2>
                    </div>
                    <div onClick={() => handleCreditCardActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                        <div className="flex gap-4">
                             <FaRegCreditCard className="h-7 w-7"/>
                            <p className="text-lg font-light">Kreditna ili debitna kartica</p>
                        </div>
                        
                        <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col mt-4">
                        <div ref={cardNumberRef} onClick={() => handleCardNumberActive()} className={`${cardNumberInvalid ? 'border-red-500 border-2' : 'border-2'} flex w-full mt-4 border rounded-lg p-6 `}>
                                <div className="flex flex-col gap-2 w-full ">
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-extralight ">Broj kartice</p>
                                        <FaLock  className="w-4 h-4"/>
                                    </div>

                                    {cardNumberActive && <input type="text" value={cardNumber} placeholder="XXXX XXXX XXXX XXXX" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4" onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, ''))}/> }
                                </div>


                        </div>
                        <div className="flex w-full">
                        <div ref={expiryDateRef} onClick={() => handleExpiryDateActive()} className={`${expiryDateInvalid ? 'border-red-500 border-2' : 'border-2'} flex w-full mt-4 border rounded-lg p-6 `}>
                                <div className="flex flex-col gap-2 w-full ">
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-extralight ">Datum isteka</p>
                                    </div>

                                    {expiryDateActive && <input type="month" min={"2024-12"}  value={expiryDate} placeholder="XXXX XXXX XXXX XXXX" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4" onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, ''))}/> }
                                </div>


                        </div>
                        </div>
                    </div>
                    
                    <div>

                    </div>
                </div>
                <div className="right-container flex flex-col w-1/2 h-full">

                </div>
            </div>
        </div>
    );
};
export default BookingPage;