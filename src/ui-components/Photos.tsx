import React, { useEffect } from "react";
import { useState } from "react";
import { Carousel, ConfigProvider } from "antd";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import './css/Photos.css';
interface Photo {
    photoUrl: string;
}

interface PhotosProps {
    photos: Photo[];
    onDarkScreenChange : (value: boolean) => void;
    onShowPhotosChange  : (value: boolean) => void;
};
const Photos : React.FC<PhotosProps> = ({photos, onDarkScreenChange, onShowPhotosChange}) => {
    
    const [showCarousel, setShowCarousel] = useState(false);
    const handleShowCarousel = () => {
        setShowCarousel(!showCarousel);
    };
    const [imageNumber, setImageNumber] = useState(0);
    const [totalImageNumber, setTotalImageNumber] = useState(0);

    const imageNumberChange = (currentSlide: number) => {
        setImageNumber(currentSlide + 1);
    };

    useEffect(() => {
        setTotalImageNumber(photos.length);
    }, [photos, totalImageNumber]);

    return (
        <>
            <div className={`${showCarousel ? 'hidden' : 'w-1/2'}`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Sve slike</h1>
                    <div onClick={() => onShowPhotosChange(false)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 ">
                        <IoIosArrowBack className="w-5 h-5" />
                        <p className="text-lg text-black font-semibold">Natrag</p>
                    </div>
                </div>
                
                <div className="photos  flex-col flex-wrap justify-center items-center w-full">
                {photos.map((photo, index) => (
                    <img key={index} src={photo.photoUrl} alt="listing" className=" w-full h-auto object-cover p-2 cursor-pointer hover:brightness-50 transition-all duration-150" onClick={() => { handleShowCarousel(); onDarkScreenChange(true); }} />
                ))}
                </div>
            </div>
            {showCarousel && 
                <div className="" >
                    <p className="absolute text-xl text-white top-30 right-10 ">{`${imageNumber} / ${totalImageNumber}`}</p>
                    <div onClick={() => { handleShowCarousel(); onDarkScreenChange(false); }} className="flex items-center justify-center hover:bg-slate-600 p-2 mt-2 rounded-3xl  gap-2 absolute left-10 top-30 cursor-pointer">
                        <IoMdClose className="text-white" />
                        <p className="text-white">Zatvori</p>
                    </div>
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
                            afterChange={imageNumberChange}
                            dots={true}
                            arrows={true}
                            infinite={false}
                            pauseOnHover={true}
                            className="rounded-s-3xl w-full max-w-4xl"
                        >
                            {photos.map((photo, imgIndex) => (
                                <div className="w-full h-full flex items-center justify-center " key={imgIndex}>
                                    <img src={`${photo.photoUrl}`} alt={photo.photoUrl} className="w-full h-full rounded-3xl" />
                                </div>
                            ))}
                        </Carousel>
                    </ConfigProvider>
                    </div>
                
            }
        </>
     
        
    );
};
export default Photos;