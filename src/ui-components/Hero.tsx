import HeroBox from "./HeroBox";
import smjestaj_1_1 from '../assets/images/smjestaj_1.jpeg';
import smjestaj_1_2 from '../assets/images/smjestaj_1_2.jpeg';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface HeroProps {
    brojNocenja: number;
    menuFilter: string;
    navigateToListing: (id: number) => void;
    filters: any;
};



const Hero : React.FC<HeroProps> = ({brojNocenja, menuFilter, navigateToListing, filters}) => {

    const [listings, setListings] = useState<[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllListings = async () => {
            if(filters !== null) {
               console.log(filters);
    
                const minimalPrice = filters.minimalPrice;
                const maximalPrice = filters.maximalPrice;
                const bedrooms = filters.rooms[0].bedrooms;
                const beds = filters.rooms[1].beds;
                const bathrooms = filters.rooms[2].bathrooms;
                const amenities = filters.amenities;
                const location = filters.location;
                const typeOfListing = filters.typeOfListing;
                const speaksLanguages = filters.speaksLanguages;
    
                const apiUrl = `http://localhost:8080/api/listing/filter?brojNocenja=${brojNocenja}&kategorija=${kategorija}&cenaOd=${cenaOd}&cenaDo=${cenaDo}&ocena=${ocena}`;
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
           
        };
        fetchAllListings();
      }, [filters, brojNocenja]);

   
    

  

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
    }, [menuFilter]);



    
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