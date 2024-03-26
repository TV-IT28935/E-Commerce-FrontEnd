import React, { useState } from "react";
import login from "../assets/images/login.png";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleUploadProfileImage = async (e) => {
        const { name } = e.target;
        const imageUrl = await ImageToBase64(e.target.files[0]);
        setData({ ...data, [name]: imageUrl });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { firstName, lastName, email, password, confirmPassword } =
                data;
            if (firstName && lastName && email && password && confirmPassword) {
                if (password === confirmPassword) {
                    const result = await axios.post(
                        `${process.env.REACT_APP_SERVER_DOMAIN}/sign-up`,
                        data
                    );
                    toast(result.data.EM);
                    if (result.data.EC === 0) {
                        navigate("/login");
                    }
                } else {
                    toast("Password and confirm password not equals");
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
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
                    <img
                        src={data.image ? data.image : login}
                        className="w-full h-full"
                    />
                    <label htmlFor="profileImage" className="cursor-pointer">
                        <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
                            <p className="text-white p-1 text-sm">Upload</p>
                        </div>
                        <input
                            type="file"
                            id="profileImage"
                            // accept="image/"
                            name="image"
                            className="hidden"
                            onChange={handleUploadProfileImage}
                        />
                    </label>
                </div>

                <form
                    className="w-full py-3 flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type={"text"}
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleOnChange}
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type={"text"}
                        id="lastName"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleOnChange}
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded rounded focus-within:outline-blue-300"
                    />

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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            className="w-full bg-slate-200 border-none outline-none "
                        />
                        <div
                            onClick={handleShowConfirmPassword}
                            className="flex text-xl cursor-pointer"
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="max-w-[160px] w-full m-auto bg-blue-500 hover:bg-blue-600 font-medium text-center py-2 text-white cursor-pointer rounded-full mt-4"
                    >
                        Sign up
                    </button>
                </form>
                <p className="text-left text-sm mt-2">
                    Already have account?{" "}
                    <Link className="text-red-500 underline" to={"/login"}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
