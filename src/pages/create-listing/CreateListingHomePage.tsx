import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import house  from '../../assets/images/house.png';
import { useNavbarFilter } from '../../context/NavbarFilterProvider';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import "./css/CreateListing.css"

const CreateListingHomePage = () => {
    const { setHideNavbar} = useNavbarFilter();
    const navigate = useNavigate();

    const [animate, setAnimate] = useState(false);


    useEffect(() => {
        setHideNavbar(true);
        setAnimate(true);
        return () => setHideNavbar(false); // Reset the navbar visibility when the component unmounts
    }, [setHideNavbar]);

    const handleNavigateToHome = () => {
            navigate("/", { replace: true });
        };

        const handleNavigateToNext = () => {
            navigate("/become-a-host/create-listing", { replace: true });
        };

        
    return (
        <CSSTransition
            in={animate}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >

        
          
                
           
        <section className="create-listing-page w-screen h-screen flex flex-col justify-between">
            <header className='flex justify-start items-center w-full p-4'>
                <img src={logo} onClick={handleNavigateToHome} className='p-8 2xl:w-48 xl:w-32 md:w-32 md:mr-6 cursor-pointer' alt="logo" />
            </header>
            <div className="flex main-container w-full">
                <div className="flex flex-col items-center justify-center w-1/2">
                    <div className='flex  justify-start w-1/2 items-center mr-12'>
                        <p className="text-slate-600 text-left">1.korak</p>
                    </div>
                    
                    <h1 className="text-5xl font-bold ">Opišite nam svoj smještaj</h1>
                    <div className='flex w-1/2  mr-12'>
                        <p className='text-lg text-left mt-4'>
                             U ovom ćemo vas koraku pitati koju vrstu smještaja imate i hoće li gosti rezervirati cijeli prostor ili samo sobu. Zatim ćete unijeti lokaciju i broj gostiju koji mogu boraviti u vašem smještaju.
                        </p>
                    </div>
                    
                </div>
                <div>
                    <img src={house} alt="house" />
                </div>
                
            </div>
            <footer className="flex justify-end w-full h-full border-t-4">
                <div className='w-1/2 flex justify-end items-end'>
                    <button onClick={handleNavigateToNext} className='bg-black rounded-lg text-white mr-20 mb-10 w-24 h-12 font-semibold'>Sljedeće</button>
                </div>
            </footer>
        </section>
        </CSSTransition>
    );
};
export default CreateListingHomePage;