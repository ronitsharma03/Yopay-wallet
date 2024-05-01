import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      const firstname = ((response.data.firstName).charAt(0).toUpperCase() + (response.data.firstName).slice(1));
      localStorage.setItem("name", firstname);
      toast.loading("Signing in...", {
        duration: 1000
      });

      await new Promise(resolve => setTimeout(resolve, 1200));
      navigate("/dashboard");
    } catch (error) {
      toast.error("Check username and password!", {
        duration: 2000
      });
    }
  }
  // console.log(postData)


  return <div className="bg-slate-600 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-full text-center p-12 h-max px-8">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setUsername(e.target.value)
        }} placeholder="your@gmail.com" label={"Email"} type={"email"} />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} type={"password"}/>
        <div className="pt-4">
          <Button onClick={postData} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
    />
  </div>
}