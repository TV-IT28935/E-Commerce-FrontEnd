import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";
function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getDataProduct = async () => {
            try {
                const result = await axios.get(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/product`
                );
                dispatch(setDataProduct(result.data.DT));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getDataProduct();
    }, []);
    return (
        <>
            <Toaster />
            <div className="">
                <Header />
                <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default App;
