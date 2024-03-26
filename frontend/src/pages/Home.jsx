import React, { useEffect, useReducer, useRef, useState } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import CardSlice from "../components/CardSlice";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../components/FilterProduct";
import { BsCheckLg } from "react-icons/bs";
import Product from "../components/Product";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { setDataProduct } from "../redux/productSlice";
import axios from "axios";
const Home = () => {
    const categoryList = [
        "Fruits",
        "Vegetable",
        "Icream",
        "Dosa",
        "Piza",
        "Rice",
        "Cake",
        "Burger",
    ];

    const products = useSelector((state) => {
        return state.product;
    });
    const productData = products.productList;
    const homeProductCartList = productData.slice(0, 5);
    const homeProductCartListVegetables = productData.filter(
        (item) => item.category === "vegetable"
    );
    const [filterCategory, setFilterCategory] = useState([]);

    const slideProductRef = useRef();

    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200;
    };

    const previousProduct = () => {
        slideProductRef.current.scrollLeft -= 200;
    };

    useEffect(() => {
        setFilterCategory(productData);
    }, [productData.length]);

    const handleOnClickFilterByCategory = (e, categoryName) => {
        console.log([e.target]);

        const filterByCategory = productData.filter((item) => {
            return item.category.toLowerCase() === categoryName.toLowerCase();
        });
        setFilterCategory(filterByCategory);
    };

    const handleOnClickFullProducts = () => {
        setFilterCategory(productData);
    };
    return (
        <div className="p-2 md:p-4">
            <div className="flex gap-4 py-3 max-md:flex-col">
                <div className="md:w-2/5">
                    <div className="flex justify-center gap-3 bg-slate-300 w-36 px-2 py-1 items-center rounded-full">
                        <p className="text-sm font-medium text-slate-900 flex items-center justify-center gap-2">
                            <span>Bike Delivery</span>
                            <span className="text-2xl">
                                <MdOutlineDirectionsBike />
                            </span>
                        </p>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold py-3">
                        The Fasted Delivery in{" "}
                        <span className="text-blue-500">Your Home</span>
                    </h2>
                    <p className="py-3 text-base max-w-lg">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book
                    </p>
                    <button className="font-bold bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white rounded px-4 py-2">
                        Order Now
                    </button>
                </div>
                <div className="md:w-3/5 flex flex-wrap gap-4 p-4 justify-center">
                    {homeProductCartList.map((item) => {
                        return (
                            <Card
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                            />
                        );
                    })}
                    <Card />
                </div>
            </div>
            <div className="">
                <div className="flex w-full items-center">
                    <h2 className="font-bold text-2xl text-salte-700 underline mt-4 mb-4">
                        Fresh Vegetables
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <button
                            onClick={previousProduct}
                            className="bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-lg p-1 rounded"
                        >
                            <GrPrevious />
                        </button>
                        <button
                            onClick={nextProduct}
                            className="bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-lg p-1 rounded"
                        >
                            <GrNext />
                        </button>
                    </div>
                </div>

                <div
                    className="flex gap-5 no-scrollbar overflow-x-auto"
                    ref={slideProductRef}
                >
                    {homeProductCartListVegetables.map((item) => {
                        return (
                            <CardSlice
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                            />
                        );
                    })}
                </div>
            </div>

            <div>
                <h2
                    onClick={handleOnClickFullProducts}
                    className="font-bold text-2xl text-salte-700 underline mt-4 mb-4 cursor-pointer"
                >
                    Your Product
                </h2>
                <div className="flex gap-12 justify-center items-center flex-wrap">
                    {categoryList.map((categoryName) => {
                        return (
                            <FilterProduct
                                key={categoryName}
                                handleOnClickFilterByCategory={(e) =>
                                    handleOnClickFilterByCategory(
                                        e,
                                        categoryName
                                    )
                                }
                                name={categoryName}
                                isActive={""}
                                category={categoryName}
                            />
                        );
                    })}
                </div>

                <div className="flex flex-wrap gap-9 justify-center mt-4 p-2">
                    {filterCategory.map((item) => {
                        return (
                            <Product
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
