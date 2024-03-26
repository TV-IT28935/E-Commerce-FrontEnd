import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/userSlice";
import Product from "./Product";
import FilterProduct from "./FilterProduct";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState({});
    const productId = useParams().id;
    const dispatch = useDispatch();

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
    const isAuthenticateuserData = useSelector(
        (state) => state.user.isAuthenticate
    );
    const productData = products.productList;
    const [filterCategory, setFilterCategory] = useState([]);

    useEffect(() => {
        setFilterCategory(productData);
    }, [productData.length]);

    const handleOnClickFilterByCategory = (e, categoryName) => {
        const filterByCategory = productData.filter((item) => {
            return item.category.toLowerCase() === categoryName.toLowerCase();
        });
        setFilterCategory(filterByCategory);
    };

    const handleOnClickFullProducts = () => {
        setFilterCategory(productData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/product/${productId}`
                );
                setProductDetail(result.data.DT);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [productId]);

    const handleAddCart = () => {
        if (isAuthenticateuserData) {
            dispatch(
                addToCart({
                    id: productDetail.id,
                    name: productDetail.name,
                    image: productDetail.image,
                    category: productDetail.category,
                    price: productDetail.price,
                    description: productDetail.description,
                })
            );
            toast("Add to cart successfully");
            return;
        }
        toast("You are not login!");
        return;
    };
    return (
        <div className="p-2 md:p-4 max-md:flex max-md:flex-col items-center">
            <div className="h-full w-full max-w-4xl bg-white m-auto md:flex">
                <div className="md:w-1/2 overflow-hidden mx-2 my-2">
                    <img
                        src={productDetail?.image}
                        className="w-full h-full hover:scale-125 transition duration-1000 max-md:h-[500px] md:h-[400px]"
                    />
                </div>
                <div className="md:w-1/2 flex flex-col gap-2 p-2 justify-around">
                    <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl ">
                        {productDetail?.name}
                    </h3>
                    <p className="text-slate-500 font-medium text-2xl">
                        {productDetail?.category}
                    </p>
                    <p className=" font-bold text-2xl">
                        <span className="text-red-500">$</span>
                        <span>{productDetail?.price}</span>
                    </p>
                    <div className="flex gap-1">
                        <p className="text-slate-600 font-medium">
                            Description:{" "}
                        </p>
                        <p>{productDetail?.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddCart}
                            className="w-full font-bold bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-black rounded px-4 py-2 my-2 min-w[100px]"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddCart}
                            className="w-full font-bold bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-black rounded px-4 py-2 my-2 min-w[100px]"
                        >
                            Add Cart
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h2
                    onClick={handleOnClickFullProducts}
                    className="font-bold text-2xl text-salte-700 underline mt-8 mb-2 cursor-pointer"
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

export default ProductDetail;
