import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CardSlice = ({ id, name, image, category, price, description }) => {
    const isAuthenticateuserData = useSelector(
        (state) => state.user.isAuthenticate
    );
    const navigate = useNavigate();

    const handleProductDetail = (id) => {
        navigate(`/product/${id}`);
    };
    const dispatch = useDispatch();
    const handleAddCart = () => {
        if (isAuthenticateuserData) {
            dispatch(
                addToCart({
                    id: id,
                    name: name,
                    image: image,
                    category: category,
                    price: price,
                    description: description,
                })
            );
            toast("Add to cart successfully");
            return;
        }
        toast("You are not login!");
        return;
    };
    return (
        <div className="bg-whit min-w-[220px] max-w-[220px] shadow rounded overfilow-hidden p-2">
            <div
                onClick={() => handleProductDetail(id)}
                className="w-50 min-h-[150px]"
            >
                <img src={image} className="w-full h-[150px] " />
            </div>
            <h3 className="font-semibold text-slate-600 capitalize text-lg">
                {name}
            </h3>
            <p className="t text-slate-500 font-medium">{category}</p>

            <p className=" font-bold">
                <span className="text-red-500">$</span>
                <span>{price}</span>
            </p>
            <button
                onClick={handleAddCart}
                className="w-full font-bold bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-black rounded px-4 py-1 my-2"
            >
                Add Cart
            </button>
        </div>
    );
};

export default CardSlice;
