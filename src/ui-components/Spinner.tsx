import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

interface SpinnerProps {
    loading: boolean;
};
const Spinner : React.FC<SpinnerProps> = ({loading}) => {
    return(
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#3B82F6" loading={loading} size={150} />
        </div>
    );
}
export default Spinner;

