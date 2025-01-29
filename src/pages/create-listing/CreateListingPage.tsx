import { CSSTransition } from "react-transition-group";
import "./css/CreateListing.css"
import React, { useEffect, useState, useRef, useCallback, ReactHTMLElement } from "react";
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
import { LuHeart } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
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
import { PiMountains } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiDoorBold } from "react-icons/pi"; 
import { MdOutlineBathtub } from "react-icons/md";
import { PiSecurityCameraFill } from "react-icons/pi";
import { FaParking } from "react-icons/fa";
import { PiHairDryerBold } from "react-icons/pi";
import { MdOutlineFireplace } from "react-icons/md";
import { TbAlarmSmoke } from "react-icons/tb";
import { PiWashingMachineBold } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { GiAtSea } from "react-icons/gi";
import { Flex, Input } from 'antd';
import { Slider } from 'antd';
import { set } from "@cloudinary/url-gen/actions/variable";
import {Cloudinary} from "@cloudinary/url-gen";
import {useDropzone} from 'react-dropzone'
import { FaRegImage } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import { PiFarmFill } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiPanorama } from "react-icons/pi";
import { GiPalmTree } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { MdVilla } from "react-icons/md";
import { PiCastleTurret } from "react-icons/pi";
import { IoIosOptions } from "react-icons/io";
import { LuFlame } from "react-icons/lu";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { FaHouseUser } from "react-icons/fa";
import { GiWoodCabin } from "react-icons/gi";
import Spinner from '../../ui-components/Spinner';



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

interface ListingAmenities {
    id: number;
    description: string;
    icon: string;

};

interface Photo {
    photo_url: string;
    name: string;
}

interface Location {
    streetNumber: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
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
    const [fullLocation, setFullLocation] = useState<Location>();
    const center = React.useMemo(() => ({ lat: 45.346241, lng: 19.008960 }), []);
    const [addressAccepted, setAddressAccepted] = useState(false);
    const { TextArea } = Input;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('Dobro ćete se provesti u ovom udobnom smještaju.');
    const [price, setPrice] = useState('50');
    const [priceInvalid, setPriceInvalid] = useState(false);
    const [cleaningFee, setCleaningFee] = useState('10');
    const [cleaningFeeInvalid, setCleaningFeeInvalid] = useState(false);
    
    const [photo, setPhoto] = useState<File | null>(null);
    const [photos, setPhotos] = useState<File[] | null>(null);
    const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [uploadPhotos, setUploadPhotos] = useState(true);
    const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);

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

    const handleTypeOfListingChange = (e: React.MouseEvent<HTMLDivElement>) => {
        setTypeOfListing(e.target.innerText);
        
    };

    const [allAmenities, setAllAmenities] = useState<ListingAmenities[]>([]);
    
    useEffect(() => {

        const fetchLocation = async () => {
            try {
                if(fullAddress !== '')  {
                    
                    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${API_KEY}`);
                    const data = await response.json();
                    
                    center.lat = data.results[0].geometry.location.lat;
                    center.lng = data.results[0].geometry.location.lng;
                    setLat(center.lat);
                    setLng(center.lng);

                    
                    if(map !== null) {
                        map.panTo(center);

                    }
                }
                
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAmenities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/amenity/all`);
                const data = await response.json();

                if(response.ok) {
                    const amenities = data.data.amenities;
                    
                    setAllAmenities(amenities);

                }
                
                
                
            } catch (error) {
                console.error(error);
            }
        };
        
       fetchLocation();
       fetchAmenities();

    }, [fullAddress, API_KEY]);




    const handleOnPlacesChanged = () => {
        const address = inputRef.current.getPlaces();
        
        for (let i = 0; i < address[0].address_components.length; i++) {
            if(address[0].address_components[i].types.includes('street_number')) {
                listingAddress.streetNumber = address[0].address_components[i].long_name;
                setStreetNumber(listingAddress.streetNumber);
                
            };

            if(address[0].address_components[i].types.includes('route')) {
                listingAddress.street = address[0].address_components[i].long_name;
                setStreet(listingAddress.street);
                
            };

            if(address[0].address_components[i].types.includes('locality')) {
                listingAddress.city = address[0].address_components[i].long_name;
                setCity(listingAddress.city);
                
            };

            if(address[0].address_components[i].types.includes('country')) {
                listingAddress.country = address[0].address_components[i].long_name;
                setCountry(listingAddress.country);
                
            };

            if(address[0].address_components[i].types.includes('postal_code')) {
                listingAddress.postalCode = address[0].address_components[i].long_name;
                setPostalCode(listingAddress.postalCode);
                
            };

            
            //console.log(address[0].address_components[i]);
        }

        if((listingAddress.city && listingAddress.street && listingAddress.streetNumber && listingAddress.country && listingAddress.postalCode) !== "") {
            setFullAddress(`${listingAddress.street} ${listingAddress.streetNumber}, ${listingAddress.city}, ${listingAddress.country}, ${listingAddress.postalCode}`);
            console.log();
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
        setFullLocation({
            streetNumber: streetNumber,
            street: street,
            city: city,
            country: country,
            postalCode: postalCode,
            latitude: lat,
            longitude: lng
        })
        setAddressAccepted(true);
        toast.success("Adresa je uspješno potvrđena");
    };

    const [maxGuests, setMaxGuests] = useState(12);
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
    const [numberOfBeds, setNumberOfBeds] = useState(1);
    const [numberOfBathrooms, setNumberOfBathrooms] = useState(1);
    const [refundable, setRefundable] = useState(false);

    const handleAdd = (value: string) => {
        if(value === "Guests") {
            if (maxGuests < 20) {
                setMaxGuests(maxGuests + 1);
            } else {
                setMaxGuests(0);
            }
            return;
        }
        if(value === "Bedroom") {
            if (numberOfBedrooms < 20) {
                setNumberOfBedrooms(numberOfBedrooms + 1);
            } else {
                setNumberOfBedrooms(0);
            }
            return;
        }
        if(value === "Beds") {
            if (numberOfBeds < 20) {
                setNumberOfBeds(numberOfBeds + 1);
            } else {
                setNumberOfBeds(0);
            }
            return;
        }
        if(value === "Bathroom") {
            if (numberOfBathrooms < 20) {
                setNumberOfBathrooms(numberOfBathrooms + 1);
            } else {
                setNumberOfBathrooms(0);
            }
            return;
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

        const handleRefundableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            
            if(e.target.value === 'true') {
                setRefundable(true);
            } else {
                setRefundable(false);
            }
        };

        const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
        const [selectedAmenitiesIndex, setSelectedAmenitiesIndex] = useState<string[]>([]);

        const addToSelectedAmenities = (amenityDescription: string, index: number) => {
            if(selectedAmenities.includes(amenityDescription)) {
                
                // Remove the amenity from the selectedAmenities array
            const newSelectedAmenities = selectedAmenities.filter(amenity => amenity !== amenityDescription);
            setSelectedAmenities(newSelectedAmenities);

            // Remove the index from the selectedAmenitiesIndex array
            const newSelectedAmenitiesIndex = selectedAmenitiesIndex.filter(i => i !== index.toString());
            setSelectedAmenitiesIndex(newSelectedAmenitiesIndex);
            } else {
                setSelectedAmenities([...selectedAmenities, amenityDescription]);
                
                setSelectedAmenitiesIndex([...selectedAmenitiesIndex, index.toString()]);
                
            }
    };

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
    };  

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = value.replace(/[^0-9]/g, '');
                
                setPrice(formattedValue);
                
        
                const isValid = /^[0-9]*$/.test(formattedValue);
                if(formattedValue.length > 5) {
                    setPrice(formattedValue.slice(0, 5));
                    setPriceInvalid(true);
                }

                if(parseInt(formattedValue) > 10000) {
                    setPrice("10000");
                }
        
                if (!isValid) {
                    setPriceInvalid(true);
                } else {
                    setPriceInvalid(false);
                }
            };

            const handleCleaningFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = value.replace(/[^0-9]/g, '');
                
                setCleaningFee(formattedValue);
                
        
                const isValid = /^[0-9]*$/.test(formattedValue);
                if(parseInt(formattedValue) > 100) {
                    setCleaningFee("100");
                   
                }
        
                if (!isValid) {
                    setCleaningFeeInvalid(true);
                } else {
                    setCleaningFeeInvalid(false);
                }
            };

            const handleUploadPhotos = async () => {
                if (!photos || photos.length === 0) {
                    toast.error('Molimo dodajte fotografije');
                    return;
                }
            
                const uploadPromises = photos.map(async (photo) => {
                    const uploadData = new FormData();
                    uploadData.append('file', photo);
                    uploadData.append('upload_preset', 'projekt-fina-upload-unsigned');
                    uploadData.append('api_key', '729888475719161');
            
                    const response = await fetch(`https://api.cloudinary.com/v1_1/${'dljagsyiv'}/${'image'}/upload`, {
                        method: 'POST',
                        body: uploadData
                    });
            
                    if (!response.ok) {
                        throw new Error('Greška prilikom Unosa slike. Pokušajte ponovno kasnije');
                    }
            
                    const data = await response.json();
                    const photoUrl = data.url;
                    const name = data.original_filename;
                    return { photoUrl: photoUrl, name: name };
                });
            
                try {
                    const uploadedPhotos = await Promise.all(uploadPromises);
                    setUploadedPhotos(uploadedPhotos);
                    setLoading(false);
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(error.message);
                    } else {
                        toast.error('An unknown error occurred');
                    }
                }
            };
            

            useEffect(() => {
                if(photos?.length === 5) {
                    setUploadPhotos(false);
                }
            }, [photos]);

            

            useEffect(() => {
                const handleSendForm = async () => {

                    if(title === '' || description === '' || price === '' || cleaningFee === '' || fullAddress === '' || typeOfListing === '' || uploadedPhotos.length === 0 || selectedAmenities.length === 0 || fullLocation === undefined) {
                        toast.error("Molimo popunite sva polja");
                        return;
                    };
                    const listingData = new FormData();
                    const photosData = new FormData();
                    listingData.append('title', title);
                    listingData.append('description', description);
                    listingData.append('price', price);
                    const cleaningFeeDecimal = parseInt(cleaningFee) * 0.1;
                    const cleaningFeeString = cleaningFeeDecimal.toString();
    
                    listingData.append('cleaningFee', cleaningFeeString);
                    listingData.append('refundable', refundable.toString());
                    listingData.append('maxGuests', maxGuests.toString());
                    listingData.append('numberOfBedrooms', numberOfBedrooms.toString());
                    listingData.append('numberOfBeds', numberOfBeds.toString());
                    listingData.append('numberOfBathrooms', numberOfBathrooms.toString());
                    listingData.append('fullAddress', fullAddress);
                    listingData.append('latitude', lat.toString());
                    listingData.append('longitude', lng.toString());
                    listingData.append('typeOfListing', typeOfListing);
    
                    uploadedPhotos.forEach((photo) => {
                        listingData.append('photos', JSON.stringify(photo));
                    });
                    listingData.append('amenities', JSON.stringify(selectedAmenities));
    
                    if(fullLocation !== undefined) {
                        listingData.append('fullLocation', JSON.stringify(fullLocation));
                    };

                    for (let [key, value] of listingData.entries()) {
                        console.log(`${key}: ${value}`);
                    }
                    
                    

                    const response = await fetch(`http://localhost:8080/api/listing/create`, {
                        method: 'POST',
                        body: listingData
                    });
                    if(response.ok) {
                        console.log(response);
                        toast.success("Uspješno ste dodali novi smještaj");
                        navigate('/');
                    } else {
                        toast.error("Greška prilikom dodavanja smještaja");
                        console.log(response);
                    }
            };

                if (uploadedPhotos.length !== 0) {
                    handleSendForm();
                }
            }, [
                uploadedPhotos,
                title,
                description,
                price,
                cleaningFee,
                fullAddress,
                typeOfListing,
                selectedAmenities,
                fullLocation,
                lat,
                lng,
                maxGuests,
                numberOfBedrooms,
                numberOfBeds,
                numberOfBathrooms,
                refundable,
                navigate
                
            ]);


            const onDrop = useCallback((acceptedFiles: File[]) => {
                const newPhotos: File[] = [];
                const newPreviewPhotos: string[] = [];
            
                acceptedFiles.forEach(file => {
                    const reader = new FileReader();
                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJpgOrPng) {
                        toast.error('Slika mora biti u formatu JPG ili PNG');
                        return;
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                        toast.error('Slika mora biti manja od 2MB');
                        return;
                    }
                    reader.onload = () => {
                        // You can handle the file read result here if needed
                    };
                    reader.readAsDataURL(file);
                    newPhotos.push(file);
                    newPreviewPhotos.push(URL.createObjectURL(file));
                });
            
                setPhotos([...(photos || []), ...newPhotos]);
                setPreviewPhotos([...previewPhotos, ...newPreviewPhotos]);
            
                console.log("photos:", photos);
            }, [photos, previewPhotos]);
              
            const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
            const sendForm = async () => {
                if(photos === null) {
                    toast.error("Molimo dodajte fotografije");
                    return;
                };
                setLoading(true);
                await handleUploadPhotos();
                

            }
            

        
    
        
    return (
        <>
        {loading ? <Spinner loading = {loading} /> : (
            <CSSTransition
            in={animate}
            timeout={300}
            classNames="fade"
            unmountOnExitF
        >
            <section className="create-listing-page w-screen h-screen flex flex-col ">
                <header className='flex justify-start items-center w-full p-4'>
                    <img src={logo} onClick={handleNavigateToHome} className='p-8 2xl:w-48 xl:w-32 md:w-32 md:mr-6 cursor-pointer' alt="logo" />
                </header>
                <main className="flex flex-col justify-center items-center">
                    <div className="container flex flex-col justify-center w-1/2 items-center">
                        <div className="odaberi-vrstu flex flex-col justify-center items-center w-1/2">
                            <h1 className="text-3xl font-semibold">Što od navedenog najbolje opisuje vaš smještaj</h1>
                            <div className="vrste-smjestaja flex w-full items-center justify-center mt-6">
                                {vrsteSmjestaja.map((vrsta, index) => (
                                    <div onClick={handleTypeOfListingChange} key={index} className={` ${typeOfListing === vrsteSmjestaja[index].text ? 'bg-gradient-to-r from-red-500 to-pink-500 ' : 'bg-gray-50'}   vrsta-smjestaja flex h-24 w-1/3 gap-2 border-2 mr-6   hover:border-black justify-center items-center p-2 cursor-pointer transition-all duration-150 `}>
                                        {React.cloneElement(vrsta.icon, { className: 'w-12 h-12' })}
                                        <p className="text">{vrsta.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="nalazi-se flex flex-col justify-center items-center w-full mt-24 border-t-2 pt-10">
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
                        </div>
                            <div className="osnovne-informcije flex flex-col w-full h-fit p-4 mt-24">
                                <h1 className="text-3xl font-semibold">Navedite osnovne informacije o smještaju</h1>
                                <div  className="flex flex-col justify-between gap-2 items-center ml-4 mr-4">
                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-12">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Gosti:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Guests")} className={`w-8 h-8 cursor-pointer ${maxGuests === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{maxGuests}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Guests")} className={`w-8 h-8 cursor-pointer ${maxGuests === 13 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>

                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-12 ">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Spavaće Sobe:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Bedroom")} className={`w-8 h-8 cursor-pointer ${numberOfBedrooms === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{numberOfBedrooms}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Bedroom")} className={`w-8 h-8 cursor-pointer ${numberOfBedrooms === 10 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>

                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-12 ">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Kreveti:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Beds")} className={`w-8 h-8 cursor-pointer ${numberOfBeds === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{numberOfBeds}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Beds")} className={`w-8 h-8 cursor-pointer ${numberOfBeds === 12 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>

                                            <div className="flex w-full gap-4 justify-between items-center mt-4 border-b-2 pb-12 ">
                                                <div className="flex items-center gap-2 ">
                                                    <p className="text-xl text-semibold text-center">Kupaonice:</p>
                                                    
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <CiCircleMinus onClick={() => handleMinus("Bathroom")} className={`w-8 h-8 cursor-pointer ${numberOfBathrooms === 0 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    <p className="text-xl font-semibold text-center">{numberOfBathrooms}</p>
                                                    <CiCirclePlus onClick={() => handleAdd("Bathroom")} className={`w-8 h-8 cursor-pointer ${numberOfBathrooms === 10 ? 'text-gray-400 cursor-not-allowed' : ' hover:border-slate-950'}`} />
                                                    
                                                </div>
                                                
                                            </div>
                                            <div className="flex flex-col w-full gap-4 justify-between items-center mt-4 border-b-2 pb-12 ">
                                                <h1 className="text-3xl font-semibold">Mogu li gosti zatražiti povrat novca?</h1>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <p className="text-lg">Da</p>
                                                        <input name="refundable" type="radio" value="true" className="w-5 h-5 cursor-pointer" onClick={(e) => handleRefundableChange(e)}  />
                                                    </div>
                                                    <div className="flex justify-center items-center gap-2">
                                                        <p className="text-lg">Ne</p>
                                                        <input name="refundable" type="radio" value="false" className="w-5 h-5 cursor-pointer" onClick={(e) => handleRefundableChange(e)}  />
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            
                            <div className="amenities flex flex-col w-full h-fit p-4 mt-24 border-b-2 pb-12">
                                <h1 className="text-3xl font-semibold">Navedite osnovne informacije o smještaju</h1>
                                {allAmenities.length !== 0 && (
                                    <div className="sadržaji flex flex-wrap w-full items-center justify-center mt-6">
                                        {allAmenities.map((amenity, index) => (
                                            <React.Fragment key={index}>
                                                {amenity.description !== 'Kuća' && amenity.description !== 'Stan' && amenity.description !== 'Dijeljenje stana' && (
                                                    <div onClick={() => addToSelectedAmenities(amenity.description,index)} className={`sadržaj  flex mt-4  w-1/4 border-2 mr-6 h-24 ${selectedAmenitiesIndex.includes(index.toString()) ? 'border-red-500 bg-gradient-to-r from-red-500 to-pink-500 text-white' : 'hover:border-black'} justify-center items-center p-2 cursor-pointer transition-all duration-150 `}>
                                                        <div className='flex items-center justify-center pl-2 '>
    {amenity.icon === '<MdOutlinePets />' && <MdOutlinePets className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiWashingMachineBold />' && <PiWashingMachineBold className='w-6 h-6 mr-2' />}
    {amenity.icon === '<TbAlarmSmoke />' && <TbAlarmSmoke className='w-6 h-6 mr-2' />}
    {amenity.icon === '<MdOutlineFireplace />' && <MdOutlineFireplace className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiHairDryerBold />' && <PiHairDryerBold className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaWifi />' && <FaWifi className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaRegSnowflake />' && <FaRegSnowflake className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaTv />' && <FaTv className='w-6 h-6 mr-2' />}
    {amenity.icon === '<LuWashingMachine />' && <LuWashingMachine className='w-6 h-6 mr-2' />}
    {amenity.icon === '<BiSolidDryer />' && <BiSolidDryer className='w-6 h-6 mr-2' />}
    {amenity.icon === '<TbTemperatureSun />' && <TbTemperatureSun className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiCity />' && <PiCity className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaUmbrellaBeach />' && <FaUmbrellaBeach className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaSkiing />' && <FaSkiing className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiMountains />' && <PiMountains className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaRegCalendarCheck />' && <FaRegCalendarCheck className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiDoorBold />' && <PiDoorBold className='w-6 h-6 mr-2' />}
    {amenity.icon === '<MdOutlineBathtub />' && <MdOutlineBathtub className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiSecurityCameraFill />' && <PiSecurityCameraFill className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaParking />' && <FaParking className='w-6 h-6 mr-2' />}
    {amenity.icon === '<GiAtSea />' && <GiAtSea className='w-6 h-6 mr-2' />}
    {amenity.icon === '<TbToolsKitchen />' && <TbToolsKitchen className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaHouseUser />' && <FaHouseUser className='w-6 h-6 mr-2' />}
    {amenity.icon === '<GiWoodCabin />' && <GiWoodCabin className='w-6 h-6 mr-2' />}
    {amenity.icon === '<GiIsland />' && <GiIsland className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaSwimmingPool />' && <FaSwimmingPool className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiFarmFill />' && <PiFarmFill className='w-6 h-6 mr-2' />}
    {amenity.icon === '<MdOutlineWatchLater />' && <MdOutlineWatchLater className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiPanorama />' && <PiPanorama className='w-6 h-6 mr-2' />}
    {amenity.icon === '<GiPalmTree />' && <GiPalmTree className='w-6 h-6 mr-2' />}
    {amenity.icon === '<FaHouse />' && <FaHouse className='w-6 h-6 mr-2' />}
    {amenity.icon === '<MdVilla />' && <MdVilla className='w-6 h-6 mr-2' />}
    {amenity.icon === '<PiCastleTurret />' && <PiCastleTurret className='w-6 h-6 mr-2' />}
    {amenity.icon === '<LuFlame />' && <LuFlame className='w-6 h-6 mr-2' />}
    <p className='text-base'>{amenity.description}</p>
</div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col w-full h-fit p-4 mt-24 border-b-2 pb-12">
                                <h1 className="text-3xl font-semibold">Odredite naziv svog smještaja</h1>
                                <p className="text-xl text-gray-500">Kratki nazivi bolje funkcioniraju</p>
                                <TextArea className="mt-4 focus:outline-none h-40" showCount minLength={1} maxLength={32} onChange={handleTitleChange} status={`${title.length < 1 ? 'error' : ''}`} />    
                            </div>
                            <div className="description flex flex-col w-full h-fit p-4 mt-24 border-b-2 pb-12">
                                <h1 className="text-3xl font-semibold">Sastavite opis</h1>
                                <p className="text-xl text-gray-500">Navedite ono po čemu je vaš smještaj poseban.</p>
                                <TextArea  value={description} className="mt-4 focus:outline-none h-40 tetx-lg" showCount onChange={handleDescriptionChange} minLength={1} maxLength={255} status={`${description.length < 1 ? 'error' : ''}`} />
                            </div>
                            <div className="price flex flex-col items-center justify-center w-full h-fit p-4 mt-24 border-b-2 pb-12">
                                <h1 className="text-4xl font-semibold">Odredite osnovnu cijenu vašeg smještaja</h1>
                                <div className="flex items-center justify-center mt-4 bg-white">
                                    <p className="text-7xl">€</p>
                                    <input value={price} className="text-7xl appearance-none focus:outline-none w-1/4  " type="text" max={4}  onChange={handlePriceChange}/>
                                </div>
                                <Slider style={{  }} max={10000} min={10} className="w-full" defaultValue={parseInt(price)} value={price} tooltip={{ open: true }} onChange={(value) => setPrice(value.toString())} />
                               
                            </div>

                            <div className="cleaning-fee flex flex-col items-center justify-center w-full h-fit p-4 mt-24 border-b-2 pb-12">
                                <h1 className="text-4xl font-semibold">Odredite Naknadu za čišćenje vašeg smještaja</h1>
                                <div className="flex items-center justify-center mt-4 bg-white">
                                    <p className="text-7xl">%</p>
                                    <input value={cleaningFee} className="text-7xl appearance-none focus:outline-none w-1/4  " type="text" max={4}  onChange={handleCleaningFeeChange}/>
                                    
                                </div>
                                <Slider style={{  }} max={100} min={0} className="w-full" defaultValue={parseInt(cleaningFee)} value={cleaningFee} tooltip={{ open: true }} onChange={(value) => setCleaningFee(value.toString())} />
                               
                            </div>
                            <div className="photos flex flex-col items-center justify-center w-full h-fit p-4 mt-24">
                                <h1 className="text-4xl font-semibold w-full">Dodajte fotografije ovog smještaja</h1>
                                <p className="text-xl text-gray-500 w-full mt-4">Za početak će vam trebati 5 fotografija</p>
                                <div className="w-1/3 mt-10" {...getRootProps()}>
                                  <input accept=".png, .jpg, .jpeg" className="w-full" {...getInputProps()} />
                                  
                                    {uploadPhotos && (
                                        <div className={`  ${isDragActive ? ' bg-gray-100' : ''} w-full flex flex-col h-40 border-2 cursor-pointer border-dashed border-gray-300  items-center justify-center`}>
                                            <FaRegImage className="w-20 h-20" />
                                        </div>

                                    )}
                                      
                                    
                                  
                                </div>
                                {previewPhotos && (
                                    <div className="flex flex-wrap w-full mt-6">
                                        {previewPhotos.map((photo, index) => (
                                            <div key={index} className="w-1/6 h-40 mr-4 mt-4">
                                                <img src={photo} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    
                                )}
                                
                            </div>
                                
                            <div className="create-listing flex justify-center items-center w-full h-fit p-4">
                                <button onClick={sendForm} className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xl w-1/2 rounded-lg p-4 ">Kreiraj smještaj</button>
                            </div>
                        </div>
                    
                    
                </main>
            </section>
        </CSSTransition>
        )}
        </>
        )}
        
  
export default CreateListingPage;