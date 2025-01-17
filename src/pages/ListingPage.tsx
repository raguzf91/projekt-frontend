import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../ui-components/Spinner';
import logo from "../assets/images/logo.png";
const ListingPage = () => {

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
    }
    
    interface Photo {
        photoUrl: string;
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
        reviews: string[];
        category: string;
    }

    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/listing/${id}`);
                const data = await response.json();
                const { listing } = data.data; // Extract listing from data
                setListing(listing);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    return (
                <section className='listing-section'>
                      {loading ? (<Spinner loading={loading} />) : (
                    <header className='flex items-start p-6'>
                       {listing?.title}
                    </header>
                    )}
                </section>
    );
};
export default ListingPage;