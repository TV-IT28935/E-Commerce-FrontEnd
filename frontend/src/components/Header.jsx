import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
    const cartItems = useSelector((state) => state.user.cartItems);

    const [showMenu, setShowMenu] = useState(false);
    const { password, confirmPassword, ...userData } = useSelector(
        (state) => state.user.userInfo
    );
    const isAuthenticateuserData = useSelector(
        (state) => state.user.isAuthenticate
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };
    const handleLogout = () => {
        dispatch(logoutRedux());
        navigate("/login");
        toast("Log out successfully!");
    };
    const handleNewProduct = () => {
        navigate("/product");
    };

    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
            {/* desktop */}
            <div className="flex items-center h-full justify-between">
                <Link to={"/"} className="h-16">
                    <div className="h-16">
                        <img src={logo} className="h-full" />
                    </div>
                </Link>
                <div className="flex items-center gap-4 md:gap-6">
                    <nav className="flex gap-4 md:gap-6 text-base md:text-lg text-slate-600 max-md:hidden">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/menu"}>Menu</Link>
                        <Link to={"/about"}>About</Link>
                        <Link to={"/contact"}>Contact</Link>
                    </nav>
                    {isAuthenticateuserData && (
                        <div className="text-2xl text-slate-600 relative cursor-pointer">
                            <Link to={"/cart"}>
                                <BsCartFill />
                                <div className="absolute -top-2 -right-2 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-base text-center">
                                    <span>{cartItems.length}</span>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div
                        onClick={handleShowMenu}
                        className="text-xl text-slate-600"
                    >
                        <div className="text-3xl cursor-pointer rounded-full overflow-hidden drop-shadow-md flex items-center">
                            {userData.image ? (
                                <img className="w-9 h-9" src={userData.image} />
                            ) : (
                                <FaRegUserCircle className="text-4xl" />
                            )}
                        </div>
                        {showMenu && (
                            <div className="absolute right-4 bg-white shadow drop-shadow-md flex flex-col rounded overflow-hidden min-w-[120px]">
                                {isAuthenticateuserData ? (
                                    userData.email ===
                                    process.env.REACT_APP_ADMIN ? (
                                        <div>
                                            <p
                                                className="text-lg font-normal whitespace-nowrap cursor-pointer hover:bg-slate-200 active:bg-gray-300 py-2 px-4"
                                                onClick={handleNewProduct}
                                            >
                                                New product
                                            </p>
                                            <p
                                                className="text-lg font-normal whitespace-nowrap cursor-pointer hover:bg-slate-200 active:bg-gray-300 py-2 px-4"
                                                onClick={handleNewProduct}
                                            >
                                                Profile
                                            </p>
                                            <p
                                                className="text-lg font-normal whitespace-nowrap cursor-pointer hover:bg-slate-200 active:bg-gray-300 py-2 px-4"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p
                                                className="text-lg font-normal whitespace-nowrap cursor-pointer hover:bg-slate-200 active:bg-gray-300 py-2 px-4"
                                                onClick={handleNewProduct}
                                            >
                                                Profile
                                            </p>
                                            <p
                                                className="text-lg font-normal whitespace-nowrap cursor-pointer hover:bg-slate-200 active:bg-gray-300 py-2 px-4"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <Link
                                        to={"/login"}
                                        className="text-lg font-normal whitespace-nowrap cursor-pointer hover:bg-slate-200 active:bg-gray-300 py-2 px-4 text-center"
                                    >
                                        Login
                                    </Link>
                                )}
                                <nav className="text-lg flex md:gap-6 text-base md:text-lg text-slate-600 flex flex-col text-center md:hidden">
                                    <Link
                                        to={"/"}
                                        className="px-2 py-2 hover:bg-slate-200 active:bg-gray-300"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to={"/menu"}
                                        className="px-2 py-2 hover:bg-slate-200 active:bg-gray-300"
                                    >
                                        Menu
                                    </Link>
                                    <Link
                                        to={"/about"}
                                        className="px-2 py-2 hover:bg-slate-200 active:bg-gray-300"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to={"/contact"}
                                        className="px-2 py-2 hover:bg-slate-200 active:bg-gray-300"
                                    >
                                        Contact
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
        </header>
    );
};

export default Header;
