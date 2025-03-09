import React, { useEffect, useState } from 'react';
import userIcon from '../assets/images/userIcon.png';
import { IoMdStar } from "react-icons/io";
import Spinner from './Spinner';
import { IoMdGlobe } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import HeroBox from './HeroBox';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';


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
    gender: string;
    averageRating: number | undefined;
    bio: string;
    numberOfReviews: number;
    city: string;
    country: string;
}

interface Review {
    description: string;
    id: number
    userId: number;
    receiverId: number;
    numberOfStars: number;
    listingId: number;
    author: User;
    createdAt: string;
}

interface Photo {
  photoUrl: string;
  name: string;
  bedroomPhoto: boolean;
}

interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  address: string;
  zipCode: string;
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
  numberOfNights: number;
  typeOfListing: string;
  reservedFrom: string;
  reservedUntil: string;
  reservationId: number;
  canceled: boolean;
}

interface Reservation {
  id: number;
  listing: Listing;
  reservedFrom: string;
  reservedUntil: string;
  canceled: boolean;
}



interface ProfileProps {
    user : User
    listingPage: boolean;
    yearsHosting: number;
    ownProfile: boolean;
    handleShowAllReviews: () => void;
    handleUserChange: (user: User) => void;
    listings: Listing[];
    setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
    likedListings: Listing[];
    userHostedListings: Listing[];
    // MORAS DODATI ALLREVIEWS (NAPRAVI QUERY BACKEND KOJI CE POBROJATI SVE REVIEWS NA LISTINGE SA OVIM USER IDOM,  )
    // DODAJ AVERAGE RATING SCORE (NAPRAVI QUERY BACKEND KOJI CE POBROJATI SVE REVIEWS NA LISTINGE SA OVIM USER IDOM,  POBROJAT NJIHOVE OCJENE I IZRACUNATI PROSJEK)
    //
};



const Profile: React.FC<ProfileProps> = ({user, listingPage, yearsHosting, ownProfile, handleShowAllReviews, handleUserChange, listings, setReservations, likedListings, userHostedListings}) => {
    const [numberOfReviews, setNumberOfReviews] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [reviews , setReviews] = useState<Review[]>([]);
    const accessToken = Cookies.get('access_token');
    const { user: currentUser } = useUser();

    const currentDate = dayjs().format('YYYY-MM-DD');


    const [expandedReviewIndex , setExpandedReviewIndex] = useState<number>(-1);
    const toggleShowMore = (index: number) => {
        setExpandedReviewIndex(expandedReviewIndex === index ? -1 : index);
    };

    useEffect(() => {
        handleUserChange(user);
    }, [handleUserChange, user]);

    const truncateText = (text: string, length: number) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };
    useEffect(() => {
        const fetchReviews = async () => {
          console.log("user city:", user?.city);
          console.log("average rating:", user?.averageRating);
          try {
            const response = await fetch(`http://localhost:8080/api/user/reviews/${user?.id}`);
            if (response.ok) {
              const data = await response.json();
              const {reviews} = data.data;
              console.log("reviews" + reviews);
              const numberOfReviews = reviews.length;
              setNumberOfReviews(numberOfReviews);
              setReviews(reviews);
            } else {
              console.error('Error fetching data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchReviews();
      }, [user?.averageRating, user?.city, user?.id]);

      const reviewPostedAgo = (date: string) => {
        const currentDate = new Date();
        const reviewDate = new Date(date);
        const difference = currentDate.getTime() - reviewDate.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
    
        if (years > 0) {
          return ` prije ${years} ${years === 1 ? 'godina' : 'godine'} `;
        } else if (months > 0) {
          return `prije ${months} ${months === 1 ? 'mjesec' : 'mjeseci'} `;
        } else {
          return `prije ${days} ${days === 1 ? 'dan' : 'dana'} `;
        }
      };

      const navigate = useNavigate();

      const handleNavigateToHome = () => {
        
        navigate("/");
    };

    const handleNavigateToEditProfile = () => {
        navigate(`/profile/${user?.id}/edit-profile/`);
    };


    const handleCancelReservation = async (reservationId: number) => {
      console.log("reservationId: " + reservationId);
      try {
        const response = await fetch(`http://localhost:8080/api/user/${currentUser?.id}/reservations/${reservationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${accessToken}` 
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("data: " + JSON.stringify(data));
          const { reservations } = data.data;
          console.log("reservations: " + JSON.stringify(reservations));
          setReservations(reservations);
          toast.success('Rezervacija je uspješno otkazana');
        } else {
          console.error('Error fetching data:', response.statusText);
          toast.error('Došlo je do greške prilikom otkazivanja rezervacije');
        }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
     


    return (
        <>
        {loading ? <p><Spinner loading={loading}/></p> :
          <section className='flex flex-col w-full h-fit'>
            <header className='flex justify-start items-center w-full p-4'>
                    <img src={logo} onClick={handleNavigateToHome} className='p-8 2xl:w-48 xl:w-32 md:w-32 md:mr-6 cursor-pointer' alt="logo" />
                </header>
            <div className={` ${listingPage ? 'bg-white' : 'pr-20 pl-20'} flex  profile container w-full h-full shadow-2xl p-10   `}>
             
            <div className="left-profile-container flex flex-col  w-1/3 pr-20">
                <div className="general-info-container p-4  flex items-center shadow-2xl w-full rounded-3xl">
                    <div className="left-general-info-container p-4 flex flex-col items-center">	
                        <div>
                            <img src={user.profilePhoto} alt="profile" className="rounded-full h-28 w-28 border-2" />
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold">{user.firstName}</h1>
                            <p className="text-sm">Domaćin</p>
                        </div>
                    </div>
                    <div className='rigth-general-info-container flex flex-col w-1/2 items-center p-4'>
                       <div className='flex flex-col w-full pb-2 border-b  items-center justify-center '>
                            <p className='text-2xl font-bold'>{numberOfReviews}</p>
                            <p className='text-sm'>Recenzija</p>
                       </div>
                       <div className='flex flex-col w-full pb-2 items-center justify-center  border-b mt-2 '>
                        <div className='flex items-center justify-center gap-1'>
                            <p className='text-2xl font-bold'>{(user.averageRating ?? 0).toFixed(2)}</p>
                            <IoMdStar className='w-6 h-6' />
                        </div>
                            <p className='text-sm'>Ocjena</p>
                       </div>
                       <div className='flex flex-col w-full pb-2 items-center justify-center mt-2'>
                            <p className='text-2xl font-bold'>{yearsHosting}</p>
                            <p className='text-sm text-center'>Godina domaćin</p>
                       </div>
                    </div>
                </div>
                {ownProfile && 
                  <div className="edit-profile-button-container flex  mt-4">
                    <button onClick={handleNavigateToEditProfile} className="edit-profile-button bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-700 transition-all duration-100 text-white p-2 rounded-2xl">Uredi profil</button>
                   </div>
                }
                
            </div>
            <div className="right-profile-container flex flex-col w-2/3">
                    <h1 className='text-4xl mb-4 font-bold'>{`Tko je ${user?.firstName}`}</h1>
                    <div className='flex mt-8 justify-between w-1/2  '>
                        <div className='flex '>
                            <IoMdGlobe className='w-6 h-6 mr-4' />
                            <p className=''>
    {user?.city ? `Živi u ${user.city}, ${user.country}` : 'Korisnik nije podijelio gdje živi'}
</p>                        </div>
                       <div className='flex '>
                            <IoLanguage className='w-6 h-6 mr-4' />
                            <p className=''>
    {user?.speaksLanguages && user.speaksLanguages.length > 0 
        ? `Govori ${user.speaksLanguages.join(', ')}` 
        : 'Korisnik nije podijelio koje jezike zna'}
</p>                        </div> 
                    </div>
                    <div className='mt-8 border-b-2 pb-8'>
                        <p>{user?.bio}</p>
                    </div>
                    <div className='flex flex-col mt-12'>
                    <div className="user-hosted-listings flex flex-col mt-8">
                            <h2 className='text-3xl'>{`${ownProfile ? 'Moji' : `${user?.gender === 'male' ? 'Njegovi' : 'Njezini'}`} oglasi`}</h2>
                            {userHostedListings.length > 0 ? 
                            <div className="flex flex-wrap gap-4 mt-4">
                                {userHostedListings.map((listing, index) => (
                                  <div className='flex flex-col w-1/3'>
                                      <HeroBox key={index} listing={listing} brojNocenja={listing.numberOfNights} navigateToListing={() => navigate(`/listing/${listing.id}`)} />
                                 </div>
                                    
                                ))}
                            </div> : <p>Nema oglasa</p> 
                          }
                             
                        </div>
                        <div className="listings flex flex-col mt-12">
                            <h2 className='text-3xl'>{`${ownProfile ? 'Moje' : `${user?.gender === 'male' ? 'Njegove' : 'Njezine'}`} rezervacije`}</h2>
                            {listings.length > 0 ? 
                            <div className="flex flex-wrap gap-4 mt-4">
                                {listings.map((listing, index) => (
                                  <div className='flex flex-col w-1/3'>
                                      <HeroBox  key={index} listing={listing} brojNocenja={listing.numberOfNights} navigateToListing={() => navigate(`/listing/${listing.id}`)} />
                                        {listing.canceled ? <p>Rezervacija je otkazana</p> : (
                                          dayjs(currentDate).isBefore(dayjs(listing.reservedFrom)) ? (
                                            <button onClick={() => handleCancelReservation(listing.reservationId)} className=' bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-700 transition-all duration-100 text-white p-4 rounded-lg shadow-lg mt-4 w-1/2'>Otkaži rezervaciju</button> 
                                         ) : dayjs(currentDate).isAfter(dayjs(listing.reservedUntil)) ? (
                                           <p>Rezervacija je završila</p>
                                         ) : <p>Rezervacija je u tijeku</p>
                                        )}
                                       
                                        
                                        
                                  </div>
                                    
                                ))}
                            </div> : <p>Nema rezervacija</p> 
                          }
                             
                        </div>
                        <div className="liked-listings flex flex-col mt-12">
                            <h2 className='text-3xl'>{`${ownProfile ? 'Sviđa mi se' : `Sviđa ${user?.gender === 'male' ? 'mu' : 'joj'} se`}`}</h2>
                            {likedListings.length > 0 ? 
                            <div className="flex flex-wrap gap-4 mt-4">
                                {likedListings.map((listing, index) => (
                                  <div className='flex flex-col w-1/3'>
                                      <HeroBox  key={index} listing={listing} brojNocenja={listing.numberOfNights} navigateToListing={() => navigate(`/listing/${listing.id}`)} />
                                 </div>
                                    
                                ))}
                            </div> : <p>Nema oglasa u Sviđa mi se</p> 
                          }
                             
                        </div>

                        <div className='flex justify-between mt-12'>
                            <h2 className='text-3xl'>{`${ownProfile ? 'Moje' : `${user?.gender === 'male' ? 'Njegove' : 'Njezine'}`} recenzije`}</h2>
                            
                        </div>
                        <div className='reviews-container mt-8 flex '>
                            {reviews.slice(0, 3).map((review, index) => (
                              <div key={index} className='review-card flex flex-col justify-between w-1/3 mr-4 border-2 p-4 rounded-3xl shadow-2xl h-56'>
                                <p className='mt-2'>
                                  {expandedReviewIndex === index ? review.description : truncateText(review.description, 100)}
                                  
                                </p>
                                <div className='flex items-center gap-2'>
                                  {review.author.profilePhoto ? <img src={review.author.profilePhoto} alt="profile" className="rounded-full h-10 w-10 border-2" /> : <img src={userIcon} alt="profile" className="rounded-full h-10 w-10 border-2" />}
                                  <div className='flex flex-col'>
                                    <p>{review.author.firstName}</p>
                                    <p>{reviewPostedAgo(review.createdAt)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                        </div>
                        <div>
                           {reviews.length > 0 ?  
                           <p onClick={handleShowAllReviews} className='underline mt-8 cursor-pointer'>{`Prikaži sve recenzije ${listingPage ? 'za ovaj apartman' : 'za ovoga korisnika'} `}</p>
                          
                           : <p>Nema recenzija</p>}
                                
                        </div>
                        
                    </div>

                    
            </div>
        </div>
        </section>
        }
        </>
        
    );
};
export default Profile;


