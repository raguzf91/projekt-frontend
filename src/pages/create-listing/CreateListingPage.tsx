import { CSSTransition } from "react-transition-group";
import "./css/CreateListing.css"
import React, { useEffect, useState, useRef } from "react";
import { useNavbarFilter } from "../../context/NavbarFilterProvider";
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { LuHouse } from "react-icons/lu";
import { PiBuildingApartment } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Autocomplete, StandaloneSearchBox } from '@react-google-maps/api';
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";


interface CreateListingProps {
    API_KEY: string; 
    isLoaded: boolean;  
}

interface ListingAddress {
    streetNumber: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}



const CreateListingPage : React.FC<CreateListingProps>  = ({API_KEY, isLoaded}) => {
    const { setHideNavbar} = useNavbarFilter();
    const [animate, setAnimate] = useState(false);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [lat, setLat] = useState(45.346241);
    const [lng, setLng] = useState(19.008960);
    const navigate = useNavigate();
    const [streetNumber, setStreetNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const center = React.useMemo(() => ({ lat: 45.346241, lng: 19.008960 }), []);
    const [addressAccepted, setAddressAccepted] = useState(false);
    const listingAddress: ListingAddress = {
        streetNumber: '',
        street: '',
        city: '',
        country: '',
        postalCode: ''
    };
    const [fullAddress, setFullAddress] = useState('');


    const inputRef = useRef(null);

    const handleNavigateToHome = () => {
        console.log('Navigating to home page');
        navigate("/");
    };


    const [typeOfListing, setTypeOfListing] = useState('Kuća');

   
    useEffect(() => {
            setHideNavbar(true);
            setAnimate(true);
            return () => setHideNavbar(false); // Reset the navbar visibility when the component unmounts
    
    }, [setHideNavbar]);


    
    
    const vrsteSmjestaja = [
            {icon: <LuHouse />, text: 'Kuća'},
            {icon: <PiBuildingApartment />, text: 'Stan'},
            {icon: <IoPeopleOutline />, text: 'Dijeljenje stana'},
        ];

    const handleTypeOfListingChange = (e: any) => {
        setTypeOfListing(e.target.innerText);
        console.log(typeOfListing);
    };
    
    useEffect(() => {

        const fetchLocation = async () => {
            try {
                if(fullAddress !== '')  {
                    console.log("Full address: ", fullAddress);
                    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${API_KEY}`);
                    const data = await response.json();
                    
                    center.lat = data.results[0].geometry.location.lat;
                    center.lng = data.results[0].geometry.location.lng;
                    setLat(center.lat);
                    setLng(center.lng);

                    console.log("Location data: ", data.results[0].geometry.location);
                    if(map !== null) {
                        map.panTo(center);

                    }
                }
                
            } catch (error) {
                console.error(error);
            }
        };
        
       fetchLocation();

    }, [fullAddress, API_KEY]);




    const handleOnPlacesChanged = () => {
        const address = inputRef.current.getPlaces();
        
        for (let i = 0; i < address[0].address_components.length; i++) {
            if(address[0].address_components[i].types.includes('street_number')) {
                listingAddress.streetNumber = address[0].address_components[i].long_name;
                setStreetNumber(listingAddress.streetNumber);
                console.log(listingAddress.streetNumber);
            };

            if(address[0].address_components[i].types.includes('route')) {
                listingAddress.street = address[0].address_components[i].long_name;
                setStreet(listingAddress.street);
                console.log(listingAddress.street);
            };

            if(address[0].address_components[i].types.includes('locality')) {
                listingAddress.city = address[0].address_components[i].long_name;
                setCity(listingAddress.city);
                console.log(listingAddress.city);
            };

            if(address[0].address_components[i].types.includes('country')) {
                listingAddress.country = address[0].address_components[i].long_name;
                setCountry(listingAddress.country);
                console.log(listingAddress.country);
            };

            if(address[0].address_components[i].types.includes('postal_code')) {
                listingAddress.postalCode = address[0].address_components[i].long_name;
                setPostalCode(listingAddress.postalCode);
                console.log(listingAddress.postalCode);
            };

            
            //console.log(address[0].address_components[i]);
        }

        if((listingAddress.city && listingAddress.street && listingAddress.streetNumber && listingAddress.country && listingAddress.postalCode) !== "") {
            setFullAddress(`${listingAddress.street} ${listingAddress.streetNumber}, ${listingAddress.city}, ${listingAddress.country}, ${listingAddress.postalCode}`);
        } else {
            toast.error("Molimo unesite ispravnu adresu");
            setStreetNumber('');
            setStreet('');
            setCity('');
            setCountry('');
            setPostalCode('');
            setFullAddress('');
        }
        
        //console.log(address[0].address_components[1]);
        
        
    };

    const handleMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };

    const handleAcceptAddress = () => {
        if(addressAccepted) {
            toast.info("Adresa je već potvrđena");
            return;
        }
        setAddressAccepted(true);
        toast.success("Adresa je uspješno potvrđena");
    };

    const [maxGuests, setMaxGuests] = useState(12);
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
    const [numberOfBeds, setNumberOfBeds] = useState(1);
    const [numberOfBathrooms, setNumberOfBathrooms] = useState(1);

    const handleAdd = (value: string) => {
            if(maxGuests > 12) {
                setMaxGuests(12);
            } else {
                setMaxGuests(maxGuests + 1);
               
            }
        };
    
        
    
        const handleMinus = (value: string) => {
            if(value === "Guests") {
                if (maxGuests > 0) {
                    setMaxGuests(maxGuests - 1);
                } else {
                    setMaxGuests(0);
                }
                return;
            }
            if(value === "Bedroom") {
                if (numberOfBedrooms > 0) {
                    setNumberOfBedrooms(numberOfBedrooms - 1);
                } else {
                    setNumberOfBedrooms(0);
                }
                return;
            }
            if(value === "Beds") {
                if (numberOfBeds > 0) {
                    setNumberOfBeds(numberOfBeds - 1);
                } else {
                    setNumberOfBeds(0);
                }
                return;
            }
            if(value === "Bathroom") {
                if (numberOfBathrooms > 0) {
                    setNumberOfBathrooms(numberOfBathrooms - 1);
                } else {
                    setNumberOfBathrooms(0);
                }
                return;
            }
            
            
        };

    
        
    return (
        <CSSTransition
            in={animate}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <section className="create-listing-page w-screen h-screen flex flex-col ">
                <header className='flex justify-start items-center w-full p-4'>
                    <img src={logo} onClick={handleNavigateToHome} className='p-8 2xl:w-48 xl:w-32 md:w-32 md:mr-6 cursor-pointer' alt="logo" />
                </header>
                <main>
                    <div className="container flex flex-col items-center">
                        <div className="odaberi-vrstu flex flex-col justify-center items-center w-1/2">
                            <h1 className="text-3xl font-semibold">Što od navedenog najbolje opisuje vaš smještaj</h1>
                            <div className="vrste-smjestaja flex w-full items-center justify-center mt-6">
                                {vrsteSmjestaja.map((vrsta, index) => (
                                    <div onClick={handleTypeOfListingChange} key={index} className="vrsta-smjestaja flex flex-col w-1/4 border-2 mr-6 bg-gray-50  hover:border-black justify-center items-center p-2 cursor-pointer transition-all duration-150 ">
                                        {React.cloneElement(vrsta.icon, { className: 'w-12 h-12' })}
                                        <p className="text">{vrsta.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="nalazi-se flex flex-col justify-center items-center w-1/2 mt-24 border-t-2 pt-10">
                            <div className="flex items-center justify-center gap-2">
                                <h1 className="text-3xl font-semibold">Gdje se vaš smještaj nalazi</h1>
                                <FaMapMarkerAlt className="w-6 h-6 text-gray-500" />
                            </div>
                            <div className="lokacija flex flex-col w-full items-center justify-center mt-6 ">
                            {isLoaded && (
                                    <StandaloneSearchBox
                                        onLoad={(ref) => inputRef.current = ref}
                                        onPlacesChanged={handleOnPlacesChanged}
                                    >
                                        <Autocomplete className="flex justify-center "  >

                                            <input  type="text" placeholder="Unesite adresu" className=" appearance-none focus:outline-none focus:border-2 focus:border-black rounded-2xl text-lg p-4 w-1/4   border-2 border-gray-300 absolute mt-6  z-50 shadow-lg"  />
                                        </Autocomplete>
                                    </StandaloneSearchBox>
                                   
                            )}

                               {isLoaded && (
                                     <GoogleMap
                                         mapContainerStyle={{ width: '100%', height: '40rem' }}
                                         zoom={15}
                                         center={center}
                                         onLoad={handleMapLoad}
                                         
                                     >
                                     <Marker position={{ lat, lng }} />  
                                     </GoogleMap>
                                )}
                                {(country && street && streetNumber && city && postalCode) !== '' && (

                                    <div className="potvrdi-lokaciju mt-20 w-full">
                                        <h1 className="text-3xl font-semibold">Potvrdite lokaciju</h1>
                                            <div className="država flex flex-col w-full   border-2 rounded-xl p-4 mt-4">
                                                <p className="text-base font-light text-gray-400">Država</p>
                                                <p className="text-xl">{country}</p>
                                            </div> 
                                            <div className="flex w-full border-2 rounded-xl">
                                                <div className="ulica flex flex-col w-1/2 border-e-2  rounded-xl p-4">
                                                    <p className="text-base font-light text-gray-400">Ulica</p>
                                                    <p className="text-xl">{street}</p>
                                                </div> 
                                                <div className="država flex flex-col w-1/2   rounded-xl p-4">
                                                    <p className="text-base font-light text-gray-400">Broj</p>
                                                    <p className="text-xl">{streetNumber}</p>
                                                </div> 
                                            </div>
                                            
                                                <div className="grad flex flex-col w-full   border-2 rounded-xl p-4">
                                                    <p className="text-base font-light text-gray-400">Grad</p>
                                                    <p className="text-xl">{city}</p>
                                                </div>
                                                <div className="poštanski-broj flex flex-col w-full   border-2 rounded-xl p-4">
                                                    <p className="text-base font-light text-gray-400">Poštanski broj</p>
                                                    <p className="text-xl">{postalCode}</p>
                                                </div>

                                                <div className="w-full flex items-center mt-4">
                                                    <button onClick={handleAcceptAddress} className="bg-gradient-to-r from-red-500 to-pink-500  text-white w-1/4 rounded-lg p-4 ">Potvrđujem</button>
                                                </div>                       
                                    </div>
                                )}
                                
                            </div>
                            <div className="osnovne-informcije flex flex-col w-full h-fit p-4 mt-24">
                                <h1 className="text-3xl font-semibold">Navedite osnovne informacije o smještaju</h1>
                                <div  className="flex flex-col justify-between gap-2 items-center ml-4 mr-4">
                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-4">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Gosti:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Guests")} className={`w-8 h-8 cursor-pointer ${maxGuests === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{maxGuests}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Guests")} className={`w-8 h-8 cursor-pointer ${maxGuests === 13 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>

                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-4 ">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Spavaće Sobe:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Bedroom")} className={`w-8 h-8 cursor-pointer ${numberOfBedrooms === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{numberOfBedrooms}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Bedroom")} className={`w-8 h-8 cursor-pointer ${numberOfBedrooms === 10 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>

                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-4 ">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Kreveti:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Beds")} className={`w-8 h-8 cursor-pointer ${numberOfBeds === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{numberOfBeds}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Beds")} className={`w-8 h-8 cursor-pointer ${numberOfBeds === 12 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>

                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-4 ">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Kreveti:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Bathroom")} className={`w-8 h-8 cursor-pointer ${numberOfBathrooms === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{numberOfBathrooms}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Bathroom")} className={`w-8 h-8 cursor-pointer ${numberOfBathrooms === 10 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>
                                        </div>
                            </div>

                        </div>
                    </div>
                    
                </main>
            </section>
        </CSSTransition>
    )
};
export default CreateListingPage;