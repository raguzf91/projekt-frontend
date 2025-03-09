import React, { useEffect, useState, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../ui-components/Spinner';
import { useSearchParamsContext } from '../context/SearchParamsContext';
import { useNavbarFilter } from '../context/NavbarFilterProvider';
import { LuHeart } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
import Photos from '../ui-components/Photos';
import guestFavorite  from '../assets/images/guestFavorite.png';
import leftVijenac from '../assets/images/left-vijenac.png';
import rightVijenac from '../assets/images/right-vijenac.png';
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import userIcon from '../assets/images/userIcon.png';
import dayjs from 'dayjs';
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
import { DatePicker, Space, Carousel } from "antd";
import type { DatePickerProps } from 'antd';
import { IoMdClose } from "react-icons/io";
import ListingRatings from '../ui-components/ListingRatings';
import AddRemove from '../ui-components/AddRemove';
import { handleGostiMinus, handleGostiPlus } from '../ui-components/Search';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { GoogleMap, Marker } from '@react-google-maps/api'
import Profile from '../ui-components/Profile';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';
import { FaTrash } from "react-icons/fa";
import isBetween from 'dayjs/plugin/isBetween';

interface ListingPageProps {
    servicesFee: number;
    isLoaded: boolean;
    API_KEY: string;
}

const ListingPage: React.FC<ListingPageProps> = ({servicesFee, isLoaded, API_KEY}) => {
    const { id } = useParams();

    interface Location {
        city: string;
        country: string;
        street: string;
        streetNumber: string;
        fullAddress: string;
        postalCode: string;
        latitude: number;
        longitude: number;
    }

    interface User {
        id: number;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        birthDate: string;
        responseRate: number;
        speaksLanguages: string[];
        profilePhoto: string;
        createdAt : string;
        averageRating: number;
        bio: string;
        gender: string;
        
    }

    interface Photo {
        photoUrl: string;
        name: string;
        bedroomPhoto: boolean;
    }

    interface Review {
        author: User;
        description: string;
        numberOfStars: number;
        cleanliness: number;
        communication: number;
        precision: number;
        location: number;
        checkIn: number;
        value: number;
        receiverId: number;
        createdAt : string
    }

    interface Amenity {
        id: number;
        description: string;
        icon: string;
    }

    interface Listing {
        id: number;
        photos: Photo[];
        title: string;
        location: Location;
        user: User;
        price: number;
        rating: number;
        description: string;
        reviews: Review[];
        maxGuests: number;
        numberOfBeds: number;
        numberOfBedrooms: number;
        numberOfReviews: number;
        numberOfBathrooms: number;
        secondaryTitle: string;
        typeOfListing: string;
        amenities: Amenity[]
        cleaningFee: number;
    }
    dayjs.extend(isBetween);

    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const { searchParams, setSearchParams } = useSearchParamsContext();
    const { dolazak, odlazak, gosti, handleListingFilterChange } = useNavbarFilter();
    const [showPhotos, setShowPhotos] = useState(false);
    const handleListingFilterChangeCalled = useRef(false);
    const [darkScreen, setDarkScreen] = useState(false);
    const [stars, setStars] = useState<JSX.Element[]>([]);
    const [yearsHosting, setYearsHosting] = useState<number>(0);
    const [reviewPercentageList, setReviewPercentageList] = useState<{ numberOfStars: number; percentage: number }[]>([]);
    const [cleanliness, setCleanliness] = useState<number>(0);
    const [communication, setCommunication] = useState<number>(0);
    const [locationRating, setLocationRating] = useState<number>(0);
    const [checkInRating, setCheckInRating] = useState<number>(0);
    const [valueRating, setValueRating] = useState<number>(0);
    const [precisionRating, setPrecisionRating] = useState<number>(0);
    const [expandedReviewIndex , setExpandedReviewIndex] = useState<number>(-1);
    const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
    const [gostiReservation, setGostiReservation] = useState<number>(gosti);
    const [gostiActive, setGostiActive] = useState(false);
    const whoFieldRef = useRef<HTMLDivElement>(null);
    const [reservationDolazak, setReservationDolazak] = useState<string>(dolazak);
    const [reservationOdlazak, setReservationOdlazak] = useState<string>(odlazak);
    const [reservationNights, setReservationNights] = useState<number>(1);
    const [totalNightsCost, setTotalNightsCost] = useState<number>(0);
    const [totalCleaningFeeCost, setTotalCleaningFeeCost] = useState<number>(0);
    const [totalServicesFeeCost, setTotalServicesFeeCost] = useState<number>(0);
    const [userIsListingOwner, setUserIsListingOwner] = useState<boolean>(false);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const center = React.useMemo(() => ({ lat: 45.346241, lng: 19.008960 }), []);
    const [isReserved, setIsReserved] = useState<boolean>(false);
     const [map, setMap] = useState<google.maps.Map | null>(null);
    const [secondaryTitle, setSecondaryTitle] = useState('');
    const { user } = useUser();
    const [reservations, setReservations] = useState<{startDate: string; endDate: string}[]>([]);
    const [listingLiked, setListingLiked] = useState<boolean>(false);
  
    useEffect(() => {
        setTotalNightsCost(listing?.price * (reservationNights ? reservationNights : 1)); 
        setTotalCleaningFeeCost(listing?.price * listing?.cleaningFee);
        setTotalServicesFeeCost(listing?.price * servicesFee);
    }, [reservationDolazak, reservationOdlazak, listing?.price, listing?.cleaningFee, servicesFee]);

    const tkoKategorije = [
        {item : 'Gosti', value: gostiReservation}
    ];


    const handleGostiActive = () => {
        setGostiActive(!gostiActive);
    };



    const calculateStarReview = (rating: number) => {
        const starsArray = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsArray.push(<FaStar key={i} />);
            } else if (i === fullStars && hasHalfStar) {
                starsArray.push(<FaStarHalf key={i} />);
            } else {
                starsArray.push(<FaStar key={i} style={{ opacity: 0.3 }} />); // Empty star with reduced opacity
            }
        }
        return starsArray;
    };

    const calculateCleanliness = () => {
        const cleanliness = listing?.reviews.map(review => review.cleanliness);
        const totalCleanliness = cleanliness?.reduce((acc, curr) => acc + curr, 0);
        const averageCleanliness = totalCleanliness ? totalCleanliness / (cleanliness?.length ?? 1) : 1;
        return averageCleanliness;
    };

    const calculateCommunication = () => {
        const communication = listing?.reviews.map(review => review.communication);
        const totalCommunication = communication?.reduce((acc, curr) => acc + curr, 0);
        const averageCommunication = totalCommunication ? totalCommunication / (communication?.length ?? 1) : 1;
        return averageCommunication;
    };

    const calculateLocation = () => {
        const location = listing?.reviews.map(review => review.location);
        const totalLocation = location?.reduce((acc, curr) => acc + curr, 0);
        const averageLocation = totalLocation ? totalLocation / (location?.length ?? 1) : 1;
        return averageLocation;
    };

    const calculateCheckIn = () => {
        const checkIn = listing?.reviews.map(review => review.checkIn);
        const totalCheckIn = checkIn?.reduce((acc, curr) => acc + curr, 0);
        const averageCheckIn = totalCheckIn ? totalCheckIn / (checkIn?.length ?? 1) : 1;
        return averageCheckIn;
    };

    const calculateValue = () => {
        const value = listing?.reviews.map(review => review.value);
        const totalValue = value?.reduce((acc, curr) => acc + curr, 0);
        const averageValue = totalValue ? totalValue / (value?.length ?? 1) : 1;
        return averageValue;
    };

    const calculatePrecision = () => {
        const precision = listing?.reviews.map(review => review.precision);
        const totalPrecision = precision?.reduce((acc, curr) => acc + curr, 0);
        const averagePrecision = totalPrecision ? totalPrecision / (precision?.length ?? 1) : 1;
        return averagePrecision;
    };

    useEffect(() => {
        if (listing) {
            const calculatedStars = calculateStarReview(listing.rating);
            setStars(calculatedStars);
        }
    }, [listing]);

    useEffect(() => {
        const reviewPercentage = [
            { numberOfStars: 5, percentage: 0 },
            { numberOfStars: 4, percentage: 0 },
            { numberOfStars: 3, percentage: 0 },
            { numberOfStars: 2, percentage: 0 },
            { numberOfStars: 1, percentage: 0 }
        ];
        const calculatePercentage = () => {
            const totalReviews = listing?.numberOfReviews;
            const reviewStars = listing?.reviews.map(review => review.numberOfStars);
            const reviewStarsCount = reviewStars?.reduce((acc, curr) => {
                if (acc[curr]) {
                    acc[curr]++;
                } else {
                    acc[curr] = 1;
                }
                return acc;
            }, {} as { [key: number]: number });

            for (let i = 1; i <= 5; i++) {
                reviewPercentage[i - 1].percentage = reviewStarsCount && reviewStarsCount[i] && totalReviews ? (reviewStarsCount[i] / totalReviews) * 100 : 0;
            }
        };
        calculatePercentage();
        setReviewPercentageList(reviewPercentage);
        setCheckInRating(calculateCheckIn());
        setCleanliness(calculateCleanliness());
        setCommunication(calculateCommunication());
        setLocationRating(calculateLocation());
        setValueRating(calculateValue());
        setPrecisionRating(calculatePrecision());

    }, [listing?.numberOfReviews, listing?.reviews]);
    
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/listing/${id}`);
                const data = await response.json();
                const { listingData } = data.data; // Extract listing from data
                setListing(listingData);
                setSecondaryTitle(`${listingData.typeOfListing} u ${listingData.location.city}, ${listingData.location.country}`);
                if (listingData && !handleListingFilterChangeCalled.current) {
                    handleListingFilterChange(`${listingData.location.city}, ${listingData.location.country}`, dolazak, odlazak, gosti);
                    handleListingFilterChangeCalled.current = true;

                    const createdAt = dayjs(listingData.user.createdAt);
                    const yearsPassed = dayjs().diff(createdAt, 'year');
                    setYearsHosting(yearsPassed + 3);
                    if(user && user.id === listingData.user.id) {
                        setUserIsListingOwner(true);
                    }
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

       

        
        
        fetchListing();
        
    }, [id, dolazak, odlazak, gosti, handleListingFilterChange, API_KEY, listing?.location.fullAddress, user?.id, user]);
    
    useEffect(() => {
       
            map?.panTo({ lat, lng });
        
    }, [map, lat, lng]);

    
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${user?.id}/reservations/listing/${id}/is-reserved`);
                const data = await response.json();
                const { isReserved } = data.data;
                setIsReserved(isReserved);
            } catch (error) {
                console.error(error);
            }
        };
        if(listing) {
            fetchReservation();
        }
    }, [id, listing, user?.id, isReserved]);

    useEffect(() => {
        const fetchListingReservations = async () => {
            console.log('fetching reservations');
          try {
            const response = await fetch(`http://localhost:8080/api/user/${user?.id}/reservations/listing/${id}`);
            const data = await response.json();
            const { reservations } = data.data;
        
            const updatedReservations = reservations.map((reservation: any) => ({
              startDate: reservation.reservedFrom,
              endDate: reservation.reservedUntil,
            }));
            setReservations(updatedReservations);
        
        
          } catch (error) {
            console.error(error);
          }
        };
      
        // Only fetch if listing exists 
        if (listing) {
          fetchListingReservations();
        }
      }, [id, user?.id, listing]);


      useEffect(() => {
        const fetchListingLiked = async () => {
            try {
                const accessToken = Cookies.get('access_token');
                if(user && accessToken) {
                    const response = await fetch(`http://localhost:8080/api/user/${user.id}/is-listing-liked/${listing?.id}`);
                    if(response.ok) {
                        const data = await response.json();
                        const {isLiked} = data.data;
                        setListingLiked(isLiked);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if(listing && user) {
            fetchListingLiked();
        }
      }, [listing, user]);


    useEffect(() => {
        const fetchLocation = async () => {
            try {
                
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(listing?.location.fullAddress)}&key=${API_KEY}`);
                const data = await response.json();
                center.lat = data.results[0].geometry.location.lat;
                    center.lng = data.results[0].geometry.location.lng;
                    setLat(center.lat);
                    setLng(center.lng);
                  

            } catch (error) {
                console.error(error);
            }
        };
        if(listing) {
            fetchLocation();
        }

    }, [listing?.location.latitude, listing?.location.longitude, API_KEY, map, center, listing]);


    const calculateTimePassed = (date: string) => {
        const createdAt = dayjs(date);
        const yearsPassed = dayjs().diff(createdAt, 'year');
        const monthsPassed = dayjs().diff(createdAt, 'month');
        const daysPassed = dayjs().diff(createdAt, 'day');
        const timePassed = yearsPassed > 0 ? `${yearsPassed} godina` : monthsPassed > 0 ? `${monthsPassed} mjeseci` : `${daysPassed} dana`;
        return timePassed;
    };

    const handleShowPhotos = () => {

        setShowPhotos(!showPhotos);
    };

    const handleDarkScreenChange = () => {
        setDarkScreen(!darkScreen);
    }

    const mainAmenities = [
        '<TbToolsKitchen />',
        '<IoPeopleOutline />',
        '<PiMountains />',
        '<FaRegCalendarCheck />',
        '<PiDoorBold />',
        '<FaParking />'
    ];

    const toggleShowMore = (index: number) => {
        setExpandedReviewIndex(expandedReviewIndex === index ? -1 : index);
    };

    const truncateText = (text: string, length: number) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    const handleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const handleReservationDolazakChange = (date: any, dateString: string) => {
        setReservationDolazak(dateString);
        const dolazakDate = dayjs(dateString, 'DD-MM-YYYY');
        const odlazakDate = dayjs(reservationOdlazak, 'DD-MM-YYYY');
        const nights = odlazakDate.diff(dolazakDate, 'day');
        setReservationNights(nights);
    };

    const handleReservationOdlazakChange = (date: any, dateString: string) => {
        setReservationOdlazak(dateString);
        const dolazakDate = dayjs(reservationDolazak, 'DD-MM-YYYY');
        const odlazakDate = dayjs(dateString, 'DD-MM-YYYY');
        const nights = odlazakDate.diff(dolazakDate, 'day');
        setReservationNights(nights);
    };

    const navigate = useNavigate();

    const handleNavigateToBookingPage = () => {
         const accessToken = Cookies.get('access_token');
                if(user && accessToken) {
                    if(reservationDolazak === '' || reservationOdlazak === '') {
                        toast.error('Morate odabrati datume dolaska i odlaska');
                        return;
                    } else if(reservationNights < 1) {
                        toast.error('Minimalan boravak je 1 noć');
                        return;
                    } else if(reservationNights > 30) {
                        toast.error('Maksimalan boravak je 30 noći');
                        return;
                    } else if(gostiReservation < 1) {
                        toast.error('Morate odabrati broj gostiju');
                        return;
                   
                } else if(reservationDolazak === reservationOdlazak || dayjs(reservationDolazak, 'DD-MM-YYYY').isAfter(dayjs(reservationOdlazak, 'DD-MM-YYYY'))) {
                    toast.error('Datumi dolaska i odlaska nisu ispravni');
                    return;
                } else if(listing && gostiReservation > listing.maxGuests) {
                    toast.error(`Maksimalan broj gostiju je ${listing.maxGuests}`);
                    return;
                        
                }
                
                else {
                    navigate(`/booking?hideNavbar=${true}&dolazak=${reservationDolazak}&odlazak=${reservationOdlazak}&gosti=${gostiReservation}&listingId=${listing?.id}&totalNightsCost=${totalNightsCost}&totalCleaningFeeCost=${totalCleaningFeeCost}&totalServicesFeeCost=${totalServicesFeeCost}&reservationNights=${reservationNights}`);
                }
        } else {
            toast.error('Morate biti prijavljeni da biste postavili oglas!');
        }

    };

const handleDeleteListing = async () => {
        const accessToken = Cookies.get('access_token');
        if(user && accessToken) {
            try {
                const response = await fetch(`http://localhost:8080/api/listing/${listing?.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if(response.ok) {
                    toast.success('Oglas uspješno obrisan');
                    navigate('/');
                } else {
                    toast.error('Došlo je do greške prilikom brisanja oglasa');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            toast.error('Morate biti prijavljeni da biste obrisali oglas');
        }
};




const handleDisabledOdlazakDate = (current: any) => {
    if (!current) return false;
  
    const dayjsCurrent = dayjs(current);
  
    // Disable if the date is before today.
    if (dayjsCurrent.isBefore(dayjs().startOf('day'))) return true;
  
    // Check if the current date falls within any reservation's period.
    if (listing && reservations && reservations.length > 0) {
      for (const reservation of reservations) {
        const resStart = dayjs(reservation.startDate);
        const resEnd = dayjs(reservation.endDate);
        if (dayjsCurrent.isBetween(resStart, resEnd, 'day', '[]')) {
          return true;
        }
      }
    }
    
    return false;
  };

  const handleDisabledDolazakDate = (current: any) => {
    if (!current) return false;
  
    const dayjsCurrent = dayjs(current);
  
    // Disable if the date is before today.
    if (dayjsCurrent.isBefore(dayjs().startOf('day'))) return true;
  
    // Check if the current date falls within any reservation's period.
    if (listing && reservations && reservations.length > 0) {
      for (const reservation of reservations) {
        const resStart = dayjs(reservation.startDate);
        const resEnd = dayjs(reservation.endDate);
        if (dayjsCurrent.isBetween(resStart, resEnd, 'day', '[]')) {
          return true;
        }
      }
    }
    
    return false;
  };

  const handleLikeListing = async () => {
    const accessToken = Cookies.get('access_token');
    if(user && accessToken) {
        try {
            const response = await fetch(`http://localhost:8080/api/user/${user.id}/like-listing/${listing?.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if(response.ok) {
                const data = await response.json();
                const {isLiked} = data.data;
                console.log("isLiked" + isLiked);
                if(isLiked === true) {
                    toast.success('Oglas spremljen');
                } else {
                    toast.success('Oglas uklonjen iz spremljenih');
                }
                setListingLiked(isLiked);
            } else {
                toast.error('Došlo je do greške prilikom spremanja oglasa');
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        toast.error('Morate biti prijavljeni da biste spremili oglas');
    }
  };


return (
        <section className={`listing-section mt-6  ${darkScreen ? 'bg-black' : ''} ${showPhotos ? 'pr-0 pl-0 ' : 'pr-40 pl-40 md:pr-20 md:pl-20 sm:pr-10 sm:pl-10'}`}>
            {loading ? (<Spinner loading={loading} />) : (
                <div className={`${showPhotos ? ' flex items-center  justify-center' : ''} `}>
                     {showAllReviews && <div className="fixed inset-0 bg-black opacity-50"></div>}
                     <div className={`${showPhotos ? 'hidden' : 'listing-container flex flex-col flex-wrap'} `}>

                       

                        
                        <div className='title-container flex justify-between items-center'>
                            {listing && <h1 className='font-bold text-3xl'>{listing.title}</h1>}
                            <div className='flex align-center gap-2'>
                            {listingLiked ? (
                                <div onClick={handleLikeListing} className='like-container flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 hover:text-black'>
                                    <LuHeart className='w-6 h-6 text-red-500' />
                                    <p className='underline underline-offset-2 text-lg'>Spremljen</p>
                                </div>
                            ) : (
                                <div onClick={handleLikeListing} className='like-container flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 hover:text-red-500'>
                                    <LuHeart className='w-6 h-6' />
                                    <p className='underline underline-offset-2 text-lg'>Spremi</p>
                                </div>
                            )}
                            
                            {user && user.id === listing?.user.id && 
                                 <div onClick={handleDeleteListing} className='delete-container flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 hover:text-red-500'>
                                 <FaTrash className='w-6 h-6' />
                                 <p className='underline underline-offset-2 text-lg'>Izbriši oglas</p>
                             </div>
                            }
                           
                            </div>
                            

                        </div>
                        <div className='ohoto-container flex mt-4 cursor-pointer relative '>
                            <div className='main-photo w-1/2 h-full '>
                                <img className='w-full h-full hover:brightness-50 transition-all p-2' src={listing?.photos[0]?.photoUrl} alt="listing photo" />
                            </div>
                            <div className='photos-container flex flex-wrap flex-row-2 w-1/2  '>
                                {listing?.photos.map((photo, index) => (
                                    (index !== 0 && index < 5) && <img className='w-1/2 p-2 hover:brightness-50 transition-all duration-200 ' key={index} src={photo.photoUrl} alt='listing photo' />
                                ))}
                            </div>
                            <div className='show-photos-container absolute bottom-10  right-6 flex items-center bg-white border-2 justify-center gap-2 p-1 w-36  hover:bg-gray-200 cursor-pointer' onClick={handleShowPhotos}>
                                 <BsGrid3X3GapFill />
                                 <p className='show-photos text-black text-base'>Prikaži slike</p>
                            </div>
                        
                    </div>
                    <div className='flex w-full mt-6'>
                    <div className='left w-3/4 h-fit'>
                    <div className='main-description-container flex flex-col w-full mt-4  pb-4'>
                        <div className='flex w-full'>
                        <div className='description-left w-full h-full mr-2'>
                            {listing && <h2 className='font-bold text-2xl'>{listing.secondaryTitle}</h2>}
                            <div className='flex gap-2'>
                                <p className='font-semibold'>{`${listing?.maxGuests} gostiju`}</p>
                                <p className='text-black'>•</p>
                                <p className='font-semibold'>{`${listing?.numberOfBedrooms} spavaćih soba`}</p>
                                <p className='text-black'>•</p>
                                <p className='font-semibold'>{`${listing?.numberOfBeds} kreveta`}</p>  
                                <p className='text-black'>•</p> 
                                <p className='font-semibold'>{`${listing?.numberOfBathrooms} kupatila`}</p> 
                            </div>
                            <div className='host-container p-4 border-b-2 w-full flex-col items-center  mt-4'>
                                <div className='flex ribbon-container border-2 h-24  items-center justify-center  '>
                                    <img className='mr-4  xl:h-3/4  md:w-1/4 2xl:w-1/5 ' src={guestFavorite} alt="guest favorite" />
                                    <div className='flex w-2/4 items-center justify-center '>
                                        <p className='font-semibold xl:text-base md:text-sm 2xl:text-lg '>Jedan od najdražih domova na Airbnbu, prema recenzijama gostiju</p>
                                    </div>
                                    
                                    <div className='flex-col w-1/4 justify-center items-center gap-2 '>
                                    {listing?.rating === 1 ? (
                                         <p className='review-score text-center 2xl:text-2xl md:text-xl font-bold'>Novi oglas</p>
                                    ) : (
                                        <div className='flex flex-col'>
                                              <p className='review-score text-center 2xl:text-2xl md:text-xl font-bold'>{listing?.rating}</p>
                                             <div className='flex md:w-full xl:w-full gap-1 items-center justify-center'>
                                                 {stars}
                                             </div>
                                        </div>
                                      
                                    )}
                                        
                                        
                                    </div>
                                    <div className='flex-col w-1/4 justify-center items-center gap-2'>
                                        <p className='review-score text-center text-2xl font-bold'>{listing?.numberOfReviews}</p>
                                        <div className='flex items-center justify-center gap-1'>
                                            <p className='text-center'>Recenzija</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='host-info-container flex mt-4 gap-4'>
                    
                                        <img className='w-10 h-10 rounded-full' src={userIcon} alt="user icon" />
                                        <div className='flex-col'>
                                            <p className='font-semibold'>Domaćin je {listing?.user.firstName}</p>
                                            <p>
                                                {yearsHosting > 0 ? (
                                                    <span className='font-bold'>{`${yearsHosting} godina `}</span>
                                                ) : (
                                                    'Domaćin je nedavno počeo iznajmljivati'
                                                )} je domaćin
                                            </p>
                                        </div>
                                    
                                </div>  
                            </div>
                            <div className='amenities-container mt-8 border-b-2 w-full'>
                                {listing?.amenities
                                    .filter(amenity => mainAmenities.includes(amenity.icon))
                                    .map((amenity, index) => (
                                        <div className='amenity-container flex-col gap-2 mb-4 ' key={index}>
                                            <div className='flex items-center'>
                                                {amenity.icon === '<TbToolsKitchen />' && <TbToolsKitchen className='w-6 h-6 mr-8' />}
                                                {amenity.icon === '<IoPeopleOutline />' && <IoPeopleOutline className='w-6 h-6 mr-8' />}
                                                {amenity.icon === '<PiMountains />' && <PiMountains className='w-6 h-6 mr-8' />}
                                                {amenity.icon === '<FaRegCalendarCheck />' && <FaRegCalendarCheck className='w-6 h-6 mr-8' />}
                                                {amenity.icon === '<PiDoorBold />' && <PiDoorBold className='w-6 h-6 mr-8' />}
                                                {amenity.icon === '<FaParking />' && <FaParking className='w-6 h-6 mr-8' />}
                                                {amenity.icon === '<GiAtSea />' && <FaParking className='w-6 h-6 mr-8' />}
                                                <p className='font-semibold'>{amenity.description}</p>
                                            </div>
                                            <p className='text-sm text-slate-400 ml-14'>
                                                {amenity.description === 'Kuhinja' && 'Gosti kažu da ovaj dom ima ono što vam je potrebno za kuhanje'}
                                                {amenity.description === 'Besplatno otkazivanje' && 'Dobit če te puni povrat novca ako se predomislite.'}
                                                {amenity.description === 'Samostalni dolazak' && 'Samostalni check-in u smještaj uz pomoć digitalne brave.'}
                                                {amenity.description === 'Besplatan parking' && 'Besplatan parking na lokaciji.'}
                                                {amenity.description === 'Pogled na planine' && 'Imati čete prekrasan pogled na planine iz topline vašega doma.'}
                                                {amenity.description === 'Dijeljenje stana' && 'Ovaj dom dijeliti ćete sa drugim gostima.'}
                                                {amenity.description === 'Pogled na more' && 'Imati čete prekrasan pogled na more iz topline vašega doma.'}
                                                {amenity.description === 'Pogled na jezero' && 'Imati čete prekrasan pogled na jezero iz topline vašega doma.'}

                                            </p>
                                        </div>
                                    ))}
                            </div>  
                        </div>
                        
                        </div>
                        
                       
                               
                    </div>
                    
                    <div className='description-container pb-8 border-b-2 w-full'>
                        <p className='font-semibold'>
                            {listing?.description}
                        </p>
                    </div>
                    <div className='bedroom-container mt-8 border-b-2 w-full'>
                        <h1 className='text-3xl font-semibold'>Gdje ćete spavati</h1>
                        <div className='bedroom-info-container flex gap-4 mt-4'>
                            {listing?.photos.map((photo, index) => (
                                photo.bedroomPhoto && (
                                    <div className='bedroom-photo w-1/2' key={index}>
                                        <img onClick={handleShowPhotos} className='w-3/4 h-3/4 cursor-pointer hover:shadow-lg' src={photo.photoUrl} alt='bedroom photo' />
                                        <h2 className='text-xl mt-2'>{`${index - index + 1}. Spavaća soba`}</h2>                          
                                    </div>
                                )
                            ))}
                    </div>
                </div>
                <div className='offers-container mt-8  w-full'>
                        <h1 className='text-2xl font-bold '>Što ovaj smještaj nudi</h1>
                        <div className='grid grid-cols-2 '>
                            {listing?.amenities.map((amenity, index) => (
                                <div className='amenity-container flex gap-2 mt-4' key={index}>
                                    {amenity.icon === '<FaWifi />' && <FaWifi className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<TbToolsKitchen />' && <TbToolsKitchen className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<FaRegSnowflake />' && <FaRegSnowflake className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<FaTv />' && <FaTv className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<LuWashingMachine />' && <LuWashingMachine className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<BiSolidDryer />' && <BiSolidDryer className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<TbTemperatureSun />' && <TbTemperatureSun className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiCity />' && <PiCity className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<FaUmbrellaBeach />' && <FaUmbrellaBeach className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<FaSkiing />' && <FaSkiing className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<LuHouse />' && <LuHouse className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiBuildingApartment />' && <PiBuildingApartment className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<IoPeopleOutline />' && <IoPeopleOutline className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiMountains />' && <PiMountains className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<FaRegCalendarCheck />' && <FaRegCalendarCheck className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiDoorBold />' && <PiDoorBold className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<MdOutlineBathtub />' && <MdOutlineBathtub className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiSecurityCameraFill />' && <PiSecurityCameraFill className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<FaParking />' && <FaParking className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiHairDryerBold />' && <PiHairDryerBold className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<MdOutlineFireplace />' && <MdOutlineFireplace className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<TbAlarmSmoke />' && <TbAlarmSmoke className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<PiWashingMachineBold />' && <PiWashingMachineBold className='w-6 h-6 mr-8' />}
                                    {amenity.icon === '<MdOutlinePets />' && <MdOutlinePets className='w-6 h-6 mr-8' />}
                                    <p className='font-semibold'>{amenity.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                    <div className='sticky-container w-1/4  relative mb-4 '>
                    <div className='reservation-container z-40 sticky top-0  shadow-2xl flex flex-col w-3/4 h-fit bg-white p-4 border-2 border-gray-200 rounded-lg'>
                            <div>
                                <p className='font-semibold text-2xl'>€ {listing?.price} <span className='font-normal'>noćenje</span></p>
                            </div>
                            <div className='reservation-filter-container flex flex-col mt-4 border-2 border-zinc-500 rounded-lg pb-2 active:border-black'>
                                  <div className='dolazak-odlazak flex justify-center items-center gap-2'>
                                        <Space  direction="horizontal" className='w-full flex justify-center items-center' size={12}>
                                            <div className='p-2 pb-0 flex flex-col justify-center items-center border-e-2   w-full h-full '>
                                                <p className='font-bold w-full text-sm text-left'>Dolazak </p>
                                                <DatePicker format={{                                         
                                                      format: 'DD-MM-YYYY',
                                                      type: 'mask',
                                                    }} variant='borderless' 
                                                    value={reservationDolazak ? dayjs(reservationDolazak, 'DD-MM-YYYY') : undefined}
                                                    defaultValue={dolazak ? dayjs(dolazak, 'DD-MM-YYYY') : undefined}
                                                    className='w-full font-semibold' 
                                                    picker="date" 
                                                    placeholder='Dolazak'
                                                    size='large' 
                                                    onChange={handleReservationDolazakChange}
                                                    disabledDate={handleDisabledDolazakDate}
                                                    />
                                                    
                                            </div>
                                            
                                            <div className='p-2 pb-0 flex flex-col justify-center items-center w-full h-full '>
                                            <p className='font-bold w-full text-sm text-left'>Odlazak </p>
                                                <DatePicker format={{                                         
                                                      format: 'DD-MM-YYYY',
                                                      type: 'mask',
                                                    }} variant='borderless' 
                                                    value={reservationOdlazak ? dayjs(reservationOdlazak, 'DD-MM-YYYY') : undefined}
                                                    defaultValue={odlazak ? dayjs(odlazak, 'DD-MM-YYYY') : undefined}
                                                    className='w-full font-semibold' 
                                                    picker="date" 
                                                    placeholder='Odlazak'
                                                    size='large' 
                                                    onChange={handleReservationOdlazakChange}
                                                    disabledDate={handleDisabledOdlazakDate}
                                                    />
                                                    
                                            </div>
                                        </Space>
                                    </div>  
                                    <div className='gosti w-full relative flex justify-center items-center border-t-2 pb-2 pt-2'>
                                        <div  onClick={() => {handleGostiActive()}} className='input-field w-full pl-7 flex  hover:cursor-pointer '>
                                            <div className='Flex flex-col'>
                                                <label htmlFor="default-input-3" className="block pl-2 text-sm font-bold text-gray-900  align-bottom">Gosti</label>
                                                <p className="outline-none 2xl:text-md rounded-3xl border-gray-300 text-gray-900 font-semibold  p-2">
                                                    {`${gostiReservation === 1 ? 'Unesi broj gostiju' : `Odabrali ste: ${gostiReservation} gostiju`}`}
                                                </p>
                                            </div>
                                            <div>

                                                <MdOutlineKeyboardArrowDown className={`${gostiActive? 'hidden' : 'absolute right-2 top-2 text-2xl'} `} />
                                                <MdOutlineKeyboardArrowUp className={`${gostiActive? 'absolute right-2 top-2 text-2xl' : 'hidden'} `} />
                                            </div>
                                        </div>
                                        <div ref={whoFieldRef}  className={`${(gostiActive) ? 'who-container absolute top-full bg-white shadow-sm z-10 flex flex-col gap-2 p-4' : 'hidden'}`}>
                                       
                                            <div className='grid grid-cols-3'>
                                                {tkoKategorije.map((item, index) => {
                                                        return (
                                                            <AddRemove key={index} index={index} item={item}  handleMinus={() => handleGostiMinus(gostiReservation, setGostiReservation)} handleAdd={() => handleGostiPlus(gostiReservation, setGostiReservation)} />
                                                        );
                                                    })}
                                            </div>
                                        </div>  
                                    </div>            
                            </div>
                            {userIsListingOwner ? (
                                  <div className='flex flex-col items-center justify-center reservation-button-container mt-4'>
                                    <button className='w-3/4 bg-red-500 text-white font-bold p-2 rounded-lg'>Oglas je vaš</button>
                                  </div>
                                ) : (
                                  isReserved ? (
                                    <div className='flex flex-col items-center justify-center reservation-button-container mt-4'>
                                      <button className='w-3/4 bg-red-500 text-white font-bold p-2 rounded-lg'>Oglas je već rezerviran</button>
                                    </div>
                                  ) : (
                                    <div className='flex flex-col items-center justify-center reservation-button-container mt-4'>
                                      <button onClick={handleNavigateToBookingPage} className='w-3/4 bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-700 transition-all duration-100 text-white font-bold p-2 rounded-lg'>Rezerviraj</button>
                                      <p className='mt-2'>Još vam nećemo ništa naplatiti</p>
                                    </div>
                                  )
                                )}
                            
                           
                            <div className='flex flex-col items-center justify-center cost-container mt-4 border-b-2 pb-4'>
                                <div className='flex justify-between w-full mt-2 '>
                                     <p className='underline '>{`€${listing?.price} X ${reservationNights ? reservationNights : 1} noćenja`}</p>
                                     <p>{`€${totalNightsCost}`}</p>               
                                </div>
                                <div className='flex justify-between w-full mt-2 '>
                                     <p className='underline '>Naknada za čišćenje</p>
                                     <p>{`€${totalCleaningFeeCost.toFixed(2)}`}</p>               
                                </div>
                                <div className='flex justify-between w-full mt-2 '>
                                <p className='underline '>Naknada za usluge</p>
                                <p>{`€${totalServicesFeeCost.toFixed(2)}`}</p>             
                                </div>
                            </div>
                            <div className='total-cost-container flex justify-between w-full mt-4 mb-4'>
                                <p>
                                    <span className='font-bold'>Ukupno</span> (sa PDV-om)
                                </p>
                                <p>{`€${totalNightsCost + totalCleaningFeeCost + totalServicesFeeCost}`}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    
                    
                    <div className='bottom mt-8 border-t-2'>
                        <div className='w-full big-rating-container mt-8 pt-8 flex flex-col items-center justify-center'>
                            <div className='flex items-center justify-center gap-2'>
                                  <img src={leftVijenac} alt="vijenac" />
                                  <h1 className='h-full text-8xl'>{listing?.rating}</h1>
                                  <img src={rightVijenac} alt="vijenac" />                  
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>Odabrali gosti</h2>
                            </div>
                        </div>
                    <ListingRatings direction='flex' rating={listing?.rating} numberOfReviews={listing?.numberOfReviews} reviewPercentageList={reviewPercentageList} cleanliness={cleanliness} 
                        precisionRating={precisionRating} checkInRating={checkInRating} locationRating={locationRating} 
                        communicationRating={communication} valueRating={valueRating} />
                    <div className='reviews-container mt-8 border-b-2 pb-8 w-full'>
                        <div className='flex flex-wrap justify-center items-center '>
                            {listing?.reviews.map((review, index) => (
                                <div className='review-container flex-col  w-full h-1/2 mb-10 p-6'>
                                    <div className='flex items-center gap-2'>
                                        <img className='w-10 h-10 rounded-full' src={userIcon} alt="user icon" />
                                        <div className='flex-col gap-1 ml-3'>
                                            <p className='font-semibold'>{review?.author.firstName}</p>
                                            <p >Na airbnbu je {calculateTimePassed(review?.author.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-1 items-center mt-2'>
                                        <div className='flex gap-1 w-14'>
                                            {calculateStarReview(review.numberOfStars)}
                                        </div>
                                        
                                        <p className='ml-2 text-sm'>{`Prije ${calculateTimePassed(review.createdAt)}`}</p>
                                    </div>
                                        <p className='mt-2'>
                                            {expandedReviewIndex === index ? review.description : truncateText(review.description, 100)}
                                            <span
                                                className='cursor-pointer hover:underline font-bold '
                                                onClick={() => toggleShowMore(index)}
                                            >
                                                {`${review.description.length < 100 ? '' : `${expandedReviewIndex === index ? ' Prikaži manje' : ' Prikaži više'}`}`}
                                            </span>
                                        </p>
                                </div>
                            ))}
                            
                        </div>
                        <div>
                            <button onClick={handleShowAllReviews} className='text-base gap-1 mt-4 p-1 text-center border-black  hover:bg-slate-50 hover:shadow-lg border-2 rounded-3xl w-40 h-12'>{`Prikaži ${listing?.numberOfReviews} recenzije`}</button>
                        </div>
                    </div>
                    <div className='location-container  mt-8 w-full'>
                        <div className='flex flex-col gap-2 p-4'>
                            <h1 className='text-2xl font-bold'>Gdje ćete biti</h1>
                            <p>{`${listing?.location.street}, ${listing?.location.city}, ${listing?.location.country}`}</p>
                        </div>
                       
                        <div className='map-container flex justify-center items-center w-full mt-4 p-4'>
                            {isLoaded && listing && lat && lng && (
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '40rem' }}
                                    zoom={15}
                                    center={center}
                                    onLoad={map => setMap(map)}
                                    
                                >
                                {listing && 
                                    <Marker position={center} /> 
                                }
                                 
                                </GoogleMap>
                            )}
                        </div>  
                    </div>
                        <div className='meet-your-host-container mt-8 w-full'>
                            <Profile userHostedListings={[]} likedListings={[]} handleUserChange={() => {}} listings={[]} user={listing?.user} listingPage={true} yearsHosting={yearsHosting} ownProfile={false} handleShowAllReviews={handleShowAllReviews} />
                        </div>  
                    </div>
                    
                </div>
                {showPhotos && <Photos onShowPhotosChange={handleShowPhotos} onDarkScreenChange={handleDarkScreenChange} photos={listing?.photos || []} />}
                {showAllReviews && (
                <div className='fixed inset-0 z-50 flex  justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white w-3/4 h-5/6 p-10 rounded-lg overflow-auto'>
                        <div className='flex justify-end'>
                            <IoMdClose className='w-8 h-8 p-1 cursor-pointer hover:bg-slate-100 rounded-full' onClick={handleShowAllReviews} />
                        </div>
                      
                        <div className='reviews-content flex w-full'>
                        <div className='w-1/2'>
                            <ListingRatings direction='flex-col' rating={listing?.rating} numberOfReviews={listing?.numberOfReviews} reviewPercentageList={reviewPercentageList} cleanliness={cleanliness} 
                        precisionRating={precisionRating} checkInRating={checkInRating} locationRating={locationRating} 
                        communicationRating={communication} valueRating={valueRating} />
                        </div>
                        <div className='w-1/2'>
                        {listing?.reviews.map((review, index) => (
                                <div className='review-container flex-col mb-4' key={index}>
                                    <div className='flex items-center gap-2'>
                                        <img className='w-10 h-10 rounded-full' src={userIcon} alt="user icon" />
                                        <div className='flex-col gap-1 ml-3'>
                                            <p className='font-semibold'>{review?.author.firstName}</p>
                                            <p>Na airbnbu je {calculateTimePassed(review?.author.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-1 items-center mt-2'>
                                        <div className='flex gap-1 w-14'>
                                            {calculateStarReview(review.numberOfStars)}
                                        </div>
                                        <p className='ml-2 text-sm'>{`Prije ${calculateTimePassed(review.createdAt)}`}</p>
                                    </div>
                                    <p className='mt-2'>
                                        {review.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                          
                        </div>
                    </div>
                </div>
            )}
        </div>
    )}
</section>
);
};

export default ListingPage;