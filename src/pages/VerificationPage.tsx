
import VerificationInput from "react-verification-input";
import { useSearchParamsContext } from '../context/SearchParamsContext';
import logo from '../assets/images/logo.png';
import { useUser } from '../context/UserContext';
import { useState } from "react";
import '../pages/css/VerificationPage.css';

const VerificationPage = () => {

    const { searchParams, setSearchParams } = useSearchParamsContext();
    const verificationType = searchParams.get('verificationType');
    
    const [keyInput, setKeyInput] = useState('');
    const handleKeyInputChange = (value : string) => {
        console.log(value);
        setKeyInput(value);
    };

    return (
        <div className=" h-screen">
            <div className="flex flex-col justify-center items-center h-full mb-44 w-full">
            <div>
                <img className="w-48 h-14"   src={logo} alt="logo" />
            </div>
            <div className="flex flex-col items-center">
                {verificationType === 'ACTIVATE_ACCOUNT' && <h1 className="text-2xl font-bold mt-10 mb-4">Aktivirajte vaš raćun</h1>}
                <p>{`Poslali smo aktivacijski kljuć na email `}</p>
            </div>
            <div className="mt-4 mb-40">
            <VerificationInput
                length={6}
                onChange={handleKeyInputChange}
                placeholder=""
                classNames={{
                    characterSelected: "character--selected",
                  }}
            />
            </div>
            </div>
           
           
        </div>
    );
};
export default VerificationPage;