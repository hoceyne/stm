import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

function OrderForm({ action, data, getOrders, hide, form }) {
    const token = window.localStorage.getItem("token");
    const user_id = window.localStorage.getItem("user_id");
    const url = process.env.REACT_APP_API_URL + "/orders/create";
    const [title, setTitle] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [qte, setQte] = React.useState("");
    const [products, setProducts] = React.useState([]);

    const call = () => {
        axios({
            // Endpoint to send files
            url: url,
            method: "post",
            data: {
                products,
                user_id,
            },
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                hide();
                Swal.fire({
                    title: "",
                    text: "Operation success ",
                    icon: "success",
                });
                getOrders();
                hide();
            })

            // Catch errors if any
            .catch((error) => {
                Swal.fire({
                    title: "Server fall down",
                    text: "Can't get data",
                    icon: "error",
                });
            });
    };

    useEffect(() => {
        AOS.init();
        setTitle("");
        setPrice("");
        setQte("");
    }, []);
    return (
        <>
            <div
                className="relative flex flex-col max-w-[600px] max-h-96 break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto transition-all duration-200 ease-out "
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
            >
                <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
                    <div className="text-center flex justify-between">
                        <h6 className="text-slate-700 text-xl font-bold capitalize">
                            {action} Order
                        </h6>
                        <button
                            className=" text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:text-red-600 w-8 h-8 rounded-full shadow hover:shadow-lg outline-none "
                            type="button"
                            onClick={() => {
                                hide();
                            }}
                        >
                            <i className="fa-solid fa-close"></i>
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-10 py-4 overflow-auto">
                    <form>
                        <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Order Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4 flex flex-row justify-evenly">
                                <div className="relative w-3/12 mb-3">
                                    <label
                                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="title"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Title"
                                        onChange={(event) => {
                                            setTitle(event.target.value);
                                        }}
                                        value={title}
                                    />
                                </div>
                                <div className="relative w-3/12 mb-3">
                                    <label
                                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Price"
                                        onChange={(event) => {
                                            setPrice(event.target.value);
                                        }}
                                        value={price}
                                    />
                                </div>
                                <div className="relative w-3/12 mb-3">
                                    <label
                                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Quantity"
                                        onChange={(event) => {
                                            setQte(event.target.value);
                                        }}
                                        value={qte}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-xs px-4 py-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => call()}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OrderForm;
