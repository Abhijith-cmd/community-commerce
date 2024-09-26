"use client";
import { useState } from "react";

export default function Profile() {
    const [photo, setPhoto] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="text-white bg-white">
            <div className='w-full min-h-screen text-white'>
                <div className='flex flex-col min-h-screen justify-center items-center py-10 '>
                    <div className='text-black px-4 py-4'>Profile Page</div>
                    <div>
                        <form action="" className='flex flex-col rounded-md px-16 py-16 gap-4 text-black' style={{ border: "2px solid black" }}>
                            <div>Edit Profile</div>
                            <span className='flex flex-row  justify-center items-center gap-4'><div className=" text-white"
                                style={{
                                    borderRadius: "50%", width: "100px", height: "100px", backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(${photo || 'path/to/placeholder-image.jpg'})`
                                }}>

                            </div>
                               <label htmlFor="" className="cursor-pointer flex flex-row items-center">
                               <div>
                                    <input
                                        type="file"
                                        id="photoUpload"
                                        name="photoUpload"
                                        className="cursor-pointer"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    // Handle file selection
                                    // onChange={(e) => {
                                    //     const file = e.target.files?.[0];
                                    //     if (file) {
                                    //         // Handle file upload or preview
                                    //         console.log(file);
                                    //     }
                                    // }}
                                    />
                                </div>
                                <div>Photo Upload</div>
                               </label>
                                {/* <div>Photo Upload</div> */}
                            </span>
                            <div className='flex flex-col'>
                                <label htmlFor="">Name</label>
                                <input type="text" className='px-3 py-2 outline-none rounded-md text-black' style={{ border: "2px solid black" }} placeholder='Name' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Date Of Birth</label>
                                <input type="date" className='px-3 py-2 outline-none rounded-md text-black' style={{ border: "2px solid black" }} />
                            </div>
                            <div className="flex flex-row gap-4 px-2 py-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        className="mr-2"
                                    />
                                    Male
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        className="mr-2"
                                    />
                                    Female
                                </label>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <button className="px-4 py-2 rounded-lg" style={{ border: "2px solid black" }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}