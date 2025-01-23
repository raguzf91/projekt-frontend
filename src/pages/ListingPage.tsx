import React, { useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../ui-components/Spinner';
import { useSearchParamsContext } from '../context/SearchParamsContext';
import { useNavbarFilter } from '../context/NavbarFilterProvider';
import { LuHeart } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
import Photos from '../ui-components/Photos';
import guestFavorite  from '../assets/images/guestFavorite.png';
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
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
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
import { IoMdStar } from "react-icons/io";
import { Flex, Progress } from 'antd';
import { PiSprayBottleBold } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { LuKeyRound } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiChat2 } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import ListingRatings from '../ui-components/ListingRatings';

interface ListingPageProps {
    location: string;
    period: string;
    numberOfGuests: number;
}

const ListingPage: React.FC<ListingPageProps> = () => {
    const { id } = useParams();

    interface Location {
        city: string;
        country: string;
        address: string;
        zipcode: string;
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
        
    }

    interface Photo {
        photoUrl: string;
        name: string;
        bedroomPhoto: boolean;
    }

    interface Review {
        description: string;
        numberOfStars: number;
        cleanliness: number;
        communication: number;
        precision: number;
        location: number;
        checkIn: number;
        value: number;
        user: User;
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
        category: string;
        maxGuests: number;
        numberOfBeds: number;
        numberOfBedrooms: number;
        numberOfReviews: number;
        secondaryTitle: string;
        typeOfListing: string;
        amenities: Amenity[]
    }

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
                console.log("Listing data: ", listingData);
                setListing(listingData);
                if (listingData && !handleListingFilterChangeCalled.current) {
                    console.log("doslovno samo jednom treba da se pozove");
                    handleListingFilterChange(`${listingData.location.city}, ${listingData.location.country}`, dolazak, odlazak, gosti);
                    handleListingFilterChangeCalled.current = true;

                    const createdAt = dayjs(listingData.user.createdAt);
                    const yearsPassed = dayjs().diff(createdAt, 'year');
                    setYearsHosting(yearsPassed + 3);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
        
    }, [id, dolazak, odlazak, gosti, handleListingFilterChange]);

    const calculateTimePassed = (date: string) => {
        const createdAt = dayjs(date);
        const yearsPassed = dayjs().diff(createdAt, 'year');
        const monthsPassed = dayjs().diff(createdAt, 'month');
        const daysPassed = dayjs().diff(createdAt, 'day');
        const timePassed = yearsPassed > 0 ? `${yearsPassed} godina` : monthsPassed > 0 ? `${monthsPassed} mjeseci` : `${daysPassed} dana`;
        return timePassed;
    };

    const handleShowPhotos = () => {
        console.log("show photos");
        setShowPhotos(!showPhotos);
        console.log(showPhotos);
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




   

    return (
        <section className={`listing-section mt-6  ${darkScreen ? 'bg-black' : ''} ${showPhotos ? 'pr-0 pl-0 ' : 'pr-40 pl-40'}`}>
            {loading ? (<Spinner loading={loading} />) : (
                <div className={`${showPhotos ? ' flex items-center  justify-center' : ''}`}>
                     {showAllReviews && <div className="fixed inset-0 bg-black opacity-50"></div>}
                     <div className={`${showPhotos ? 'hidden' : 'listing-container'} `}>
                        <div className='title-container flex justify-between items-center'>
                            {listing && <h1 className='font-bold text-3xl'>{listing.title}</h1>}
                            <div className='like-container flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 hover:text-red-500'>
                                <LuHeart className='w-6 h-6 ' />
                                <p className='underline underline-offset-2 text-lg'>Spremi</p>
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
                    <div className='main-description-container w-3/4 mt-4 border-b-2 pb-4'>
                        <div className='description-left w-full'>
                            {listing && <h2 className='font-bold text-2xl'>{listing.secondaryTitle}</h2>}
                            <div className='flex gap-2'>
                                <p className='font-semibold'>{`${listing?.maxGuests} gostiju`}</p>
                                <p className='text-black'>•</p>
                                <p className='font-semibold'>{`${listing?.numberOfBedrooms} spavaćih soba`}</p>
                                <p className='text-black'>•</p>
                                <p className='font-semibold'>{`${listing?.numberOfBeds} kreveta`}</p>   
                            </div>
                            <div className='host-container p-4  w-full flex-col items-center  mt-4'>
                                <div className='flex ribbon-container border-2 h-24  items-center justify-center  '>
                                    <img className='mr-4  xl:h-3/4  md:w-1/4 2xl:w-1/5 ' src={guestFavorite} alt="guest favorite" />
                                    <div className='flex w-2/4 items-center justify-center '>
                                        <p className='font-semibold xl:text-base md:text-sm 2xl:text-lg '>Jedan od najdražih domova na Airbnbu, prema recenzijama gostiju</p>
                                    </div>
                                    
                                    <div className='flex-col w-1/4 justify-center items-center gap-2 '>
                                        <p className='review-score text-center 2xl:text-2xl md:text-xl font-bold'>{listing?.rating}</p>
                                        <div className='flex md:w-full xl:w-full gap-1 items-center justify-center'>
                                            {stars}
                                        </div>
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
                        </div>
                       
                             
                    </div>
                    <div className='amenities-container mt-8 border-b-2 w-3/4'>
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
                                                <p className='font-semibold'>{amenity.description}</p>
                                            </div>
                                            <p className='text-sm text-slate-400 ml-14'>
                                                {amenity.description === 'Kuhinja' && 'Gosti kažu da ovaj dom ima ono što vam je potrebno za kuhanje'}
                                                {amenity.description === 'Besplatno otkazivanje' && 'Dobit če te puni povrat novca ako se predomislite.'}
                                                {amenity.description === 'Samostalni dolazak' && 'Samostalni check-in u smještaj uz pomoć digitalne brave.'}
                                                {amenity.description === 'Besplatan parking' && 'Besplatan parking na lokaciji.'}
                                                {amenity.description === 'Pogled na planine' && 'Imati čete prekrasan pogled na planine iz topline vašega doma.'}
                                                {amenity.description === 'Dijeljenje stana' && 'Ovaj dom dijeliti ćete sa drugim gostima.'}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                    <div className='description-container mt-8 pb-8 border-b-2 w-3/4'>
                        <p className='font-semibold'>
                            {listing?.description}
                        </p>
                    </div>
                    <div className='bedroom-container mt-8 border-b-2 w-3/4'>
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
                <div className='offers-container mt-8 border-b-2 w-3/4'>
                        <h1 className='text-2xl font-bold '>Što ovaj smještaj nudi</h1>
                        <div className='grid grid-cols-2 p-8'>
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
                    <ListingRatings direction='flex' rating={listing?.rating} numberOfReviews={listing?.numberOfReviews} reviewPercentageList={reviewPercentageList} cleanliness={cleanliness} 
                        precisionRating={precisionRating} checkInRating={checkInRating} locationRating={locationRating} 
                        communicationRating={communication} valueRating={valueRating} />
                    <div className='reviews-container mt-8 border-b-2 pb-8 w-3/4'>
                        <div className='flex flex-wrap '>
                            {listing?.reviews.map((review, index) => (
                                <div className='review-container flex-col  w-1/3 h-1/2 mb-10 p-6'>
                                    <div className='flex items-center gap-2'>
                                        <img className='w-10 h-10 rounded-full' src={userIcon} alt="user icon" />
                                        <div className='flex-col gap-1 ml-3'>
                                            <p className='font-semibold'>{review?.user.firstName}</p>
                                            <p >Na airbnbu je {calculateTimePassed(review?.user.createdAt)}</p>
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
                                            <p className='font-semibold'>{review?.user.firstName}</p>
                                            <p>Na airbnbu je {calculateTimePassed(review?.user.createdAt)}</p>
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