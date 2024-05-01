import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const Appbar = ({ user }) => {

    const navigate = useNavigate();

    const logout = async () => {
        toast.loading("logging out...",{
            duration: 1000
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
        localStorage.clear();
        navigate("/signin");
    }

    return (
        <div className="pt-2">
            <div className="h-14 flex justify-between">
                <div className="flex flex-col justify-center h-full ml-7 font-bold text-2xl">
                    YOPAY Wallet
                </div>
                <div className="flex">
                    <div className="flex flex-col justify-center h-full mr-4 text-lg">
                        Hello, {user}
                    </div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user[0]}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mr-14 ml-5">
                        <button onClick={logout} className="bg-zinc-800 p-2 px-5 rounded-lg text-white">Logout</button>
                    </div>
                </div>

            </div>
            <div className="w-full h-2 shadow-md">

            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}