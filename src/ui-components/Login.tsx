import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useUser } from '../context/UserContext';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface toggleProps {
    toggleLogin: () => void
}

const Login = ({toggleLogin}:toggleProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginRequest, setLoginRequest] = useState({
        email: '',
        password: ''
    });
    const { setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {

        setLoginRequest({
            email: email,
            password: password
        });
    }, [email, password]);

    const handleNavigateToVerifyAccount = ( verificationType : string ) => {
        console.log('navigating to verify account' + verificationType);
        toggleLogin();
        navigate(`/verify-account?verificationType=${verificationType}&email=${email}`);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log(loginRequest);
            try {
                
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginRequest)
                });
    
               
                if (response.ok) {
                    const data = await response.json();
                    const user = data.data.user;
                    const verificationTypeRef = data.data.activationType;
                    const {id, email, roleName} = user;
                    // Update user context
                    setUser({ id: id, email: email, role: roleName });
                    toast.info('Uspješno ste se prijavili');
                    handleNavigateToVerifyAccount(verificationTypeRef);
                } else {
                    console.error('Registration failed:', response.statusText);
                    toast.error('Krivo korisničko ime ili lozinka. Pokušajte ponovno');
                    
                }
    
            } catch (error) {
                toast.error('Greška prilikom registracije');
                console.error(error);
                
            }
        };
    
    return (
        <div id="authentication-modal" aria-hidden="true" className="fixed inset-0 z-50  flex items-center  justify-center overflow-y-auto overflow-x-hidden h-full ">
            <div className="relative mb-20 p-4 w-full max-w-md max-h-full h-3/4">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Prijavite se
                        </h3>
                        <button type="button"  onClick={toggleLogin} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close Modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                        <div className="welcome font-bold text-2xl mb-6">
                            <h2>Dobrodošli u projekt</h2>
                        </div>
                        <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                           
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lozinka</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                                    </div>
                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zapamti me</label>
                                </div>
                                <a href="#" className="text-sm text-red-700 hover:underline dark:text-red-500">Zaboravljena lozinka?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-rose-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">Prijavite se</button>
                            <div className="ili "  >
                                <p className="text-center">ili</p>
                            </div>
                            <div className="google-register flex  hover:bg-gray-300 items-center rounded-lg  ">
                            <button type="submit" className="w-full text-gray-500 font-bold bg-white rounded-lg hover:bg-gray-300 text-sm px-5 py-2.5 text-center flex items-center justify-center space-x-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-red-800">
                                <FcGoogle className="text-center" />
                                <span>Nastavi koristeći Google</span>
                            </button>
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Nemate račun? <a href="#" className="text-red-700 hover:underline dark:text-red-500">Registrirajte se</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;