import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Slider from "./Slider";
const Filters = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    const [rangeValue, setRangeValue] = useState<{min: number, max: number}>({min: 0, max: 1000});
    const handleRangeChange = (min: number, max: number) => {
        setRangeValue({min, max});
    };

    return (
        <div className="filter-container flex-col w-full justify-center items-center">
            <div className="header flex mt-2 h-12 border-b-2">
                <div className="w-10 flex ml-2 p-1.5 items-center justify-center cursor-pointer">
                    <IoMdClose className="w-10 h-8 rounded-full hover:bg-slate-100" />
                </div>
                <div className="flex flex-grow justify-center items-center mr-12">
                    <h1 className="font-bold text-2xl text-center">Filtri</h1>
                </div>
            </div>
            <div className="vrste-smjestaja m-4 flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold mb-4">Vrste smještaja</h2>
                <div className="flex items-center justify-between rounded-3xl border-2 p-2">
                    
                <button
                    className={`text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 ${
                        activeButton === 'Sve vrste'
                            ? 'border-slate-950 border-2'
                            : 'hover:bg-slate-100'
                    }`}
                    onClick={() => handleButtonClick('Sve vrste')}
                >
                    Sve vrste
                </button>
                   
                    
                <button
                    className={`text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 ${
                        activeButton === 'Soba'
                            ? 'border-slate-950 border-2'
                            : 'hover:bg-slate-100'
                    }`}
                    onClick={() => handleButtonClick('Soba')}
                >
                    Soba
                </button>
                <button
                    className={`text-lg font-semibold text-center rounded-3xl w-1/3 h-12 transition-all duration-100 ${
                        activeButton === 'Cijeli prostor'
                            ? 'border-slate-950 border-2'
                            : 'hover:bg-slate-100'
                    }`}
                    onClick={() => handleButtonClick('Cijeli prostor')}
                >
                    Cijeli prostor
                </button>    
                </div>
            </div>
            <div className="raspon-cijena m-4 flex-col justify-center items-center border-b-2 pb-8">
                <h2 className="text-xl h-12 font-bold">Raspon cijena</h2>
                <h3 className="text-base ">Cijena noćenja uključujući naknade i poreze</h3>
                <div>
                    <Slider min={0} max={1000} currencyText="€" onChange={() => {
                       handleRangeChange;

                    }} />
                </div>
            </div>
        </div>
    );
};

export default Filters;