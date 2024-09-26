export default function Sidebar() {
    return (
        <div className="w-full">
            <div className="w-3/5 flex flex-col text-black text-center bg-green-200 text-xl  font-bold gap-4">
                <div>
                <h1 className="font-bold text-2xl px-4 pt-8">Community Commerce</h1>
                </div>
                <div className="px-4 py-10 flex flex-col gap-4">
                    <div className=" hover:bg-green-500 px-2 py-2 rounded-lg">Dashboard</div>
                    <div className=" hover:bg-green-500 py-2 px-2 rounded-lg">Communities</div>
                    <div className=" hover:bg-green-500 py-2 px-2 rounded-lg">Products</div>
                    <div className=" hover:bg-green-500 py-2 px-2 rounded-lg">Orders</div>
                    <div className=" hover:bg-green-500 py-2 px-2 rounded-lg">Customers</div>
                </div>
            </div>
        </div>
    )
}