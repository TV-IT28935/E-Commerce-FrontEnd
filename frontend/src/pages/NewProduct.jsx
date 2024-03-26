import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";
import axios from "axios";
const NewProduct = () => {
    const [data, setData] = useState({
        name: "",
        category: "Fruits",
        image: "",
        price: "",
        description: "",
    });
    const handleSaveNewProduct = async (e) => {
        try {
            e.preventDefault();
            const { name, category, image, price, description } = data;
            if (name && category && image && price && description) {
                const result = await axios.post(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/product`,
                    data
                );
                if (result.data.EC === 0) {
                    toast(result.data.EM);
                    // navigate("/");
                }
            } else {
                toast("Please enter the complete data field!");
            }
        } catch (error) {
            toast(error.response);
        }
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleUploadProductImage = async (e) => {
        const { name } = e.target;
        const imageUrl = await ImageToBase64(e.target.files[0]);
        setData({ ...data, [name]: imageUrl });
    };
    return (
        <div className="">
            <form className="bg-white m-auto w-full max-w-md p-4 my-4 shadow flex flex-col p-3">
                <label htmlFor="name">Name</label>
                <input
                    type={"text"}
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    className="bg-slate-200 p-1 my-1 rounded"
                />

                <label htmlFor="category">Category</label>

                <select
                    value={data.category}
                    name="category"
                    onChange={handleOnChange}
                    className="bg-slate-200 p-1 my-2 rounded"
                >
                    <option value={"other"}>select category</option>
                    <option value={"fruits"}>Fruits</option>
                    <option value={"vegetable"}>Vegetable</option>
                    <option value={"icream"}>Icream</option>
                    <option value={"dosa"}>Dosa</option>
                    <option value={"piza"}>Piza</option>
                    <option value={"rice"}>Rice</option>
                    <option value={"cake"}>Cake</option>
                    <option value={"burger"}>Burger</option>
                </select>
                <label htmlFor="imageProduct" className="cursor-pointer">
                    Image
                    <div
                        id="image"
                        className="h-40 w-full bg-slate-300 my-2 flex items-center justify-center rounded overflow-hidden"
                    >
                        {data.image ? (
                            <div className="w-full h-full">
                                <img
                                    className="w-full h-full"
                                    src={data.image}
                                />
                                <input
                                    type={"file"}
                                    id="imageProduct"
                                    accept="image/"
                                    name="image"
                                    className="hidden"
                                    onChange={handleUploadProductImage}
                                />
                            </div>
                        ) : (
                            <div>
                                <span className="text-5xl">
                                    <BsCloudUpload />
                                </span>
                                <input
                                    type={"file"}
                                    id="imageProduct"
                                    accept="image/"
                                    name="image"
                                    className="hidden"
                                    onChange={handleUploadProductImage}
                                />
                            </div>
                        )}
                    </div>
                </label>
                <label className="" htmlFor="price">
                    Price
                </label>
                <input
                    type={"text"}
                    name="price"
                    value={data.price}
                    onChange={handleOnChange}
                    className="bg-slate-200 p-1 my-2 rounded"
                />
                <label className="" htmlFor="description">
                    Description
                </label>
                <textarea
                    type={"text"}
                    rows={3}
                    value={data.description}
                    name="description"
                    onChange={handleOnChange}
                    className="bg-slate-200 p-1 my-2 rounded resize-none"
                />
                <button
                    type="submit"
                    onClick={handleSaveNewProduct}
                    className="w-full m-auto bg-blue-500 hover:bg-blue-400 active:bg-blue-600 font-medium text-center py-2 text-white cursor-pointer rounded-md mt-4"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default NewProduct;
