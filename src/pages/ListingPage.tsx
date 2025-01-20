import React, { useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../ui-components/Spinner';
import { useSearchParamsContext } from '../context/SearchParamsContext';
import { useNavbarFilter } from '../context/NavbarFilterProvider';

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
    const { searchParams, setSearchParams } = useSearchParamsContext();
    const { dolazak, odlazak, gosti, handleListingFilterChange } = useNavbarFilter();
    const handleListingFilterChangeCalled = useRef(false);

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
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, dolazak, odlazak, gosti, handleListingFilterChange]);




   

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