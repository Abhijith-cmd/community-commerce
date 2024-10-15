
//main code
// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from 'next/navigation';


// export default function SignUpPage() {
//     const router = useRouter();
 
//     const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

//     const [firstName, setFirstName] = useState<string>("");
//     const [lastName, setLastName] = useState<string>("");
//     const [username, setUsername] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [confirmPassword, setConfirmPassword] = useState<string>("");
//     const [address, setAddress] = useState({
//         line1: "",
//         line2: "",
//         city: "",
//         state: "",
//         country: "",
//         pincode: ""
//     });
//     const [locality, setLocality] = useState<string>("");
//     const [community, setCommunity] = useState<string>("");
//     const [preferredLanguage, setPreferredLanguage] = useState<string>("");
//     const [phoneNumber, setPhoneNumber] = useState<string>("");

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//          // Check if passwords match
//          if (password !== confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }

//         // Create request body
//         const requestBody = {
//             firstName,
//             lastName,
//             username,
//             password,
//             status: true,
//             address: {
//                 line1: address.line1,
//                 line2: address.line2,
//                 city: address.city,
//                 state: address.state,
//                 country: address.country,
//                 pincode: address.pincode
//             },
//             locality,
//             community,
//             preferredLanguage,
//             phoneNumber
//         };

//         try {
//             const response = await axios.post("/api/loginRoutes", requestBody);
//             console.log(response.data);
//             // Handle successful response (e.g., redirect or show success message)
//             router.push('/');
//         } catch (error) {
//             console.error(error);
//             // Handle error (e.g., show error message)
//         }
//     };

//     // second function
//     // const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
    
//     //     // Check if passwords match
//     //     if (password !== confirmPassword) {
//     //         alert("Passwords do not match!");
//     //         return;
//     //     }
    
//     //     // Additional validation can be added here
    
//     //     // Create request body
//     //     const requestBody = {
//     //         firstName,
//     //         lastName,
//     //         username,
//     //         password,
//     //         status: true,
//     //         address,
//     //         locality,
//     //         community,
//     //         preferredLanguage,
//     //         phoneNumber
//     //     };
    
//     //     try {
//     //         const response = await axios.post("/api/loginRoutes", requestBody);
//     //         console.log(response.data);
            
//     //         // Automatically sign the user in after successful sign-up
//     //         const result = await signIn("credentials", {
//     //             redirect: false,
//     //             username,
//     //             password,
//     //         });
    
//     //         if (result?.error) {
//     //             alert("Sign-in failed: " + result.error);
//     //             // Optionally handle the error display
//     //         } else {
//     //             // Redirect to homepage after successful sign-in
//     //             router.push("/");
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //         alert("Sign-up failed. Please try again."); // Display user-friendly error message
//     //     }
//     // };
    
    


//     return (


//         <div className="min-w-screen min-h-screen flex flex-row justify-center items-center p-4 bg-white">
//             <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-row justify-center items-center shrink-0">
//                 <div className="text-black w-full flex-col login-form justify-center items-center px-20 py-20 rounded-lg" style={{ border: "2px solid black" }}>
//                     <div className="px-4 py-4"><h1 className="font-bold text-center text-2xl cursor-pointer" onClick={()=>router.push('/')}>Logo</h1></div>
                    
//                     {/* First Name */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="first_name" className="font-bold w-full">First Name</label>
//                         <input type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
//                     </div>
                    
//                     {/* Last Name */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="last_name" className="font-bold w-full">Last Name</label>
//                         <input type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
//                     </div>

//                     {/* Email ID */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="email_id" className="font-bold w-full">Email ID</label>
//                         <input type="email" id="email_id" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
//                     </div>

//                     {/* Password */}
//                     <div className="flex flex-col m-auto py-4">
//                         <label htmlFor="password" className="font-bold">Password</label>
//                         <div className="relative">
//                             <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" type={passwordVisible ? "text" : "password"} style={{ border: "2px solid black" }} required />
//                             <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setPasswordVisible(!passwordVisible)}>
//                                 <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Confirm Password */}
//                     <div className="flex flex-col m-auto py-4">
//                         <label htmlFor="confirmpassword" className="font-bold">Re-Enter Password</label>
//                         <div className="relative">
//                             <input id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" type={confirmPasswordVisible ? "text" : "password"} style={{ border: "2px solid black" }} required />
//                             <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
//                                 <FontAwesomeIcon icon={confirmPasswordVisible ? faEye : faEyeSlash} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Address Fields */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="address" className="font-bold w-full">Address</label>
//                         <div className="flex flex-col gap-4">
//                             <input type="text" placeholder="Line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
//                             <input type="text" placeholder="Line 2" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
//                             <input type="text" placeholder="Enter City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
//                             <input type="text" placeholder="Enter State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
//                             <input type="text" placeholder="Enter Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
//                             <input type="number" placeholder="Enter Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
//                         </div>
//                     </div>

//                     {/* Locality */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="locality" className="font-bold w-full">Locality</label>
//                         <input type="text" id="locality" value={locality} onChange={(e) => setLocality(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
//                     </div>

//                     {/* Community */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="community" className="font-bold w-full">Community</label>
//                         <select value={community} onChange={(e) => setCommunity(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required>
//                             <option value="">Select A Community</option>
//                             <option value="Indian Community">Indian Community</option>
//                             <option value="Asian Community">Asian Community</option>
//                             <option value="Chinese Community">Chinese Community</option>
//                         </select>
//                     </div>

//                     {/* Preferred Language */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="preferred_language" className="font-bold w-full">Preferred Language</label>
//                         <input type="text" id="preferred_language" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
//                     </div>

//                     {/* Phone Number */}
//                     <div className="flex flex-col m-auto py-4 min-w-1/2">
//                         <label htmlFor="phone_number" className="font-bold w-full">Phone Number</label>
//                         <input type="tel" id="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-center w-full py-4">
//                         <button type="submit" className="bg-black text-white rounded-lg px-4 py-2">Sign Up</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }


//secondary code from abhijith(2)
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Select, { MultiValue } from 'react-select';
 
// Define the option type
interface OptionType {
  value: string;
  label: string;
}
 
 
 
export default function SignUpPage() {
    const router = useRouter();
 
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
 
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>(""); // Confirm Email input
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
   
    const [address, setAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });
    // Define the locality options
const localityOptions: OptionType[] = [
  { value: 'kasaragod', label: 'Kasaragod' },
  { value: 'toronto', label: 'Toronto' },
  { value: 'montreal', label: 'Montreal' },
  { value: 'kannur', label: 'Kannur' },
  { value: 'palakkad', label: 'Palakkad' }
];
    //const [locality, setLocality] = useState<string>("");
    const [community, setCommunity] = useState<string>("");
    const [preferredLanguage, setPreferredLanguage] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
 
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
   // Fetch countries on component mount
   useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await axios.get('/api/countryState');
            const countryList = response.data.map((item: { country: string }) => item.country);
            setCountries(countryList);
        } catch (error) {
            console.error("Error fetching countries", error);
        }
    };
    fetchCountries();
    }, []);
   
    // Fetch states when a country is selected
    const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = e.target.value;
        setAddress({ ...address, country: selectedCountry });
   
        if (selectedCountry) {
            try {
                const response = await axios.get(`/api/countryState?country=${selectedCountry}`);
                setStates(response.data.states);
            } catch (error) {
                console.error("Error fetching states", error);
            }
        } else {
            setStates([]);
        }
    };
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       
        // Email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
        // Check if emails match
        if (username !== confirmEmail) {
            alert("Emails do not match!");
            return;
        }
 
        // Check if email is valid
        if (!emailRegex.test(username)) {
            alert("Please enter a valid email address!");
            return;
        }
 
         // Check if passwords match
         if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
 
        // Create request body
        const requestBody = {
            firstName,
            lastName,
            username,
            password,
            status: true,
            address: {
                line1: address.line1,
                line2: address.line2,
                city: address.city,
                state: address.state,
                country: address.country,
                pincode: address.pincode
            },
            //locality,
            community,
            preferredLanguage,
            phoneNumber
        };
 
        try {
            const response = await axios.post("/api/loginRoutes", requestBody);
            console.log(response.data);
            // Handle successful response (e.g., redirect or show success message)
            router.push('/');
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show error message)
        }
    };
      const [locality, setLocality] = useState<OptionType[]>([]);
   
      const handleLocalityChange = (selectedOptions: MultiValue<OptionType>) => {
        setLocality(selectedOptions as OptionType[]);
     
      }
      // Function to handle first name input with validation for alphabets
      const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {  // Regex to allow only alphabet characters
          setFirstName(value);
          setFirstNameError('');  // Clear error if valid input
        } else {
          setFirstNameError('Only alphabetic characters are allowed.');
        }
      };
    
      // Function to handle last name input with validation for alphabets
      const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {  // Regex to allow only alphabet characters
          setLastName(value);
          setLastNameError('');  // Clear error if valid input
        } else {
          setLastNameError('Only alphabetic characters are allowed.');
        }
        
      };
      const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  // Function to handle phone number input and allow only numeric values
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {  // Regex to allow only digits
      setPhoneNumber(value);
      setPhoneNumberError('');  // Clear error if valid input
    } else {
      setPhoneNumberError('Only numeric characters are allowed.');
    }};
      
    return (
        // <div className="min-w-screen min-h-screen flex flex-row justify-center items-center p-4 bg-white">
        //     <form action="" className="w-full max-w-md flex flex-row justify-center items-center shrink-0">
        //         <div className=" text-black w-full flex-col login-form justify-center items-center px-20 py-20 rounded-lg" style={{ border: "2px solid black" }}>
        //             <div className="px-4 py-4"><h1 className="font-bold text-center text-2xl">Community Commerce</h1></div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="first_name" className="font-bold w-full ">First Name</label>
        //                 <input type="text"
        //                     id="first_name"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
        //             </div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="last_name" className="font-bold w-full ">Last Name</label>
        //                 <input type="text"
        //                     id="last_name"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
        //             </div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="email_id" className="font-bold w-full ">Email ID</label>
        //                 <input type="email"
        //                     id="email_id"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
        //             </div>
        //             <div className=" flex flex-col m-auto py-4">
        //                 <label htmlFor="password" className="font-bold">Password</label>
        //                 {/* <input
        //                     id="password"
        //                     className="rounded-lg outline-none px-2 py-1 border-none" type="password" style={{ border: "2px solid black" }} required /> */}
        //                 <div className="relative">
        //                     <input
        //                         id="password"
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         className="rounded-lg outline-none px-2 py-1 border-none w-full"
        //                         type={passwordVisible ? "text" : "password"}  // Toggle input type
        //                         style={{ border: "2px solid black" }}
        //                         required
        //                     />
        //                     <button
        //                         type="button"
        //                         className="absolute inset-y-0 right-0 flex items-center pr-3"
        //                         onClick={() => setPasswordVisible(!passwordVisible)}  // Toggle visibility
        //                     >
        //                         <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
        //                     </button>
        //                 </div>
        //             </div>
        //             <div className=" flex flex-col m-auto py-4">
        //                 <label htmlFor="confirmpassword" className="font-bold">Re-Enter Password</label>
        //                 {/* <input
        //                     id="password"
        //                     className="rounded-lg outline-none px-2 py-1 border-none" type="password" style={{ border: "2px solid black" }} required /> */}
        //                 <div className="relative">
        //                     <input
        //                         id="confirmpassword"
 
        //                         // onChange={(e) => setPassword(e.target.value)}
        //                         className="rounded-lg outline-none px-2 py-1 border-none w-full"
        //                         type={confirmPasswordVisible ? "text" : "password"}  // Toggle input type
        //                         style={{ border: "2px solid black" }}
        //                         required
        //                     />
        //                     <button
        //                         type="button"
        //                         className="absolute inset-y-0 right-0 flex items-center pr-3"
        //                         onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}  // Toggle visibility
        //                     >
        //                         <FontAwesomeIcon icon={confirmPasswordVisible ? faEye : faEyeSlash} />
        //                     </button>
        //                 </div>
        //             </div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="address" className="font-bold w-full ">Address</label>
        //                 {/* <input type="text"
        //                     id="address"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required /> */}
        //                 <div className="flex flex-col gap-4">
        //                     {/* <textarea style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" placeholder="Line 1" name="" id=""></textarea>
        //           <textarea style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" placeholder="Line 2" name="" id=""></textarea> */}
        //                     <input type="text" placeholder="Line 1" style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
        //                     <input type="text" placeholder="Line 2" style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
        //                     <input type="text" placeholder="Enter City" style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
        //                     <input type="text" placeholder="Enter State" style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
        //                     <input type="text" placeholder="Enter Country" style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
        //                     <input type="number" placeholder="Enter Pincode" style={{ border: "2px solid black" }} className="rounded-lg outline-none px-2 py-1" />
        //                 </div>
        //             </div>
 
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="locality" className="font-bold w-full ">Locality</label>
        //                 <input type="text"
        //                     id="locality"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
        //             </div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="community" className="font-bold w-full ">Community</label>
        //                 {/* <input type="text"
        //                     id="community"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required /> */}
        //                 <select className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required >
        //                     <option value="">Select A Community</option>
        //                     <option value="">Indian Community</option>
        //                     <option value="">Asian Community</option>
        //                     <option value="">Chinese Community</option>
        //                 </select>
        //             </div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="language" className="font-bold w-full ">Preferred Language</label>
        //                 <input type="text"
        //                     id="language"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
        //             </div>
        //             <div className=" flex flex-col m-auto py-4 min-w-1/2">
        //                 <label htmlFor="phone_number" className="font-bold w-full ">Phone Number</label>
        //                 <input type="number"
        //                     id="phone_number"
        //                     className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
        //             </div>
 
        //             <div className=" flex flex-col m-auto py-4 ">
        //                 <button type="submit" className="bg-black text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-600 hover:border-solid hover:border-blue-600 hover:text-white ">Sign Up</button>
        //             </div>
        //         </div>
        //     </form>
        // </div>
 
        <div className="min-w-screen min-h-screen flex flex-row justify-center items-center p-4 bg-gray-100">
  <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col justify-center items-center shrink-0">
    <div className="bg-white w-full flex-col login-form justify-center items-center px-10 py-10 rounded-lg shadow-lg border-2 border-gray-300">
      <div className="mb-6">
        <h1 className="font-bold text-center text-3xl text-gray-800 cursor-pointer" onClick={() => router.push('/')}>Logo</h1>
      </div>
 
      {/* First Name */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="first_name" className="font-bold text-gray-700">First Name</label>
        <input
          type="text"
          id="first_name"
          value={firstName}
          onChange={handleFirstNameChange}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300"
          style={{ border: "1px solid black" }}
          required
        />
        {firstNameError && <span className="text-red-500">{firstNameError}</span>} {/* Error message */}
      </div>

      {/* Last Name */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="last_name" className="font-bold text-gray-700">Last Name</label>
        <input
          type="text"
          id="last_name"
          value={lastName}
          onChange={handleLastNameChange}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300"
          style={{ border: "1px solid black" }}
          required
        />
        {lastNameError && <span className="text-red-500">{lastNameError}</span>} {/* Error message */}
      </div>
 
      {/* Email ID */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="email_id" className="font-bold text-gray-700">Email ID</label>
        <input
          type="email"
          id="email_id"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
          required
        />
      </div>
 
      {/* Confirm Email */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="confirm_email" className="font-bold text-gray-700">Confirm Email ID</label>
        <input
          type="email"
          id="confirm_email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
          required
        />
      </div>
 
      {/* Password */}
      <div className="flex flex-col m-auto py-4">
                        <label htmlFor="password" className="font-bold text-gray-700">Password</label>
                        <div className="relative">
                            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" type={passwordVisible ? "text" : "password"} style={{ border: "1px solid black" }} required />
                            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setPasswordVisible(!passwordVisible)}>
                                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
 
                    {/* Confirm Password */}
                    <div className="flex flex-col m-auto py-4">
                        <label htmlFor="confirmpassword" className="font-bold text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" type={confirmPasswordVisible ? "text" : "password"} style={{ border: "1px solid black" }} required />
                            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <FontAwesomeIcon icon={confirmPasswordVisible ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
 
     
      {/* Address Fields */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="address" className="font-bold text-gray-700">Address</label>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Line 1"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
          />
          <input
            type="text"
            placeholder="Line 2"
            value={address.line2}
            onChange={(e) => setAddress({ ...address, line2: e.target.value })}
            className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
          />
          <input
            type="text"
            placeholder="Enter City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
          />
        </div>
      </div>
 
      {/* Country Dropdown */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="country" className="font-bold text-gray-700">Country</label>
        <select
          value={address.country}
          onChange={handleCountryChange}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
        >
          <option value="">Select Country</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
 
      {/* State Dropdown */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="state" className="font-bold text-gray-700">State/Province</label>
        <select
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
        >
          <option value="">Select State/Province</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full mb-4">
      <label htmlFor="state" className="font-bold text-gray-700">Post Code</label>
 
      <input
        type="number"
        placeholder="Enter Postcode"
        value={address.pincode}
        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300 mb-4" style={{ border: "1px solid black" }}
      />
      </div>
 
      <div className="flex flex-col w-full mb-4">
      <label htmlFor="locality" className="font-bold text-gray-700">Locality</label>
      <Select
        isMulti
        id="locality"
        options={localityOptions}
        className="rounded-lg outline-none border-2 border-gray-300 focus:border-blue-500 transition duration-300"
        value={locality}
        onChange={handleLocalityChange}
        placeholder="Select localities..."
        classNamePrefix="select"
      />
    </div>
      {/* Community */}
      <div className="flex flex-col w-full mb-4">
        <label htmlFor="community" className="font-bold text-gray-700">Community</label>
        <select
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="rounded-lg outline-none px-4 py-2 border-2 border-gray-300 focus:border-blue-500 transition duration-300" style={{ border: "1px solid black" }}
          required
        >
          <option value="">Select A Community</option>
          <option value="Indian Community">Indian Community</option>
          <option value="Western Community">Western Community</option>
          <option value="African Community">African Community</option>
          <option value="American Community">American Community</option>
        </select>
      </div>
 
       {/* Preferred Language */}
       <div className="flex flex-col m-auto py-4 min-w-1/2">
                        <label htmlFor="preferred_language" className="font-bold w-full">Preferred Language</label>
                        <input type="text" id="preferred_language" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} className="rounded-lg outline-none px-2 py-1 border-none w-full" style={{ border: "2px solid black" }} required />
                    </div>
 
       {/* Phone Number */}
       <div className="flex flex-col m-auto py-4 min-w-1/2">
        <label htmlFor="phone_number" className="font-bold w-full">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="rounded-lg outline-none px-2 py-1 border-none w-full"
          style={{ border: "2px solid black" }}
          required
        />
        {phoneNumberError && <span className="text-red-500">{phoneNumberError}</span>} {/* Error message */}
      </div>              

      
 
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-bold" style={{ border: "1px solid black" }}
      >
        Sign Up
      </button>
 
     
    </div>
  </form>
</div>
 
    );
}
 