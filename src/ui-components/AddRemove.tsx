import React from "react";
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

interface AddRemoveProps {
    index: number;
    item: { item: string, value: number };
    handleMinus: (index: number) => void;
    handleAdd: (index: number) => void;
}

const AddRemove: React.FC<AddRemoveProps> = ({ index, item, handleMinus, handleAdd }) => {
    return (
         <div key={index} className="flex justify-between gap-2 items-center ml-4 mr-4">
            <p className="text-lg font-semibold">{item.item}</p>
            <div className="flex gap-4 justify-center items-center">
                <CiCircleMinus onClick={() => handleMinus(index)} className={`w-8 h-8 cursor-pointer ${item.value === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:border-2 hover:border-slate-950'}`} />
                <p className="text-lg">{item.value}</p>
                <CiCirclePlus onClick={() => handleAdd(index)} className="w-8 h-8 cursor-pointer hover:border-2 hover:border-slate-950" />
            </div>
        </div>
    );
};
export default AddRemove;