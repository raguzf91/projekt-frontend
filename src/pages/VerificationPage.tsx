
import VerificationInput from "react-verification-input";
import { useSearchParamsContext } from '../context/SearchParamsContext';
import logo from '../assets/images/logo.png';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from "react";
import '../pages/css/VerificationPage.css';
import { toast } from "react-toastify";
import Spinner
 from "../ui-components/Spinner";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const VerificationPage = () => {

    const { searchParams, setSearchParams } = useSearchParamsContext();
    const verificationType = searchParams.get('verificationType');
    const email = searchParams.get('email');
    const rememberMe = searchParams.get('rememberMe');
    const [loading, setLoading] = useState(false);
    const [keyInput, setKeyInput] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const handleKeyInputChange = (value : string) => {
        console.log(value);
        setKeyInput(value);
        
    };
    const { setUser, user } = useUser();


    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        if(keyInput.length < 6) {
            toast.error('Ključ mora sadržavati 6 znakova');
            return;
        }
        try {
            if(verificationType === 'ACTIVATE_ACCOUNT') {
                setApiUrl(`http://localhost:8080/api/auth/activate/account/${email}/${keyInput}`);
                if(apiUrl !== '') {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
            if (response.ok) {
                if(verificationType === 'ACTIVATE_ACCOUNT') {
                    toast.success('Uspješno ste aktivirali račun');
                    setSearchParams({});
                    navigate(`/?activateLogin=${true}`,);
                }
              
                
            } else {
                toast.error('Došlo je do greške. Pokušajte ponovno');
            }
                }
               

            }
            if(verificationType === 'VERIFY_ACCOUNT') {
                setApiUrl(`http://localhost:8080/api/auth/verify/code/${email}/${keyInput}`);
                if(apiUrl !== '') {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
            if (response.ok) {
               console.log(data)
                if(verificationType === 'VERIFY_ACCOUNT') {
                    toast.success('Uspješno ste se prijavili');
                    setSearchParams({});
                    Cookies.set('access_token', data.data.access_token);
                    Cookies.set('refresh_token', data.data.refresh_token);

                    const user = {
                        id: data.data.user.id,
                        email: data.data.user.email,
                        role: data.data.user.roleName,
                    };

                    // Save user in session storage samo ako je kliknio remember me 
                    if(rememberMe === 'true') {
                        sessionStorage.setItem('user', JSON.stringify(user));
                    };
                    

                    // Update user context
                    setUser(user);
                   
                    
                    navigate('/');
                }
                
            } else {
                toast.error('Došlo je do greške. Pokušajte ponovno');
            }
                }
            }
            
            
        } catch (error) {
            toast.error('Došlo je do greške. Pokušajte ponovno');
            
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

            

    return (
        <div className="flex justify-center items-center">
            {loading && <Spinner loading={loading} />}
        <div className=" h-screen">
            <div className="flex flex-col justify-center items-center h-full mb-44 w-full">
            <div>
                <img className="w-48 h-14"   src={logo} alt="logo" />
            </div>
            <div className="flex flex-col items-center">
                {verificationType === 'ACTIVATE_ACCOUNT' && <h1 className="text-2xl font-bold mt-10 mb-4">Aktivirajte vaš raćun</h1>}
                {verificationType === 'VERIFY_ACCOUNT' && <h1 className="text-2xl font-bold mt-10 mb-4">Potvrdite da ste to vi</h1>}
                {verificationType === 'ACTIVATE_ACCOUNT' &&<p className="center font-bold">
                {`Poslali smo aktivacijski kljuć na ${email} `}</p>}
                
                {verificationType === 'ACTIVATE_ACCOUNT' &&
                <p>Molimo vas unesite dobiveni kljuć kako bi potvrdili kreiranje svog Airbnb raćuna</p>
                }

                {verificationType === 'VERIFY_ACCOUNT' &&<p className="center font-bold">
                {`Poslali smo verifikacijski kljuć na ${email} `}</p>}

                {verificationType === 'VERIFY_ACCOUNT' &&
                <p>Molimo vas unesite dobiveni kljuć kako bi se prijavili</p>
                }

            </div>
            <div className="mt-4 mb-4 ">
            <VerificationInput
                length={6}
                onChange={handleKeyInputChange}
                placeholder=""
                classNames={{
                    characterSelected: "character--selected",
                  }}
            />
            </div>
            <div className="flex justify-center mb-40">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Potvrdi</button>
            </div>
           
           
        </div>
        </div>
        </div>
    );
};

export default VerificationPage;