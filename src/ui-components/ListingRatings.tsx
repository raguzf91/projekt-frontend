
import { IoMdStar } from "react-icons/io";
import { Flex, Progress } from 'antd';
import { PiSprayBottleBold } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { LuKeyRound } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiChat2 } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";



interface ListingRatingsProps {
    rating: number | undefined;
    numberOfReviews: number | undefined;
    reviewPercentageList: {numberOfStars: number, percentage: number}[];
    cleanliness: number;
    precisionRating: number;
    checkInRating: number;
    locationRating: number;
    communicationRating: number;
    valueRating: number;
    direction: string;

}

const ListingRatings : React.FC<ListingRatingsProps> = ({rating, direction, numberOfReviews, reviewPercentageList, cleanliness, precisionRating, checkInRating, locationRating, communicationRating, valueRating  }) => {
    return(
        <div className={` flex-col review-statistic-container mt-8 border-b-2 pb-8  w-full`}>
                            <div className="flex gap-1">
                                {<IoMdStar className='w-8 h-8' />}
                                <p className="text-2xl font-semibold pr-4">{rating}</p>
                                <p className='font-semibold text-3xl pr-2'>·</p>
                                <p className='text-2xl font-semibold pr-2'>{numberOfReviews}</p>
                                <p className='text-2xl font-semibold'>Recenzija</p>
                            </div>
                            <div className={`${direction === 'flex-col' ? 'mt-6 justify-between flex-col pr-8' : 'mt-6 justify-between flex'} `}>

                                <Flex className={`${direction === 'flex-col' ? 'w-full' : 'w-48 border-e-2'}  `} vertical gap="small" >
                                    <p className='font-semibold'>Ukupna ocjena</p>
                                    <div className='flex flex-col gap-2 '>
                                        {reviewPercentageList.map((review, index) => (
                                            <div key={index} className="flex pr-4 h-4 ">
                                                <p className='mr-2'>{5 - index}</p>
                                                <Progress className='w-full' percent={reviewPercentageList[4-index].percentage} size="small" showInfo={false} strokeColor="#ef4444" />
                                            </div>
                                        ))}

                                    </div>
                                    
                                </Flex>
                                <div className={`${direction === 'flex-col' ? 'flex w-full mt-4 border-b-2 p-2' : 'flex flex-col lg:w-32 md:w-16 border-e-2'} justify-between   `}>
                                    <div className={`${direction === 'flex-col' ? 'flex gap-2' : 'hidden'}`}>
                                        <PiSprayBottleBold className='w-8 h-8' />
                                        <p className='text-lg font-semibold'>Čistoća</p>
                                    </div>
                                    <p className={`${direction === 'flex-col' ? 'text-xl font-semibold' : 'hidden'} `}>{cleanliness.toFixed(2)}</p>
                                    <div className={`${direction === 'flex-col' ? 'hidden' : 'flex flex-col '} justify-between lg:w-32 md:w-24 border-e-2 `}>
                                        <p className='text-lg font-semibold'>Čistoća</p>
                                        <p className='text-xl font-semibold'>{cleanliness.toFixed(2)}</p>
                                    </div>
                                   
                                    <PiSprayBottleBold className={`${direction === 'flex-col' ? 'hidden' : 'w-8 h-8'}`} />
                                </div>
                                <div className={`${direction === 'flex-col' ? 'flex w-full mt-4 border-b-2 p-2' : 'flex flex-col lg:w-32 md:w-16 border-e-2'} justify-between`}>
            <div className={`${direction === 'flex-col' ? 'flex gap-2' : 'hidden'}`}>
                <SiTicktick className='w-8 h-8' />
                <p className='text-lg font-semibold'>Preciznost</p>
            </div>
            <p className={`${direction === 'flex-col' ? 'text-xl font-semibold' : 'hidden'}`}>{precisionRating.toFixed(2)}</p>
            <div className={`${direction === 'flex-col' ? 'hidden' : 'flex flex-col'} justify-between w-32 border-e-2`}>
                <p className='text-lg font-semibold'>Preciznost</p>
                <p className='text-xl font-semibold'>{precisionRating.toFixed(2)}</p>
            </div>
            <SiTicktick className={`${direction === 'flex-col' ? 'hidden' : 'w-8 h-8'}`} />
        </div>

        <div className={`${direction === 'flex-col' ? 'flex w-full mt-4 border-b-2 p-2' : 'flex flex-col w-32 border-e-2'} justify-between`}>
            <div className={`${direction === 'flex-col' ? 'flex gap-2' : 'hidden'}`}>
                <LuKeyRound className='w-8 h-8' />
                <p className='text-lg font-semibold'>Check-in</p>
            </div>
            <p className={`${direction === 'flex-col' ? 'text-xl font-semibold' : 'hidden'}`}>{checkInRating.toFixed(2)}</p>
            <div className={`${direction === 'flex-col' ? 'hidden' : 'flex flex-col'} justify-between w-32 border-e-2`}>
                <p className='text-lg font-semibold'>Check-in</p>
                <p className='text-xl font-semibold'>{checkInRating.toFixed(2)}</p>
            </div>
            <LuKeyRound className={`${direction === 'flex-col' ? 'hidden' : 'w-8 h-8'}`} />
        </div>

        <div className={`${direction === 'flex-col' ? 'flex w-full mt-4 border-b-2 p-2' : 'flex flex-col w-32 border-e-2'} justify-between`}>
            <div className={`${direction === 'flex-col' ? 'flex gap-2' : 'hidden'}`}>
                <CiChat2 className='w-8 h-8' />
                <p className='text-lg font-semibold'>Komunikacija</p>
            </div>
            <p className={`${direction === 'flex-col' ? 'text-xl font-semibold' : 'hidden'}`}>{communicationRating.toFixed(2)}</p>
            <div className={`${direction === 'flex-col' ? 'hidden' : 'flex flex-col'} justify-between w-32 border-e-2`}>
                <p className='text-lg font-semibold'>Komunikacija</p>
                <p className='text-xl font-semibold'>{communicationRating.toFixed(2)}</p>
            </div>
            <CiChat2 className={`${direction === 'flex-col' ? 'hidden' : 'w-8 h-8'}`} />
        </div>

        <div className={`${direction === 'flex-col' ? 'flex w-full mt-4 border-b-2 p-2' : 'flex flex-col w-32 border-e-2'} justify-between`}>
            <div className={`${direction === 'flex-col' ? 'flex gap-2' : 'hidden'}`}>
                <IoPricetagOutline className='w-8 h-8' />
                <p className='text-lg font-semibold'>Vrijednost</p>
            </div>
            <p className={`${direction === 'flex-col' ? 'text-xl font-semibold' : 'hidden'}`}>{valueRating.toFixed(2)}</p>
            <div className={`${direction === 'flex-col' ? 'hidden' : 'flex flex-col'} justify-between w-32 border-e-2`}>
                <p className='text-lg font-semibold'>Vrijednost</p>
                <p className='text-xl font-semibold'>{valueRating.toFixed(2)}</p>
            </div>
            <IoPricetagOutline className={`${direction === 'flex-col' ? 'hidden' : 'w-8 h-8'}`} />
        </div>
                            </div>
                    </div>
    );
};
export default ListingRatings;