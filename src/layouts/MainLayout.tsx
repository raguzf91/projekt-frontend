import Navbar from "../ui-components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () =>  {
    return (
        <>  
             {/* <Navbar /> */}
            <Outlet/>
        </>
    )
}
export default MainLayout;