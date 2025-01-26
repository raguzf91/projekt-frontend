import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useUser } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface toggleProps {
    toggleRegister: () => void
    handleHideNavbar: (hide: boolean) => void
}
const Signup = ({toggleRegister, handleHideNavbar}:toggleProps) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const { setUser } = useUser();

    const handleNavigateToVerifyAccount = ( verificationType : string ) => {
        console.log('navigating to verify account' + verificationType);
        toggleRegister();
        handleHideNavbar(true);
        navigate(`/verify-account?verificationType=${verificationType}`);
    };
    
    const [registerRequest, setRegisterRequest] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        phoneNumber: '',
        gender: ''
    });

    const navigate = useNavigate();


    useEffect(() => {

        setRegisterRequest({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            gender: gender});

    }, [firstName, lastName, email, password, dateOfBirth, phoneNumber]);

    

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerRequest)
            });

           
            if (response.ok) {
                const data = await response.json();
                const user = data.data.user;
                console.log(data);
                const verificationTypeRef = data.data.activationType;
                console.log("type" +verificationTypeRef);
                const {id, email, roleName} = user;
                console.log(id, email, roleName);
                // Update user context
                setUser({ id: id, email: email, role: roleName });
                toast.success('Uspješno ste se registrirali');
                handleNavigateToVerifyAccount(verificationTypeRef);
            } else {
                console.error('Registration failed:', response.statusText);
            }

        } catch (error) {
            toast.error('Greška prilikom registracije');
            console.error(error);
            
        }
    };




    return (
        <div id="authentication-modal" aria-hidden="true" className="fixed top-0 inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden h-full ">
            <div className="relative  p-4 w-1/5 max-h-full ">
                {/* Modal content */}
                <div className="abssolute top-0 bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Registrirajte se
                        </h3>
                        <button type="button" onClick={toggleRegister} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Zatvorite</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                        <div className="welcome font-bold text-2xl mb-6">
                            <h2>Dobrodošli u Airbnb</h2>
                        </div>
                        <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                            <div className="flex justify-between">
                                <div className="mr-4">
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime</label>
                                    <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Filip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prezime</label>
                                    <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Raguž" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                            </div>
                          
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lozinka</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Datum rođenja</label>
                                <input type="date" name="dateOfBirth" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
                            </div>
                            <div>
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spol</label>
                                <div className="flex items-center mb-4">
                                    <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender('male')} className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 focus:ring-gray-900 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Muško</label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender('female')} className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 focus:ring-gray-900 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Žensko</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Broj telefona</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="0989219292" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
                            </div>
                            
                            <div className="flex justify-between">
                                
                                <a href="#" className="text-sm text-red-700 hover:underline dark:text-red-500">Zaboravljena lozinka?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-rose-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">Registrirajte se</button>
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
                                Već ste registrirani? <a href="#" className="text-red-700 hover:underline dark:text-red-500">Prijavite se</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;



