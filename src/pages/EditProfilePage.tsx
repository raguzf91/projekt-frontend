import { useCallback, useEffect, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useUser } from "../context/UserContext";
import dayjs from "dayjs";
import { Flex, Input, Checkbox, Divider} from 'antd';
import type { CheckboxProps } from 'antd';
import { FaRegImage } from "react-icons/fa";
import {useDropzone} from 'react-dropzone'
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    responseRate: number;
    speaksLanguages: string[];
    profilePhoto: Photo;
    createdAt : string;
    gender: string;
    averageRating: number | undefined;
    bio: string;
    numberOfReviews: number;
    city: string;
    country: string;
}

interface Photo {
    photo_url: string;
    name: string;
}

interface EditProfilePageProps {
    user: User;

}


const EditProfilePage : React.FC<EditProfilePageProps> = () => {
    const {user} = useUser();
    const userId = user ? user.id : null;
    const [userById, setUserById] = useState<User>();
    const token = Cookies.get('access_token'); 

    const { TextArea } = Input;

    const [defaultCheckedList, setDefaultCheckedList] = useState<string[]>([]);
    const CheckboxGroup = Checkbox.Group;
    const plainOptions = ['Engleski', 'Njemački', 'Francuski', 'Španjolski', 'Hrvatski', 'Talijanski'];
    const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setSpeaksLanguages(e.target.checked ? plainOptions : []);
        console.log(userByIdSpeaksLanguages);
      };

    


    const [firstNameActive, setFirstNameActive] = useState(false);
    const [lastNameActive, setLastNameActive] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [phoneNumberActive, setPhoneNumberActive] = useState(false);
    const [homeCityActive, setHomeCityActive] = useState(false);
    const [bioActive, setBioActive] = useState(false);
    const [homeCountryActive, setHomeCountryActive] = useState(false);
    const [speaksLanguagesActive, setSpeaksLanguagesActive] = useState(false);
    const [profilePhotoActive, setProfilePhotoActive] = useState(false);
    
    const [userByIdFirstName, setFirstName] = useState<string>(userById?.firstName || '');
    const [userByIdLastName, setLastName] = useState<string>(userById?.lastName || '');
    const [userByIdEmail, setEmail] = useState<string>(userById?.email || '');
    const [userByIdPhoneNumber, setPhoneNumber] = useState<string>(userById?.phoneNumber || '');
    const [userByIdHomeCity, setHomeCity] = useState<string>('');
    const [userByIdBio, setBio] = useState<string>('');
    const [userByIdHomeCountry, setHomeCountry] = useState<string>('');
    const [userByIdSpeaksLanguages, setSpeaksLanguages] = useState<string[]>([]);
    const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);
    const [profilePhoto, setProfilePhoto] = useState<File[]>();
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState<string[]>([]);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [photosUploadedSuccessfully, setPhotosUploadedSuccessfully] = useState(false);

     const handleUploadPhotos = async () => {
                    if (!profilePhoto || profilePhoto.length === 0) {
                        toast.error('Molimo Odaberite profilnu fotografiju');
                        return;
                    }
                
                    const uploadPromises = profilePhoto.map(async (photo) => {
                        const uploadData = new FormData();
                        uploadData.append('file', photo);
                        uploadData.append('upload_preset', 'projekt-fina-upload-unsigned');
                        uploadData.append('api_key', '729888475719161');
                
                        const response = await fetch(`https://api.cloudinary.com/v1_1/${'dljagsyiv'}/${'image'}/upload`, {
                            method: 'POST',
                            body: uploadData
                        });
                
                        if (!response.ok) {
                            toast.error('Greška prilikom Unosa slike. Pokušajte ponovno kasnije');
                            throw new Error('Greška prilikom Unosa slike. Pokušajte ponovno kasnije');
                            
                        }
                
                        const data = await response.json();
                        const photoUrl = data.url;
                        const name = data.original_filename;
                        return photoUrl;
                    });
                
                    try {
                        const uploadedPhotos = await Promise.all(uploadPromises);
                        setUploadedPhotos(uploadedPhotos);
                        setLoading(false);
                        return true;
                    } catch (error) {
                        if (error instanceof Error) {
                            toast.error(error.message);
                        } else {
                            toast.error('An unknown error occurred');
                        }
                    }
                };


    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
    
    const [file] = acceptedFiles;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        toast.error('Slika mora biti u formatu JPG ili PNG');
        return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        toast.error('Slika mora biti manja od 2MB');
        return;
    }
    setProfilePhoto([file]);
    setPreviewPhoto([URL.createObjectURL(file)]);
    }, []);
    
    

const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const sendPhotoForm = async () => {
                if(profilePhoto === null) {
                    toast.error("Molimo dodajte fotografije");
                    return;
                };
                setLoading(true);
                const photosUploadedSucessfully = await handleUploadPhotos();
                setPhotosUploadedSuccessfully(photosUploadedSucessfully || false);
                console.log("photosUploadedSuccessfully: " + photosUploadedSuccessfully);   
                

            }

    useEffect(() => {
    
            const fetchUser = async () => {
                try {
                    console.log("userId: " + userId);
                    const response = await fetch(`http://localhost:8080/api/user/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        const {user} = data.data;
                        console.log(user)
                        setUserById(user);
                        setFirstName(user.firstName);
                        setLastName(user.lastName);
                        setEmail(user.email);
                        setPhoneNumber(user.phoneNumber);
                        setHomeCity(user.city);
                        setBio(user.bio);
                        setHomeCountry(user.country);
                        setSpeaksLanguages(user.speaksLanguages);
                        setDefaultCheckedList(user.speaksLanguages);
                        setCheckedList(user.speaksLanguages);

                    } else {
                        console.error('Error fetching data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            
            if(userId) {
                fetchUser();
            }
            
    
        }, [userId]);


    const handleFirstNameActive = () => {
        setFirstNameActive(true);
    };

    const handleLastNameActive = () => {
        setLastNameActive(true);
    };

    const handleEmailActive = () => {
        setEmailActive(true);
    };

    const handlePhoneNumberActive = () => {
        setPhoneNumberActive(true);
    };

    const handleHomeCityActive = () => {
        setHomeCityActive(true);
    };

    const handleBioActive = () => {
        setBioActive(true);
    };

    const handleHomeCountryActive = () => {
        setHomeCountryActive(true);
    };

    const handleSpeaksLanguagesActive = () => {
        setSpeaksLanguagesActive(true);
    };

    const handleProfilePhotoActive = () => {
        setProfilePhotoActive(true);
    };

  

    useEffect(() => {
        const handleSendForm = async () => {

            const formRequirements =  [{
                firstName: userByIdFirstName,
                lastName: userByIdLastName,
                email: userByIdEmail,
                phoneNumber: userByIdPhoneNumber,
    
            }]
    
            formRequirements.forEach((requirement) => {
                if (!requirement) {
                    toast.error('Molimo popunite sva polja');
                    toast.info('Ime, Prezime, Email te Broj telefona su obavezna polja');
                    return;
                }
            });

            console.log(uploadedPhotos[0]);
            console.log(userByIdSpeaksLanguages);
            console.log(userByIdFirstName);
            console.log(userByIdLastName);
            console.log(userByIdEmail);
            console.log(userByIdPhoneNumber);
            console.log(userByIdHomeCity);
            console.log(userByIdHomeCountry);
            console.log(userByIdBio);
            console.log(token);
    
            const response = await fetch(`http://localhost:8080/api/user/${userId}/edit-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...(userByIdFirstName && { firstName: userByIdFirstName }),
                    ...(userByIdLastName && { lastName: userByIdLastName }),
                    ...(userByIdEmail && { email: userByIdEmail }),
                    ...(userByIdPhoneNumber && { phoneNumber: userByIdPhoneNumber }),
                    ...(userByIdHomeCity && { city: userByIdHomeCity }),
                    ...(userByIdHomeCountry && { country: userByIdHomeCountry }),
                    ...(userByIdBio && { bio: userByIdBio }),
                    ...(userByIdSpeaksLanguages && { speaksLanguages: userByIdSpeaksLanguages }),
                    ...(uploadedPhotos[0] && { profilePhoto: uploadedPhotos[0]}),
                }),
            });
    
            if (response.ok) {
                toast.success('Uspješno ste promjenili osobne informacije');
            } else {
                toast.error('Greška prilikom promjene osobnih informacija');
            }
        };

        if(photosUploadedSuccessfully === true) {
            handleSendForm();
        }
    }, [photosUploadedSuccessfully, userId, userByIdFirstName, userByIdLastName, userByIdEmail, userByIdPhoneNumber, userByIdHomeCity, userByIdHomeCountry, userByIdBio, userByIdSpeaksLanguages, uploadedPhotos, token]);


    return (
        <div className="max-w-screen-md mx-auto h-fit p-2">
            <h1 className="text-3xl font-bold">Promjeni osobne informacije</h1>
            <div className="user-informations-container w-full flex flex-col ">
                <div onClick={() => handleFirstNameActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Ime</p>
                         {firstNameActive && <input type="text" value={userByIdFirstName} placeholder="Ime" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4 text-lg" onChange={(e) => setFirstName(e.target.value)}/> }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handleLastNameActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Prezime</p>
                         {lastNameActive && <input type="text" value={userByIdLastName} placeholder="Prezime" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4 text-lg" onChange={(e) => setLastName(e.target.value)}/> }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handleEmailActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Email</p>
                         {emailActive && <input type="email" value={userByIdEmail} placeholder="Email" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4 text-lg" onChange={(e) => setEmail(e.target.value)}/> }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handlePhoneNumberActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Broj telefona</p>
                         {phoneNumberActive && <input type="text" value={userByIdPhoneNumber} placeholder="Broj telefona" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4 text-lg" onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}/> }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handleHomeCityActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Grad</p>
                         {homeCityActive && <input type="text" value={userByIdHomeCity} placeholder="Mjesto" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4 text-lg" onChange={(e) => setHomeCity(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}/> }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handleHomeCountryActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Država</p>
                         {homeCountryActive && <input type="text" value={userByIdHomeCountry} placeholder="Država" className=" appearance-none focus:outline-none rounded-lg p-2 w-3/4 text-lg" onChange={(e) => setHomeCountry(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}/> }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handleBioActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Opis profila</p>
                         {bioActive &&  
                         <Flex vertical gap={32}>
                         <TextArea
                          className="w-full"
                          value={userByIdBio}
                          showCount
                          maxLength={512}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Upišite svoj opis"
                          style={{width: '40rem'}}
                          
                        />
                    </Flex>
                    }
                     </div>
                     
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div onClick={() => handleSpeaksLanguagesActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                     <div className="flex flex-col gap-4">
                         <p className="text-lg font-light">Odaberi jezike koje govorite</p>
                         {speaksLanguagesActive && 
                         
                         <>
                          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Odaberi sve
                          </Checkbox>
                          <Divider />
                          <CheckboxGroup options={plainOptions} value={checkedList} 
                             onChange={(checkedValues) => {
                                console.log(checkedValues);
                                setCheckedList(checkedValues as string[]);
                                setSpeaksLanguages(checkedValues as string[]);
                              }}
                          />
                        </>
                         }
                     </div>
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                 
                 <div onClick={() => handleProfilePhotoActive()} className="flex  justify-between mt-4 p-6 border rounded-lg">
                 <p className="text-lg font-light">Profilna fotografija</p>
                    {profilePhotoActive && <div className="photos flex flex-col items-center justify-center w-full h-fit p-4 mt-24">
                                                    <h1 className="text-4xl font-semibold w-full">Dodajte/Promjenite Profilnu fotografiju</h1>
                                                    <div className="w-1/3 mt-10" {...getRootProps()}>
                                                      <input accept=".png, .jpg, .jpeg" className="w-full" {...getInputProps()} />
                                
                                                        
                                                            <div className={`  ${isDragActive ? ' bg-gray-100' : ''} w-full flex flex-col h-40 border-2 cursor-pointer border-dashed border-gray-300  items-center justify-center`}>
                                                                <FaRegImage className="w-20 h-20" />
                                                            </div>
                    
                                                        
                                                          
                                                        
                                                      
                                                    </div>
                                                    {previewPhoto && (
                                                        <div className="flex flex-wrap justify-center items-center w-full mt-6">
                                                            {previewPhoto.map((photo, index) => (
                                                                <div key={index} className="w-1/2 h-40 mr-4 mt-4">
                                                                    <img src={photo} className="w-full h-full object-cover" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        
                                                    )}
                                                    
                                                </div>}
                     
                     <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                </div>
                <div className="edit-profile-button flex justify-center items-center w-full h-fit p-4">
                    <button onClick={sendPhotoForm} className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xl w-1/2 rounded-lg p-4 ">Uredi profil</button>
                </div>
                
            
                                                    

            </div>
        </div>
    );
};
export default EditProfilePage;


