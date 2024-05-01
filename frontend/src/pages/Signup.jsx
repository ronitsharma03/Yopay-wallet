import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast, {Toaster} from "react-hot-toast"


export const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const SignupData = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
                username,
                password,
                firstName,
                lastName
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", ((firstName).charAt(0).toUpperCase() + (firstName).slice(1)));
            toast.loading("Signing up...", {
                duration: 1000
            });
            await new Promise(resolve => setTimeout(resolve, 1200));
            navigate("/dashboard");
        } catch (error) {
            toast.error("Check Inputs!", {
                duration: 2000
            });
        }
    }

    return (
        <div className="bg-slate-600 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-full text-center p-8 h-max px-8">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create a new account"} />
                    <InputBox onChange={e => {
                        setFirstName(e.target.value)
                    }} placeholder={"Firstname"} label={"First Name"} type={"text"} />
                    <InputBox onChange={e => {
                        setLastName(e.target.value)
                    }} placeholder={"Lastname"} label={"Last Name"} type={"text"}/>
                    <InputBox onChange={e => {
                        setUsername(e.target.value)
                    }} placeholder={"your@example.com"} label={"Email"} type={"email"}/>
                    <InputBox onChange={e => {
                        setPassword(e.target.value)
                    }} placeholder={"123456"} label={"Password"} type={"password"}/>
                    <div className="pt-4">
                        <Button onClick={SignupData} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
            <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
        </div>
    )
}