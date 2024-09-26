"use client";

export default function ContactUs() {
    return (
        <div className="min-w-screen min-h-screen bg-white flex flex-row justify-center items-center">
            <form action="" className="min-w-fit text-black flex flex-col justify-center items-center px-16 py-12 gap-2 rounded-lg m-10"  style={{border:"2px solid black"}}>
               <div className="flex flex-col gap-2">
               <div className="flex flex-col gap-2" >
                    <label htmlFor="" className="font-bold">Name</label>
                    <input type="text" name="" className="px-2 py-1 rounded-md" id="" placeholder="Enter your name" style={{ border: "2px solid black" }} />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="" className="font-bold">Email ID</label>
                    <input type="email" className="px-2 py-1 rounded-md" placeholder="Enter your Email ID" style={{ border: "2px solid black" }} />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="" className="font-bold">Contact Number</label>
                    <input type="number" className="px-2 py-1 rounded-md" placeholder="Enter your Contact Number" style={{ border: "2px solid black" }} />
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="" className="font-bold">Message</label>
                    {/* <input type="email" className="px-2 py-1" placeholder="Enter your Email ID" style={{ border: "2px solid black" }} /> */}
                    <textarea name="" id="" className="px-2 w-full py-1 rounded-md" placeholder="Leave us a message" style={{ border: "2px solid black" }}></textarea>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <button className="text-center px-4 py-2 rounded-md" style={{border:"2px solid black"}}>
                        Send
                    </button>
                </div>
               </div>
            </form>
        </div>
    )
}