import { Carousel } from "antd";
import React from "react";
import smjestaj_1_1 from '../assets/images/smjestaj_1.jpeg';
import smjestaj_1_2 from '../assets/images/smjestaj_1_2.jpeg';
const HeroBox: React.FC = () => {
    const placeTest = [
        {image: {smjestaj_1_1, smjestaj_1_2 }, title: "Smjestaj 1", location: "Pišece, Slavonija", owner: "Uršula", price: 100, rating: 4.5, location: "Sarajevo", description: "Ovo je smjestaj 1"},
    ]
    const ukupno = 100;

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '75%',
        width: '100%',
        borderTopLeftRadius: '1.5rem' /* 24px */,
        borderBottomLeftRadius: '1.5rem' /* 24px */,
    }

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };
    
    return(
        <div className="flex flex-col w-full h-96 bg-inherot text-inherit">
            <Carousel afterChange={onChange} dots={true} arrows={true} infinite={false} className="rounded-s-3xl w-full h-3/4">
                {placeTest.map((place) => (
                        <div>
                             {Object.values(place.image).map((image: string) => (
                                <div>
                                    <img  src={image} alt="place" />
                                </div>
                            
                        ))}
                        </div>
                       
            
                ))}
            </Carousel>
            <div>
                <h2 className="text-2xl font-bold">{placeTest[0].title}</h2>
            </div>
            <div>
                <p className="text-sm font-semibold">{placeTest[0].location}</p>
            </div>
            <div>
                <p className="text-sm font-semibold">{` Domaćin je  ${placeTest[0].owner}` }</p>
            </div>
            <div className="flex justify-between">
                <p className="text-sm font-bold">{` €${placeTest[0].price} noćenje · `}</p>
                <p className="text-sm text-gray-300 underline underline-offset-2">{`€${ukupno}`}</p>
            </div>
            
            

            
        </div>
    );
};
export default HeroBox;