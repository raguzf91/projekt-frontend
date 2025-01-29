import { Carousel, ConfigProvider } from "antd";
import React from "react";
import './css/HeroBox.css';
import { IoMdStar } from "react-icons/io";
import { FaHouseUser } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

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

interface HeroBoxProps {
    listing: {
        id: number;
        photos: Photo[];
        title: string;
        location: Location;
        user: User;
        price: number;
        rating: number;
        description: string;
        reviews: string[];
        typeOfListing: string;
    };
    brojNocenja: number;
    navigateToListing: (id: number) => void;
}

const HeroBox: React.FC<HeroBoxProps> = ({ listing, brojNocenja, navigateToListing}) => {
    
    
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
        console.log(brojNocenja);
    };

    return (
        <div  className={"flex flex-col  w-72 bg-inherit text-inherit h-fit pb-16 gap-2 rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer" }>
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            arrowOffset: 8,
                            arrowSize: 24,
                            dotGap: 8,
                            dotHeight: 3,
                            dotOffset: 24,
                        },
                    },
                }}
            >
                <Carousel
                    afterChange={onChange}
                    dots={true}
                    arrows={true}
                    infinite={false}
                    pauseOnHover={true}
                    className="rounded-s-3xl w-full h-3/4"
                >
                    {listing.photos.map((photo, imgIndex) => (
                        <div className="w-full h-full flex items-center justify-center" key={imgIndex}>
                            <img src={`${photo.photoUrl}`} alt={listing.title} className="w-72 h-72 rounded-3xl" />
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>
            <div onClick={() => navigateToListing(listing.id)} className="flex flex-col pl-2 gap-2">
                <div className="flex justify-between items-center ">
                <h2 className="text-xl font-bold">{`${listing.typeOfListing} u ${listing.location.city}`}</h2>
                    <div className="flex gap-1 items-center">
                        {<IoMdStar />}
                        <p className="text-sm font-semibold pr-4">{listing.rating}</p>
                    </div>
                    
                </div>
                
                <p className="text-sm font-bold mt-6">{`${listing.location.city}, ${listing.location.country}`}</p>
                <p className="text-sm font-bold">{`Domaćin je ${listing.user.firstName}`}</p>
                <div className="flex gap-2">
                    <p className="text-sm font-bold">{`€${listing.price} noćenje · `}</p>
                    <p className="text-sm text-gray-700 underline underline-offset-2">{`Ukupno €${listing.price * (isNaN(brojNocenja) ? 1 : brojNocenja)}`}</p>
                </div>
            </div>
        </div>
    );
};

export default HeroBox;