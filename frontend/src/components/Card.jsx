import React from "react";

const Card = ({ name, image, category, price, description }) => {
    return (
        <div className="bg-white shadow rounded p-3">
            <div className="w-40 h-[150px] overflow-hidden">
                <img
                    src={image}
                    className="w-full h-[150px] hover:scale-150 transition duration-1000"
                />
            </div>
            <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
                {name}
            </h3>
            <p className="text-center text-slate-500 font-medium">{category}</p>

            <p className="text-center font-bold">
                <span className="text-red-500">$</span>
                <span>{price}</span>
            </p>
        </div>
    );
};

export default Card;
