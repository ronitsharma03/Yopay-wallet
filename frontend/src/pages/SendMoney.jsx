import { useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const firstName = searchParams.get("name");
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const sendMoney = async () => {
        
        if (!amount || parseFloat(amount) < 1) {
            toast.error("Minimum amount to send is Rs 1", {
                duration: 800
            });
            return; // Exit the function if amount is invalid
        }
        toast.loading("Processing...", {
            duration: 1200
        });
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/account/transfer`, {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            toast.success("Money sent!");
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate("/dashboard");
        }
        catch (error) {
            toast.error(error);
        }
        
    }


    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-2 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col p-8">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">

                    <div className="flex items-center space-x-4 pb-6">
                        <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
                            <span className="text-2xl text-white">{firstName[0].toUpperCase()}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">{firstName}</h3>
                        </div>

                    </div>


                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                type="number"
                                onChange={e => {
                                    setAmount(e.target.value)
                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <button type="submit" onClick={sendMoney} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-400 text-white">
                            Send
                        </button>
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>
            </div>
        </div>
    </div>
}