import { IoMdGlobe } from "react-icons/io";
import { useSearchParamsContext } from '../context/SearchParamsContext';
import { useNavbarFilter } from "../context/NavbarFilterProvider";
const FooterMenu = () => {
    const { searchParams, setSearchParams } = useSearchParamsContext();
    const verificationType = searchParams.get('verificationType');
    const { hideNavbar } = useNavbarFilter();

    return (
        <footer className={`${(verificationType === 'ACTIVATE_ACCOUNT' || verificationType === 'VERIFY_ACCOUNT' || hideNavbar === true) ? 'hidden' : 'footer bg-gray-100 flex p-10 pr-20 pl-20'}`}>
            <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="flex flex-col ">
                        <p className="font-semibold">Podrška</p>
                        <p className="underline cursor-pointer mt-2">Centar za pomoć</p>
                        <p className="underline cursor-pointer mt-2">AirCover</p>
                        <p className="underline cursor-pointer mt-2">Suzbijanje diskriminacije</p>
                        <p className="underline cursor-pointer mt-2">Pomoć za osobe s invaliditetom</p>
                        <p className="underline cursor-pointer mt-2">Mogućnosti otkazivanja</p>
                        <p className="underline cursor-pointer mt-2">Prijavite problem u susjedstvu</p>
                    </div>
                    <div className="flex flex-col ml-10">
                        <p className="font-semibold">Ugošćivanje</p>
                        <p className="underline cursor-pointer mt-2">Iznajmite preko Airbnba</p>
                        <p className="underline cursor-pointer mt-2">AirCover za domaćine</p>
                        <p className="underline cursor-pointer mt-2">Sadržaji za domaćine</p>
                        <p className="underline cursor-pointer mt-2">Forum zajednice</p>
                        <p className="underline cursor-pointer mt-2">Odgovorno ugošćivanje</p>
                        <p className="underline cursor-pointer mt-2">Uključite se u besplatno predavanje o iznajmljivanju smještaja</p>
                        <p className="underline cursor-pointer mt-2">Pronađite sudomaćina</p>
                    </div>
                    <div className="flex flex-col ml-10">
                        <p className="font-semibold">Airbnb</p>
                        <p className="underline cursor-pointer mt-2">Novosti</p>
                        <p className="underline cursor-pointer mt-2">Nove značajke</p>
                        <p className="underline cursor-pointer mt-2">Poslovi</p>
                        <p className="underline cursor-pointer mt-2">Ulagači</p>
                        <p className="underline cursor-pointer mt-2">Darovne kartice</p>
                        <p className="underline cursor-pointer mt-2">Airbnb.org – smještaj u nuždi</p>
                    </div>
                </div>
                <div className="flex w-full justify-between mt-8">
                    <div className="flex">
                        <p className="underline mr-2 cursor-pointer">© 2025 Airbnb, Inc.</p>
                        <p className="mr-2">·</p>
                        <p className="underline mr-2 cursor-pointer">Pravila o privatnosti</p>
                        <p className="mr-2">·</p>
                        <p className="underline mr-2 cursor-pointer">Uvjeti</p>
                        <p className="mr-2">·</p>
                        <p className="underline mr-2 cursor-pointer">Mapa web-mjesta</p>
                    </div>
                    <div className="flex">
                        <div className="flex gap-2">
                            <IoMdGlobe className="w-6 h-6" />
                            <p>Hrvatski</p>

                        </div>
                        <div className="flex gap-2 ml-4">
                            <p className="underline cursor-pointer">€</p>
                            <p className="underline cursor-pointer">EUR</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterMenu;