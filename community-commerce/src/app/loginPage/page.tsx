// "use client";
// import { useState } from "react"
// import axios from "axios"
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";


// export default function LoginPage() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("/api/loginValidationRoutes", {
//                 username,
//                 password
//             });

//             // Show success toast
//             toast.success(response.data.message);
//             router.push("/home");
//         } catch (err: any) {
//             // Show error toast
//             toast.error(err.response?.data.error || 'An unexpected error occurred');
//         }
//     };

//     return (
//         <div className="min-w-screen min-h-screen flex flex-row justify-center items-center">
//             <form action="" onSubmit={handleLogin} className="w-2/5 flex flex-row justify-center items-center">

//                 <div className="bg-green-300 text-black w-full flex-col login-form justify-center items-center px-20 py-20 rounded-lg">
//                     <div className="px-4 py-4"><h1 className="font-bold text-center text-2xl">Community Commerce</h1></div>
//                     <div className=" flex flex-col m-auto px-4 py-4 min-w-1/2">
//                         <label htmlFor="username" className="font-bold w-full ">Username</label>
//                         <input type="text"
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="rounded-lg outline-none px-2 py-1 border-none w-full" required />
//                     </div>
//                     <div className=" flex flex-col m-auto px-4 py-4">
//                         <label htmlFor="password" className="font-bold">Password</label>
//                         <input
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="rounded-lg outline-none px-2 py-1 border-none" type="password" required />
//                     </div>
//                     <div className=" flex flex-col m-auto px-4 py-4 ">
//                         <button type="submit" className="bg-black
//                          text-white
//                           rounded-lg 
//                           px-4
//                            py-2 
//                           font-bold
//                          hover:bg-gray-600
//                          hover:border-solid hover:border-blue-600
//                           hover:text-white ">Log in</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }


"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

// Define a type for the expected API response
interface LoginResponse {
    message: string;
    token: string;
}

// Define a type for the API error response
interface ApiError {
    error: string;
}

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const router = useRouter();
    const { setToken } = useAuth()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>("/api/loginValidationRoutes", {
                username,
                password
            });

            // Show success toast
            // toast.success(response.data.message);
            // Store the token in context
            setToken(response.data.token); // Set the token in the context
            console.log("the value in the set token",response.data.token);
            
            router.push("/home");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                // Cast the error to AxiosError<ApiError>
                const axiosError = err as AxiosError<ApiError>;
                // Show error toast
                toast.error(axiosError.response?.data.error || 'An unexpected error occurred');
            } else {
                // Handle unexpected errors
                toast.error('An unexpected error occurred');
            }
        }
    };

    const handleNavigation = (path: string) => {
        router.push(path);
      };

    return (
        <div className="min-w-screen min-h-screen flex flex-row justify-center items-center p-4 bg-white">
            <form action="" onSubmit={handleLogin} className="w-full max-w-md flex flex-row justify-center items-center shrink-0">
                <div className=" text-black w-full flex-col login-form justify-center items-center px-20 py-20 rounded-lg" style={{ border: "2px solid black" }}>
                    <div className="px-4 py-4"><h1 className="font-bold text-center text-2xl  cursor-pointer" onClick={()=>handleNavigation('/')}>Logo</h1></div>
                    <div className=" flex flex-col m-auto py-4 min-w-1/2">
                        <label htmlFor="username" className="font-bold w-full ">Username</label>
                        <input type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
                    </div>
                    <div className=" flex flex-col m-auto py-4">
                        <label htmlFor="password" className="font-bold">Password</label>
                        {/* <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-lg outline-none px-2 py-1 border-none" type="password" style={{border:"2px solid black"}} required />
                             */}
                        <div className="relative">
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-lg outline-none px-2 py-1 border-none w-full"
                                type={passwordVisible ? "text" : "password"}  // Toggle input type
                                style={{ border: "2px solid black" }}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setPasswordVisible(!passwordVisible)}  // Toggle visibility
                            >
                                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
                    <div className=" flex flex-col m-auto py-4 ">
                        <button type="submit" className="bg-black text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-600 hover:border-solid hover:border-blue-600 hover:text-white ">Log in</button>
                    </div>
                </div>
            </form>
        </div>
        // <div className="min-w-screen min-h-screen flex flex-col justify-center items-center p-4">
        //     <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col justify-center items-center bg-green-300 text-black px-6 py-8 rounded-lg shadow-md">
        //         <h1 className="font-bold text-center text-2xl mb-4">Community Commerce</h1>
        //         <div className="flex flex-col mb-4">
        //             <label htmlFor="username" className="font-bold mb-2">Username</label>
        //             <input
        //                 type="text"
        //                 id="username"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 className="rounded-lg outline-none px-3 py-2 border-none w-full"
        //                 required
        //             />
        //         </div>
        //         <div className="flex flex-col mb-4">
        //             <label htmlFor="password" className="font-bold mb-2">Password</label>
        //             <input
        //                 id="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 className="rounded-lg outline-none px-3 py-2 border-none w-full"
        //                 type="password"
        //                 required
        //             />
        //         </div>
        //         <button
        //             type="submit"
        //             className="bg-black text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-600 transition-colors"
        //         >
        //             Log in
        //         </button>
        //     </form>
        // </div>
    );
}
