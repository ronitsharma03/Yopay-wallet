import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    //Should use debouncing here in real world
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk?filter=` + filter,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )
            .then(response => {
                setUsers(response.data.user);
            })

    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-xl">
            Users
        </div>
        <div className="my-2">
            <input onChange={e => [
                setFilter(e.target.value)
            ]} type="text" placeholder="Search users..." className="w-full px-3 py-2 border rounded border-slate-200"></input>
        </div>
        <div className="text-lg flex flex-col gap-4 pt-5">
            {
                users ? users.map((user, index) => {
                    return (
                        <User key={index} user={user} />
                    )
                })  : <div className="border-8 border-l-zinc-500 rounded-full w-16 h-16 animate-spin"></div>
            }
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate();
    return (
            <div className="flex justify-between shadow-md p-3 border">
                <div className="flex">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user.firstName[0]}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-ful">
                        <div>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center h-full">
                    <Button onClick={(e) => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName);
                    }} label={"Send Money"} />
                </div>
            </div>

    )
}