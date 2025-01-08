import Navbar from "../ui-components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainLayout = () =>  {
    return (
        <>  
            <Outlet/>
            <ToastContainer /> 
        </>
    )
}
export default MainLayout;