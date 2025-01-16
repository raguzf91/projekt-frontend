import HeroBox from "./HeroBox";
import smjestaj_1_1 from '../assets/images/smjestaj_1.jpeg';
import smjestaj_1_2 from '../assets/images/smjestaj_1_2.jpeg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface HeroProps {
    brojNocenja: number;
    menuFilter : string;
};



const Hero : React.FC<HeroProps> = ({brojNocenja, menuFilter}) => {

    

    const [listings, setListings] = useState<[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleNavigateToListing = (id: number) => {
        navigate(`/listing/${id}`);
    };

    useEffect(() => {
        const fetchAllListings = async () => {
            const apiUrl =  'http://localhost:8080/api/listing/all';
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
        };
        fetchAllListings();
    },[]);



    
    return(
        <section className="hero flex gap-8 justify-center  flex-wrap mr-24 ml-24 mt-8  h-screen">
            { loading ? (<Spinner loading={loading}/>) : (
                listings.map((item, index) => (
                    <HeroBox key = {index} listing = {item} menuCategory={menuFilter} brojNocenja = {brojNocenja} onClick={() => handleNavigateToListing}  />
                ))
            )}
        </section>
    );
};
export default Hero;