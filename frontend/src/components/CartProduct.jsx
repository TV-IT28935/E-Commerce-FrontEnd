import React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
    deleteProductCart,
    minusProduct,
    plusProduct,
} from "../redux/userSlice";
const CartProduct = ({ cartProduct, quantity, total }) => {
    const dispatch = useDispatch();
    const handleMinusProduct = (id) => {
        dispatch(minusProduct({ id }));
    };
    const handlePlusProduct = (id) => {
        dispatch(plusProduct({ id }));
    };
    const handleDeleteProduct = (id) => {
        dispatch(deleteProductCart({ id }));
    };
    return (
        <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
            <div className="bg-white p-3 rounded overflow-hidden">
                <img
                    src={cartProduct.image}
                    className="h-full w-36 object-cover"
                />
            </div>
            <div className="flex-1 gap-2 p-2 justify-around">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-2xl ">
                        {cartProduct?.name}
                    </h3>
                    <div
                        onClick={() => handleDeleteProduct(cartProduct.id)}
                        className="cursor-pointer text-slate-600 hover:text-red-500 active:text-slate-700"
                    >
                        <FaTrash />
                    </div>
                </div>
                <p className="text-slate-500 font-medium text-xl my-1">
                    {cartProduct?.category}
                </p>
                <p className=" font-bold text-base my-2">
                    <span className="text-red-500">$</span>
                    <span>{cartProduct?.price}</span>
                </p>
                <p className="flex gap-1">
                    <span className="text-slate-600 font-medium">
                        Description:
                    </span>
                    <span>{cartProduct?.description}</span>
                </p>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => handleMinusProduct(cartProduct.id)}
                            className="w-full font-bold bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-black rounded px-4 py-2 my-2 max-w-12"
                        >
                            <FaMinus />
                        </button>
                        <span className="font-bold text-xl">
                            {cartProduct.quantity}
                        </span>
                        <button
                            onClick={() => handlePlusProduct(cartProduct.id)}
                            className="w-full font-bold bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-black rounded px-4 py-2 my-2 max-w-12"
                        >
                            <FaPlus />
                        </button>
                    </div>
                    <div className="">
                        <span className="font-bold">Total: </span>
                        <span className="text-red-500 font-bold">$</span>
                        <span>{cartProduct.total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
