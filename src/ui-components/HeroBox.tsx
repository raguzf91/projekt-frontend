import { Carousel, ConfigProvider } from "antd";
import React from "react";
import './css/HeroBox.css';

interface HeroBoxProps {
    content: {
        image: string[];
        title: string;
        location: string;
        owner: string;
        price: number;
        rating: number;
        description: string;
    };
    brojNocenja: number;
    onClick: () => void;
}

const HeroBox: React.FC<HeroBoxProps> = ({ content, brojNocenja, onClick }) => {

    
    
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
        console.log(brojNocenja);
    };

    return (
        <div className="flex flex-col  w-72 bg-inherit text-inherit h-fit pb-16 gap-2 rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer ">
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
                    className="rounded-s-3xl w-full h-full"
                >
                    {content.image.map((image, imgIndex) => (
                        <div className="w-full h-full flex items-center justify-center" key={imgIndex}>
                            <img src={image} alt={content.title} className="w-full h-full rounded-3xl" />
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>
            <div className="flex flex-col pl-2 gap-2">
                <h2 className="text-xl font-bold">{content.title}</h2>
                <p className="text-sm font-semibold">{content.location}</p>
                <p className="text-sm font-semibold">{`Domaćin je ${content.owner}`}</p>
                <div className="flex gap-2">
                    <p className="text-sm font-bold">{`€${content.price} noćenje · `}</p>
                    <p className="text-sm text-gray-700 underline underline-offset-2">{`Ukupno €${content.price * (isNaN(brojNocenja) ? 1 : brojNocenja)}`}</p>
                </div>
            </div>
        </div>
    );
};

export default HeroBox;