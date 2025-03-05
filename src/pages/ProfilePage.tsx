import { useEffect, useState } from "react";
import Profile from "../ui-components/Profile";
import { useUser } from "../context/UserContext";
import dayjs from "dayjs";
import { useNavbarFilter } from "../context/NavbarFilterProvider";
import { useParams} from "react-router-dom";
import Cookies from "js-cookie";

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

const ProfilePage = () => {
    const [showAllReviews, setShowAllReviews] = useState(false);
    const handleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };
    const [userById, setUserById] = useState<any>();
    const {user} = useUser();

    //const [searchParams] = useSearchParams();
    //const paramsId = searchParams.get('id');
    //console.log("paramsId: " + paramsId);

    const { id } = useParams();
    const paramsId = Number(id);

    const userId = user ? user.id : null;
      
    const ownProfile = userId === paramsId;

    const accessToken = Cookies.get('access_token');

    const [yearsHosting, setYearsHosting] = useState(0);
    const [listings, setListings] = useState<Listing[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const { setHideNavbar} = useNavbarFilter();

    useEffect(() => {
                setHideNavbar(true);
                return () => setHideNavbar(false); // Reset the navbar visibility when the component unmounts
        
        }, [setHideNavbar]);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                console.log("userId: " + userId);
                const response = await fetch(`http://localhost:8080/api/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    const {user} = data.data;
                    console.log("user: " + JSON.stringify(user));
                    handleUserChange(user);
                    const createdAt = dayjs(user.createdAt);
                            const yearsPassed = dayjs().diff(createdAt, 'year');
                            setYearsHosting(yearsPassed + 3);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if(userId) {
            fetchUser();
        }
        

    }, [userId]);

    const handleUserChange = (user: User) => {
        setUserById(user);
    };



   

    useEffect(() => {
        const fetchReservations = async () => {
            console.log("fetching reservations");
            console.log("paramsId: " + paramsId);
            console.log("accessToken: " + accessToken);
            try {
                const response = await fetch(`http://localhost:8080/api/user/${paramsId}/reservations` , 
    
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'AUTHORIZATION' : `Bearer ${accessToken}` 
                        }
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    const {reservations} = data.data;
                    console.log("reservations: " + JSON.stringify(reservations));
                    setReservations(reservations);
                    if(reservations.length > 0) {
                        const listings = reservations.map((reservation: Reservation) => reservation.listing);
                        setListings(listings);
                        reservations.forEach((reservation: Reservation) => {
                            const reservedFrom = dayjs(reservation.reservedFrom);
                            const reservedUntil = dayjs(reservation.reservedUntil);
                            const numberOfNights = reservedUntil.diff(reservedFrom, 'day');
                            reservation.listing.numberOfNights = numberOfNights;
                            reservation.listing.reservedFrom = reservedFrom.format('DD/MM/YYYY');
                            reservation.listing.reservedUntil = reservedUntil.format('DD/MM/YYYY');
                            reservation.listing.reservationId = reservation.id;
                            reservation.listing.canceled = reservation.canceled;
                        }
                        );
                        
                    }
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReservations();
    }, [paramsId, accessToken]);



   
   
    return (
        <div className="container w-full h-fit flex justify-center items-center">
           
            {(userById) &&
             <div className="flex flex-col w-full h-full items-center justify-center">
                <Profile  setReservations={setReservations} listings={listings} user={userById} handleUserChange={handleUserChange} listingPage={false} yearsHosting={yearsHosting} ownProfile={ownProfile} handleShowAllReviews={handleShowAllReviews} />
            </div>
            }
            
            
        </div>
    );
};
export default ProfilePage;