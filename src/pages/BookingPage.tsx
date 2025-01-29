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
import Spinner from "../ui-components/Spinner";
import Cookies from 'js-cookie';
import { useUser } from "../context/UserContext";
interface Photo{
    photoUrl: string;
    name: string;
}

interface Listing {
    photos: Photo[];
    price: number;
    cleaningFee: number;
    title: string;
    secondaryTitle: string;
    typeOfListing: string;
    numberOfReviews: number;
    rating: number;
}

const BookingPage = () => {
    const { searchParams, setSearchParams } = useSearchParamsContext();
    const listingId = searchParams.get('listingId');
    const [listing, setListing] = useState<Listing>();

    const dolazak = searchParams.get('dolazak')?.replace(/-/g, '.')
    const odlazak = searchParams.get('odlazak')?.replace(/-/g, '.');
    const gosti = searchParams.get('gosti');

    const totalNightsCost = parseInt(searchParams.get('totalNightsCost') || '0', 10);
    const cleaningFeeCost = parseInt(searchParams.get('totalCleaningFeeCost') || '0', 10);
    const servicesFeeCost = parseInt(searchParams.get('totalServicesFeeCost') || '0', 10);
    const reservationNights = parseInt(searchParams.get('reservationNights') || '0', 10);
    const [paymentOption, setPaymentOption] = useState('now');

    const [creditCardActive, setCreditCardActive] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberActive, setCardNumberActive] = useState(false);
    const [cardNumberInvalid, setCardNumberInvalid] = useState(false);
    const cardNumberRef = React.createRef<HTMLInputElement>();

    const [expiryDate, setExpiryDate] = useState('');
    const [expiryDateActive, setExpiryDateActive] = useState(false);
    const [expiryDateInvalid, setExpiryDateInvalid] = useState<boolean>(false);
    const expiryDateRef = React.createRef<HTMLInputElement>();

    const [cvv, setCvv] = useState('');
    const [cvvActive, setCvvActive] = useState(false);
    const [cvvInvalid, setCvvInvalid] = useState<boolean>(false);
    const cvvRef = React.createRef<HTMLInputElement>();

    const [street, setStreet] = useState('');
    const [streetActive, setStreetActive] = useState(false);
    const [streetInvalid, setStreetInvalid] = useState<boolean>(false);
    const streetRef = React.createRef<HTMLInputElement>();

    const [city, setCity] = useState('');
    const [cityActive, setCityActive] = useState(false);
    const [cityInvalid, setCityInvalid] = useState<boolean>(false);
    const cityRef = React.createRef<HTMLInputElement>();

    const [country, setCountry] = useState('');
    const [countryActive, setCountryActive] = useState(false);
    const [countryInvalid, setCountryInvalid] = useState<boolean>(false);
    const countryRef = React.createRef<HTMLInputElement>();

    const [postalCode, setPostalCode] = useState('');
    const [postalCodeActive, setPostalCodeActive] = useState(false);
    const [postalCodeInvalid, setPostalCodeInvalid] = useState<boolean>(false);
    const postalCodeRef = React.createRef<HTMLInputElement>();

    const [loading, setLoading] = useState(true);



    useEffect(() => {
            const fetchListing = async () => {
                try {
                    const accessToken = Cookies.get('access_token');
                    const response = await fetch(`http://localhost:8080/api/listing/${listingId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    const { listingData } = data.data; // Extract listing from data
                    console.log("Listing data: ", listingData);
                    if(response.ok) {
                        setListing(listingData);
                    }
                    
                   
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
                
            }
            fetchListing();
        }, [listingId]);




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

        const handleExpiryDateActive = () => {
            setExpiryDateActive(true);
        };

        useEffect(() => {
            if(expiryDate.length === 2 ) {
                setExpiryDate(expiryDate + '/');
            }
        }, [expiryDate]);


        const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^0-9/]/g, '');

            if (formattedValue.length === 2 && !formattedValue.includes('/')) {
                setExpiryDate(formattedValue + '/');
                e.target.value = formattedValue + '/';
            }
            
            if (formattedValue.length === 7) {
                const month = formattedValue.slice(0, 2);
                if(parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
                    setExpiryDateInvalid(true);
                    return;
                }
                const year = formattedValue.slice(3, 7);
                if(parseInt(year, 10) < new Date().getFullYear()) {
                    setExpiryDateInvalid(true);
                    return;
                }
                
            }


            setExpiryDate(formattedValue);
            const isValid = /^[0-9/]*$/.test(formattedValue);

            if (!isValid ) {
                setExpiryDateInvalid(true);
            } else {
                setExpiryDateInvalid(false);
            }
        };

        useEffect(() => {
            const handleExpiryDateClickOutside = (event: MouseEvent) => {
                if (
                    expiryDateRef.current && !expiryDateRef.current.contains(event.target as Node) && expiryDateActive 
                ) {
                    if(expiryDate.length < 7 || expiryDate.length > 7) {
                        setExpiryDateInvalid(true);
                    } else {
                        setExpiryDateInvalid(false);
                    }
                   
                   
                }
            };
    
                document.addEventListener('mousedown', handleExpiryDateClickOutside );
                return () => {
                    document.removeEventListener('mousedown', handleExpiryDateClickOutside );
                };
            }, [expiryDateRef, expiryDateActive, expiryDate.length]);
            

            useEffect(() => {
                const handleCvvClickOutside = (event: MouseEvent) => {
                    if (
                        cvvRef.current && !cvvRef.current.contains(event.target as Node) && cvvActive 
                    ) {
                        if(cvv.length < 7 || cvv.length > 7) {
                            setCvvInvalid(true);
                        } else {
                            setCvvInvalid(false);
                        }
                       
                       
                    }
                };
        
                    document.addEventListener('mousedown', handleCvvClickOutside );
                    return () => {
                        document.removeEventListener('mousedown', handleCvvClickOutside );
                    };
                }, [cvvRef, cvvActive, cvv.length]);


        const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^0-9]/g, '');
            console.log(formattedValue);
            setCvv(formattedValue);
            
    
            const isValid = /^[0-9]*$/.test(formattedValue);
            if(formattedValue.length > 3) {
                setCvv(formattedValue.slice(0, 3));
                setCvvInvalid(true);
            }
    
            if (!isValid) {
                setCvvInvalid(true);
            } else {
                setCvvInvalid(false);
            }
        };

        const handleCvvActive = () => {
            setCvvActive(true);
        };

        const handleStreetActive = () => {
            setStreetActive(true);
        };

        const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
            console.log(formattedValue);
            setStreet(formattedValue);
            
    
            const isValid = /^[a-zA-Z0-9\s]*$/.test(formattedValue);
            if(formattedValue.length < 1) {
                setStreetInvalid(true);
            }
    
            if (!isValid) {
                setStreetInvalid(true);
            } else {
                setStreetInvalid(false);
            }
        };

        useEffect(() => {
            const handleStreetClickOutside = (event: MouseEvent) => {
                if (
                    streetRef.current && !streetRef.current.contains(event.target as Node) && streetActive 
                ) {
                    if(street.length < 1) {
                        setStreetInvalid(true);
                    } else {
                        setStreetInvalid(false);
                    }
                   
                   
                }
            };
    
                document.addEventListener('mousedown', handleStreetClickOutside );
                return () => {
                    document.removeEventListener('mousedown', handleStreetClickOutside );
                };
            }, [streetRef, streetActive, street.length]);

            const handleCityActive = () => {
                setCityActive(true);
            };

            const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
                console.log(formattedValue);
                setCity(formattedValue);
                
        
                const isValid = /^[a-zA-Z\s]*$/.test(formattedValue);
                if(formattedValue.length < 1) {
                    setCityInvalid(true);
                }
        
                if (!isValid) {
                    setCityInvalid(true);
                } else {
                    setCityInvalid(false);
                }
            };

        useEffect(() => {
            const handleCityClickOutside = (event: MouseEvent) => {
                if (
                    cityRef.current && !cityRef.current.contains(event.target as Node) && cityActive 
                ) {
                    if(city.length < 1) {
                        setCityInvalid(true);
                    } else {
                        setCityInvalid(false);
                    }
                   
                   
                }
            };
    
                document.addEventListener('mousedown', handleCityClickOutside );
                return () => {
                    document.removeEventListener('mousedown', handleCityClickOutside );
                };
            }, [cityRef, cityActive, city.length]);


        const handleCountryActive = () => {
                setCountryActive(true);
        };

        const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
            console.log(formattedValue);
            setCountry(formattedValue);
            
    
            const isValid = /^[a-zA-Z\s]*$/.test(formattedValue);
            if(formattedValue.length < 1) {
                setCountryInvalid(true);
            }
    
            if (!isValid) {
                setCountryInvalid(true);
            } else {
                setCountryInvalid(false);
            }
        };

        useEffect(() => {
            const handleCountryClickOutside = (event: MouseEvent) => {
                if (
                    countryRef.current && !countryRef.current.contains(event.target as Node) && countryActive 
                ) {
                    if(country.length < 1) {
                        setCountryInvalid(true);
                    } else {
                        setCountryInvalid(false);
                    }
                   
                   
                }
            };
    
                document.addEventListener('mousedown', handleCountryClickOutside );
                return () => {
                    document.removeEventListener('mousedown', handleCountryClickOutside );
                };
            }, [countryRef, countryActive, country.length]);

        

        const handlePostalCodeActive = () => {
            setPostalCodeActive(true);
        }

        const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^0-9]/g, '');
            console.log(formattedValue);
            setPostalCode(formattedValue);
            
    
            const isValid = /^[0-9]*$/.test(formattedValue);
            if(formattedValue.length < 1 || formattedValue.length > 5) {
                setPostalCodeInvalid(true);
            }
    
            if (!isValid) {
                setPostalCodeInvalid(true);
            } else {
                setPostalCodeInvalid(false);
            }
        };

        useEffect(() => {
            const handlePostalCodeClickOutside = (event: MouseEvent) => {
                if (
                    postalCodeRef.current && !postalCodeRef.current.contains(event.target as Node) && postalCodeActive 
                ) {
                    if(postalCode.length < 1 || postalCode.length > 5) {
                        setPostalCodeInvalid(true);
                    } else {
                        setPostalCodeInvalid(false);
                    }
                   
                   
                }
            };
    
                document.addEventListener('mousedown', handlePostalCodeClickOutside );
                return () => {
                    document.removeEventListener('mousedown', handlePostalCodeClickOutside );
                };
            }, [postalCodeRef, postalCodeActive, postalCode.length]);

        




        

    
    



    return (
        <>
        {loading ? (<Spinner loading={loading} />) : (
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
                        <div ref={cardNumberRef} onClick={() => handleCardNumberActive()} className={`${cardNumberInvalid ? 'border-red-500 border-2' : 'border-2'} ${!cardNumberInvalid && cardNumber.length === 16 ? 'border-green-400' : ''} ${cardNumberActive ? 'border-black' : ''} flex w-full mt-4 border rounded-lg p-6 `}>
                                <div className="flex flex-col gap-2 w-full ">
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-extralight ">Broj kartice</p>
                                        <FaLock  className="w-4 h-4"/>
                                    </div>

                                    {cardNumberActive && <input type="text" value={cardNumber} placeholder="XXXX XXXX XXXX XXXX" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4" onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, ''))}/> }
                                </div>


                        </div>
                        <div className="flex w-full">
                        <div ref={expiryDateRef} onClick={() => handleExpiryDateActive()} className={`${expiryDateInvalid ? 'border-red-500  border-2' : 'border-2'} ${!expiryDateInvalid && expiryDate.length === 7 ? 'border-green-400' : ''} ${expiryDateActive ? 'border-black' : ''} flex w-1/2  border rounded-lg p-4 `}>
                                <div className="flex flex-col gap-2 w-full ">
                                    <div className="flex items-center gap-2">
                                    <p className={`${expiryDateActive ? 'text-sm  text-black font-thin' : 'text-white'} h-fit `}>Datum isteka</p>
                                    </div>

                                     <input type="text"  value={expiryDate} placeholder="MM/GGGG" className=" appearance-none focus:outline-none rounded-lg  w-3/4" onChange={(e) => handleExpiryDateChange(e)} required/> 
                                </div>


                        </div>
                        <div ref={cvvRef} onClick={() => handleCvvActive()} className={`${cvvInvalid ? 'border-red-500  border-2' : 'border-2'} ${!cvvInvalid && cvv.length === 3 ? 'border-green-400' : ''} ${cvvActive ? 'border-black' : ''} flex w-1/2  border rounded-lg p-4 `}>
                                <div className="flex flex-col gap-2 w-full ">
                                    <div className="flex items-center gap-2">
                                        <p className={`${cvvActive ? 'text-sm  text-black font-thin' : 'text-white'} h-fit `}>CVV</p>
                                    </div>

                                     <input type="text"  value={cvv} placeholder={`${cvvActive ? '123' : 'CVV'}`} className=" appearance-none focus:outline-none rounded-lg w-3/4 mt-1" onChange={(e) => handleCvvChange(e)} required/> 
                                </div>


                        </div>
                       
                        </div>
                    </div>
                    <div className="adresa-naplate flex flex-col mt-4">
                        <h2 className="text-xl font-semibold">Adresa naplate</h2>
                        <div ref={streetRef} onClick={() => handleStreetActive()} className={`${streetInvalid ? 'border-red-500  border-2' : 'border-2'} ${!streetInvalid && street.length > 0 ? 'border-green-400' : ''} ${streetActive ? 'border-black' : ''} flex w-full mt-4 border rounded-lg p-4 `}>
                                 <div className="flex flex-col gap-2 w-full ">
                                      <input type="text"  value={street} placeholder={`Ulica i broj adrese`} className=" appearance-none focus:outline-none rounded-lg w-3/4 mt-1" onChange={(e) => handleStreetChange(e)} required/> 
                                 </div>


                        </div>
                        <div ref={cityRef} onClick={() => handleCityActive()} className={`${cityInvalid ? 'border-red-500  border-2' : 'border-2'} ${!cityInvalid && city.length > 0 ? 'border-green-400' : ''} ${cityActive ? 'border-black' : ''} flex w-full border rounded-lg p-4 `}>
                                 <div className="flex flex-col gap-2 w-full ">
                                      <input type="text"  value={city} placeholder={`Grad`} className=" appearance-none focus:outline-none rounded-lg w-3/4 mt-1" onChange={(e) => handleCityChange(e)} required/> 
                                 </div>


                        </div>

                        <div className="flex">
                            <div ref={countryRef} onClick={() => handleCountryActive()} className={`${countryInvalid ? 'border-red-500  border-2' : 'border-2'} ${!countryInvalid && country.length > 0 ? 'border-green-400' : ''} ${countryActive ? 'border-black' : ''} flex w-1/2 border rounded-lg p-4 `}>
                                     <div className="flex flex-col gap-2 w-full ">
                                          <input type="text"  value={country} placeholder={`Država`} className=" appearance-none focus:outline-none rounded-lg w-3/4 mt-1" onChange={(e) => handleCountryChange(e)} required/> 
                                     </div>

                            </div>
                            <div ref={postalCodeRef} onClick={() => handlePostalCodeActive()} className={`${postalCodeInvalid ? 'border-red-500  border-2' : 'border-2'} ${!postalCodeInvalid && postalCode.length > 0 ? 'border-green-400' : ''} ${postalCodeActive ? 'border-black' : ''} flex w-1/2 border rounded-lg p-4 `}>
                                 <div className="flex flex-col gap-2 w-full ">
                                      <input type="text"  value={postalCode} placeholder={`Poštanski broj`} className=" appearance-none focus:outline-none rounded-lg w-3/4 mt-1" onChange={(e) => handlePostalCodeChange(e)} required/> 
                                 </div>

                            </div>
                        </div>

                       
                        

                        
                        
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <button className="bg-gradient-to-r from-red-500 to-pink-500  text-white w-3/4 rounded-lg p-4 mt-4">Zahtjev za rezervaciju</button>
                    </div>
                    
                    
                    
                </div>
                <div className="right-container flex flex-col w-1/3 h-fit border-2 p-6">
                <div className="flex">
                    <img src={listing?.photos[0].photoUrl} className="rounded-xl w-48 h-48" alt="" />
                    <div className="flex flex-col ml-4">
                        <p className="text-xl font-semibold">{listing?.title}</p>
                        <p className="font-light">{listing?.secondaryTitle}</p>
                        <div className="flex gap-4 mt-2">
                            <p className="font-semibold">{listing?.typeOfListing}</p>
                            <p className="font-semibold">{`Ocjena: ${listing?.rating} (${listing?.numberOfReviews} recenzija)`}</p>
                        </div>
                    </div>
                </div>
                    <div className='flex flex-col items-center justify-center cost-container mt-4 border-b-2 pb-4'>
                                <div className='flex justify-between w-full mt-2 '>
                                     <p className='underline '>{`€${listing?.price} X ${reservationNights} noćenja`}</p>
                                     <p>{`€${totalNightsCost}`}</p>               
                                </div>
                                <div className='flex justify-between w-full mt-2 '>
                                     <p className='underline '>Naknada za čišćenje</p>
                                     <p>{`€${cleaningFeeCost}`}</p>               
                                </div>
                                <div className='flex justify-between w-full mt-2 '>
                                <p className='underline '>Naknada za usluge</p>
                                <p>{`€${servicesFeeCost}`}</p>             
                                </div>
                            </div>
                            <div className='total-cost-container flex justify-between w-full mt-4 mb-4'>
                                <p>
                                    <span className='font-bold'>Ukupno</span> (sa PDV-om)
                                </p>
                                <p>{`€${totalNightsCost + cleaningFeeCost + servicesFeeCost}`}</p>
                        </div>
                </div>
            </div>
        </div>
        )};
        </>
        
    );
};

export default BookingPage;