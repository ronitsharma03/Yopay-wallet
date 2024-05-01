import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import axios from "axios"


export const Dashboard = () => {
    const [balance, setBalance] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/balance`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBalance(response.data.balance)
            })
    }, [balance]);

    const refresh = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/balance`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(async response => {
                setBalance(response.data.balance)
            })
    }

    return (
        <div className=" overflow-hidden">
            <Appbar user={localStorage.getItem("name")} />

            {
                balance ? <div className="m-8">
                    <Balance value={balance} refresh={refresh} />
                    <Users />
                </div> : <div className="w-full h-screen bg-slate-400 flex justify-center items-center"> <div className="mb-20 w-16 h-16 border-8 border-l-black rounded-full animate-spin"></div></div>
            }
        </div>
    )
}