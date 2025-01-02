import { IoMdClose } from "react-icons/io";

const Filters = () => {
    return(
        <div className="filer-container">
            <div className="header flex mt-2  h-12 border-b-2">
            <div className="w-10 flex ml-2 p-1.5 items-center justify-center cursor-pointer">
                <IoMdClose className="w-10 h-8 rounded-full hover:bg-slate-100" />
            </div>
            
            <div className="flex flex-grow justify-center items-center mr-12">
                <h1 className="font-bold text-2xl text-center">Filtri</h1>
            </div>
        </div>
        <div className="vrste-smjestaja m-4 flex-col">
            <h2 className="text-xl h-12 font-bold ">Vrste smještaja</h2>
            <div className="flex items-center justify-between rounded-3xl border-2">
                <input className="placeholder-black placeholder text-lg font-semibold text-center rounded-3xl border-2" type="text" placeholder="Sve vrste" name="" id="" />
                <input className="placeholder-black placeholder text-lg font-semibold text-center" type="text" placeholder="Soba" /> 
                <input className="placeholder-black placeholder text-lg font-semibold text-center" type="text" placeholder="CIjeli prostor" /> 
            </div>
        </div>
        </div>
        
    );
};

export default Filters;