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

    return (
        <div>
            <Appbar user={localStorage.getItem("name")} />

            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}