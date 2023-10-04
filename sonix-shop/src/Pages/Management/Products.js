import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ProductForm from "./ProductForm";

function Products() {
    const user_id = window.localStorage.getItem("user_id");
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_API_URL;
    const [form, setForm] = useState(false);
    const [product, setProduct] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [method, setMethod] = useState("add");
    const navigate = useNavigate();

    const getProducts = async () => {
        let options = {
            method: "get",
            url: url + "/products/",
            params: {
                user_id,
            },
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
            });
    };

    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/products/" + id + "/delete",
            method: "delete",

            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                Swal.fire({
                    title: "",
                    text: "Operation success ",
                    icon: "success",
                });
                getProducts();
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

    const show = (action, data) => {
        document.body.style.overflow = "hidden";
        setMethod(action);
        setProduct(data);
        setForm(true);
    };
    const hide = () => {
        document.body.style.overflow = "auto";
        setForm(false);
    };
    useEffect(() => {
        if (token) {
            getProducts();
        }
    }, []);
    return (
        <>
            {form ? (
                <div className="absolute bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center">
                    <ProductForm
                        action={method}
                        data={product}
                        hide={hide}
                        form={form}
                        getProducts={getProducts}
                    ></ProductForm>
                </div>
            ) : (
                ""
            )}
            <div className="col-span-full  bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-800">Products</h2>
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start gap-2">
                        <button
                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                            onClick={() => {
                                show("add");
                            }}
                        >
                            <svg
                                className="w-4 h-4 fill-current opacity-50 shrink-0"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                            </svg>
                            <span className="hidden xs:block ml-2">
                                Add product
                            </span>
                        </button>{" "}
                    </div>
                </header>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                            <tr>
                                <th className="px-2  py-3  whitespace-nowrap">
                                    <div className="font-semibold  text-left">
                                        Title
                                    </div>
                                </th>
                                <th className="px-2  py-3  whitespace-nowrap">
                                    <div className="font-semibold  text-left">
                                        Price
                                    </div>
                                </th>
                                <th className="px-2  py-3  whitespace-nowrap">
                                    <div className="font-semibold  text-left">
                                        Purchase Date
                                    </div>
                                </th>

                                <th className="px-2  py-3  whitespace-nowrap">
                                    <div className="font-semibold  text-left">
                                        Quantity Total
                                    </div>
                                </th>
                                <th className="px-2  py-3  whitespace-nowrap">
                                    <div className="font-semibold  text-left">
                                        Actions
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm ln li">
                            {/* Row */}
                            {products?.map((product, id) => {
                                return (
                                    <tr key={id}>
                                        <td className="px-2  py-3  whitespace-nowrap">
                                            <div className=" font-medium text-sky-500">
                                                {product.title}
                                            </div>
                                        </td>
                                        <td className="px-2  py-3  whitespace-nowrap">
                                            <div className=" font-medium text-rose-500">
                                                {product.price}
                                            </div>
                                        </td>
                                        <td className="px-2  py-3  whitespace-nowrap">
                                            <div className="inline-flex  font-medium  bg-rose-100 text-rose-500 rounded-full overflow-x-auto text-center px-2.5  py-0.5">
                                                {product.purchase_date}
                                            </div>
                                        </td>

                                        <td className="px-2  py-3  whitespace-nowrap">
                                            <div>{product.qte_total}</div>
                                        </td>
                                        <td className="px-2  py-3  whitespace-nowrap ">
                                            <div className="fd">
                                                <button
                                                    className=" text-slate-400 xg rounded-full overflow-x-auto"
                                                    onClick={() => {
                                                        show("edit", product);
                                                    }}
                                                >
                                                    <svg
                                                        className="w-8 h-8 fill-current"
                                                        viewBox="0 0 32 32"
                                                    >
                                                        <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    className="text-rose-500  rounded-full overflow-x-auto"
                                                    onClick={() => {
                                                        destroy(product.id);
                                                    }}
                                                >
                                                    <svg
                                                        className="w-8 h-8 fill-current"
                                                        viewBox="0 0 32 32"
                                                    >
                                                        <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                                        <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Row */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Products;
