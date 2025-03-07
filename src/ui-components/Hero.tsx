import HeroBox from "./HeroBox";
import smjestaj_1_1 from '../assets/images/smjestaj_1.jpeg';
import smjestaj_1_2 from '../assets/images/smjestaj_1_2.jpeg';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import Spinner from "./Spinner";

interface HeroProps {
    brojNocenja: number;
    menuFilter: string;
    navigateToListing: (id: number) => void;
    filters: any;
    filteredListings: any[];
};



const Hero : React.FC<HeroProps> = ({brojNocenja, menuFilter, navigateToListing, filters, filteredListings}) => {

    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(filteredListings.length > 0) {
            setListings(filteredListings);
            setLoading(false);
        }
    }, [filteredListings]);



    

    const fetchAllListings = useCallback(async () => {
        if(filters !== null) {
           console.log(filters);

            const minimalPrice = filters.minimalPrice !== 0 ? filters.minimalPrice : undefined;
            const maximalPrice = filters.maximalPrice !== 10000 ? filters.maximalPrice : undefined;
            console.log(minimalPrice);
            console.log(maximalPrice);
            const bedrooms = filters.rooms[0].bedrooms !== 0 ? filters.rooms[0].bedrooms : undefined;
            const beds = filters.rooms[1].beds !== 0 ? filters.rooms[1].beds : undefined;
            const bathrooms = filters.rooms[2].bathrooms !== 0 ? filters.rooms[2].bathrooms : undefined;
            const amenities = filters.amenities.length > 0 ? filters.amenities : undefined;
            const location = filters.location !== '' ? filters.location : undefined;
            const typeOfListing = filters.typeOfListing !== '' ? filters.typeOfListing : undefined;
            const speaksLanguages = filters.speaksLanguages.length > 0 ? filters.speaksLanguages : undefined;
            const apiFilters = [
                ...(minimalPrice !== undefined ? [{ minimalPrice }] : []),
                ...(maximalPrice !== undefined ? [{ maximalPrice }] : []),
                ...(bedrooms !== undefined ? [{ bedrooms }] : []),
                ...(beds !== undefined ? [{ beds }] : []),
                ...(bathrooms !== undefined ? [{ bathrooms }] : []),
                ...(amenities !== undefined ? [{ amenities }] : []),
                ...(location ? [{ location }] : []),
                ...(typeOfListing ? [{ typeOfListing }] : []),
                ...(speaksLanguages && speaksLanguages.length > 0 ? [{ speaksLanguages }] : []),
              ];



            console.log(apiFilters);
            const apiUrl =  `http://localhost:8080/api/listing/filter?${apiFilters.map((filter: any) => Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')).join('&')}`;
            console.log(apiUrl);
            try {
                const response = await fetch(apiUrl);
                const listingsResponse = await response.json();
                const { data } = listingsResponse;
                const { listings } = data;
                setListings(listings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            return;
        } else {   
            const apiUrl =  `http://localhost:8080/api/listing/all`;
            console.log(apiUrl);
            try {
                const response = await fetch(apiUrl);
                const listingsResponse = await response.json();
                const {data} = listingsResponse
                const {listings} = data;
                setListings(listings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }  
        }
       
    }, [filters]);

    useEffect(() => {
       
        fetchAllListings();
      }, [fetchAllListings]);

   
    

  

    useEffect(() => {
        if (menuFilter !== '') {
            const fetchAllListingsByCategory = async () => {
                const apiUrl = `http://localhost:8080/api/listing/category/${menuFilter}`;
                console.log(apiUrl);
                try {
                    const response = await fetch(apiUrl);
                    const listingsResponse = await response.json();
                    const { data } = listingsResponse;
                    const { listings } = data;
                    setListings(listings);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAllListingsByCategory();
            if(menuFilter === 'Sve') {
                fetchAllListings();
            
        }
    }
    }, [menuFilter, fetchAllListings]);



    
    return(
        <section className="hero flex gap-8 justify-center  flex-wrap mr-24 ml-24 mt-8  h-screen">
            { loading ? (<Spinner loading={loading}/>) : (
                listings.map((item, index) => (
                    <HeroBox key = {index} listing = {item} brojNocenja = {brojNocenja} navigateToListing={navigateToListing}   />
                ))
            )}
        </section>
    );
};
export default Hero;