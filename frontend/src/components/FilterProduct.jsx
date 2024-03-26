import React from "react";
import { PiForkKnife } from "react-icons/pi";

const FilterProduct = ({
    handleOnClickFilterByCategory,
    category,
    isActive,
    name,
}) => {
    return (
        <div
            onClick={handleOnClickFilterByCategory}
            className="flex flex-col justify-center items-center cursor-pointer"
        >
            <div
                className={`text-3xl p-5 hover:bg-yellow-400 active:bg-yellow-600 bg-yellow-500 rounded-full  ${
                    isActive ? "bg-yellow-700" : "bg-yellow-500"
                }`}
            >
                <PiForkKnife />
            </div>
            <h4 className="text-slate-800 font-medium">{category}</h4>
        </div>
    );
};

export default FilterProduct;
