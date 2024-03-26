import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import toast from "react-hot-toast";
import { clearCart } from "../redux/userSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.user.cartItems);
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce((acc, cur) => {
        return acc + parseInt(cur.total);
    }, 0);
    const totalQuantity = cartItems.reduce((acc, cur) => {
        return acc + parseInt(cur.quantity);
    }, 0);

    const handlePayment = () => {
        dispatch(clearCart());
        toast("Payment successfully!");
    };
    return (
        <div className="p-2 md:p-4">
            <h2 className="text-lg md:text-2xl font-bold text-slate-600">
                Your Cart Items
            </h2>
            <div className="my-4 gap-4 flex max-md:flex-col">
                {/* Display cart items */}
                <div className="md:w-3/5 w-full">
                    {cartItems.map((item, index) => {
                        return (
                            <CartProduct
                                key={index}
                                cartProduct={item}
                                quantity={item.quantity}
                                total={item.total}
                            />
                        );
                    })}
                </div>
                {/* total cart items */}
                {cartItems.length > 0 && (
                    <div className="md:w-2/5 w-full ml-auto">
                        <h2 className="bg-blue-500 text-white p-2 text-lg">
                            Summary
                        </h2>
                        <div className="flex w-full py-2 text-lg border-b">
                            <p>Total quantity:</p>

                            <p className="ml-auto w-32 font-bold">
                                {totalQuantity}
                            </p>
                        </div>
                        <div className="flex w-full text-lg border-b">
                            <p>Total Price: </p>
                            <p className="ml-auto w-32 font-bold">
                                <span className="text-red-500 font-bold">
                                    $
                                </span>
                                {totalPrice}
                            </p>
                        </div>
                        <button
                            onClick={handlePayment}
                            className="mt-4 bg-red-500 hover:bg-red-400 active:bg-red-600 w-full text-lg text-white font-bold py-3"
                        >
                            Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
