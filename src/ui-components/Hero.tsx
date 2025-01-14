import HeroBox from "./HeroBox";
import smjestaj_1_1 from '../assets/images/smjestaj_1.jpeg';
import smjestaj_1_2 from '../assets/images/smjestaj_1_2.jpeg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface HeroProps {
    brojNocenja: number;
};

const Hero : React.FC<HeroProps> = ({brojNocenja}) => {

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleNavigateToListing = (id: number) => {
        navigate(`/listing/${id}`);
    };

    useEffect(() => {
        const fetchAllListings = async () => {
            const apiUrl =  '/api/listings/all';

            try {
                const response = await fetch(apiUrl);
                const listings = await response.json();
                setListings(listings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    },[]);

    const placeTest = [
        { id: 1, image: [smjestaj_1_1, smjestaj_1_2], title: "Smjestaj 1", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, description: "Ovo je smjestaj 1" },
        { id: 2, image: [smjestaj_1_1, smjestaj_1_2], title: "Smjestaj 2", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, description: "Ovo je smjestaj 2" },
        { id: 3, image: [smjestaj_1_1, smjestaj_1_2], title: "Smjestaj 3", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, description: "Ovo je smjestaj 3" },
        { id: 4, image: [smjestaj_1_1, smjestaj_1_2], title: "Smjestaj 4", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, description: "Ovo je smjestaj 4" },
        { id: 5, image: [smjestaj_1_1, smjestaj_1_2], title: "Smjestaj 5", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, description: "Ovo je smjestaj 5" },
        { id: 6, image: [smjestaj_1_1, smjestaj_1_2], title: "Smjestaj 6", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, description: "Ovo je smjestaj 6" },
    ];
    
    return(
        <section className="hero flex gap-8 justify-center  flex-wrap mr-24 ml-24 mt-8  h-screen">
            { loading ? (<Spinner/>) : (
                placeTest.map((item, index) => (
                    <HeroBox key = {index} content = {item} brojNocenja = {brojNocenja} onClick={() => handleNavigateToListing}  />
                ))
            )}
        </section>
    );
};
export default Hero;