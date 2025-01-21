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
    }

    interface Review {
        description: string;
        numberOfStars: number;
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

    useEffect(() => {
        if (listing) {
            const calculatedStars = calculateStarReview(listing.rating);
            setStars(calculatedStars);
        }
    }, [listing]);
    
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

    const handleShowPhotos = () => {
        setShowPhotos(!showPhotos);
    };

    const handleDarkScreenChange = () => {
        setDarkScreen(!darkScreen);
    }




   

    return (
        <section className={`listing-section mt-6  ${darkScreen ? 'bg-black' : ''} ${showPhotos ? 'pr-0 pl-0 ' : 'pr-20 pl-20'}`}>
            {loading ? (<Spinner loading={loading} />) : (
                <div className={`${showPhotos ? ' flex items-center  justify-center' : ''}`}>
                     <div className={`${showPhotos ? 'hidden' : 'listing-container'}  `}>
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
                    <div className='description-container mt-4'>
                        <div className='description-left w-1/2'>
                            {listing && <h2 className='font-bold text-2xl'>{listing.description}</h2>}
                            <div className='flex gap-2 ml-2'>
                                <p className='font-semibold'>{`${listing?.maxGuests} gostiju`}</p>
                                <p className='text-black'>•</p>
                                <p className='font-semibold'>{`${listing?.numberOfBedrooms} spavaćih soba`}</p>
                                <p className='text-black'>•</p>
                                <p className='font-semibold'>{`${listing?.numberOfBeds} kreveta`}</p>   
                            </div>
                            <div className='host-container p-4  w-full flex-col items-center  mt-4'>
                                <div className='flex ribbon-container border-2 h-24 items-center justify-center '>
                                    <img className='mr-4 w-1/4 ' src={guestFavorite} alt="guest favorite" />
                                    <div className='flex w-2/4 items-center justify-center '>
                                        <p className='font-semibold text-lg '>Jedan od najdražih domova na Airbnbu, prema recenzijama gostiju</p>
                                    </div>
                                    
                                    <div className='flex-col w-1/4 justify-center items-center gap-2 '>
                                        <p className='review-score text-center text-2xl font-bold'>{listing?.rating}</p>
                                        <div className='flex gap-1 items-center justify-center'>
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
                </div>
                {showPhotos && <Photos onShowPhotosChange={handleShowPhotos} onDarkScreenChange={handleDarkScreenChange} photos={listing?.photos || []} />}
                </div>
               
                
            )}
        </section>
    );
};

export default ListingPage;