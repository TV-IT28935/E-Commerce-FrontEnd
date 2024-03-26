import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/images/login.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    // const userData = useSelector((state) => state).userInfo;
    const dispatch = useDispatch();
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { email, password } = data;
            if (email && password) {
                const result = await axios.post(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
                    data
                );
                if (result.data.EC === 0) {
                    dispatch(loginRedux(result.data));
                    toast(result.data.EM);
                    navigate("/");
                }
            } else {
                alert("Please enter the complete data field!");
            }
        } catch (error) {
            toast(error.response.data.EM);
        }
    };
    return (
        <div className="p-3 md:p-4 select-none">
            <div className="w-full max-w-md bg-white m-auto flex flex-col p-4">
                {/* <h1 className="text-center text-2xl font-bold">Sign up</h1> */}
                <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
                    <img src={login} className="w-full" />
                </div>

                <form
                    className="w-full py-3 flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded rounded focus-within:outline-blue-300"
                    />
                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                            className="w-full bg-slate-200 border-none outline-none  "
                        />
                        <div
                            onClick={handleShowPassword}
                            className="flex text-xl cursor-pointer"
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="max-w-[160px] w-full m-auto bg-blue-500 hover:bg-blue-600 font-medium text-center py-2 text-white cursor-pointer rounded-full mt-4"
                    >
                        Login
                    </button>
                </form>
                <p className="text-left text-sm mt-2">
                    Do you have an account yet?{" "}
                    <Link className="text-red-500 underline" to={"/sign-up"}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
