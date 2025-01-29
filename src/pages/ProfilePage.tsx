import { useEffect, useState } from "react";
import Profile from "../ui-components/Profile";
import { useUser } from "../context/UserContext";
import dayjs from "dayjs";
import { useNavbarFilter } from "../context/NavbarFilterProvider";

const ProfilePage = () => {
    const [showAllReviews, setShowAllReviews] = useState(false);
    const handleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };
    const [userById, setUserById] = useState<any>();
    const {user} = useUser();
    const userId = user ? user.id : null;
    const [yearsHosting, setYearsHosting] = useState(0);
    const { setHideNavbar} = useNavbarFilter();

    useEffect(() => {
                setHideNavbar(true);
                return () => setHideNavbar(false); // Reset the navbar visibility when the component unmounts
        
        }, [setHideNavbar]);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                console.log(userId);
                const response = await fetch(`http://localhost:8080/api/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    const {user} = data.data;
                    setUserById(user);
                    const createdAt = dayjs(user.createdAt);
                            const yearsPassed = dayjs().diff(createdAt, 'year');
                            setYearsHosting(yearsPassed + 3);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
        

    }, [userId]);
   
    return (
        <div className="container w-full h-screen flex justify-center items-center">
            <div className="flex w-full h-full items-center justify-center">
            {userById &&
                <Profile user={userById} listingPage={false} yearsHosting={yearsHosting} ownProfile={true} handleShowAllReviews={handleShowAllReviews} />
            }
            </div>
            
        </div>
    );
};
export default ProfilePage;