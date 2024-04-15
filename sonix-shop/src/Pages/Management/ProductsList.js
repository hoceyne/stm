import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./Forms/ProductForm";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsList({ hideList, show}) {
  const token = localStorage.getItem("token");

  const url = ""; //import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  //const [product, setProduct] = useState({});
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Laptop",
      price: 1200.0,
      qte_total: 50,
      purchase_date: "2023-01-15",
    },
    {
      id: 2,
      title: "Smartphone",
      price: 699.99,
      qte_total: 100,
      purchase_date: "2023-02-08",
    },
    {
      id: 3,
      title: "Headphones",
      price: 99.95,
      qte_total: 200,
      purchase_date: "2023-03-20",
    },
    {
      id: 4,
      title: "Camera",
      price: 799.5,
      qte_total: 30,
      purchase_date: "2023-04-05",
    },
    {
      id: 5,
      title: "Smartwatch",
      price: 149.99,
      qte_total: 80,
      purchase_date: "2023-05-12",
    },
  ]);

  const getProducts = async () => {
    axios({
      method: "get",
      url: url + "/products",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "Application/json",
      },
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  //   const showForm = (action, data) => {
  //     setMethod(action);
  //     setProduct(data);
  //     setForm(true);
  //   };
  //   const hide = () => {
  //     setForm(false);
  //   };
  const destroy = (id) => {
    // axios({
    //   // Endpoint to send files
    //   url: url + "/products/" + id,
    //   method: "delete",
    //   headers: {
    //     Accept: "Application/json",
    //     Authorization: "Bearer " + token,
    //   },
    // })
    //   // Handle the response from backend here
    //   .then((response) => {
    //     getProducts();
    //   })

    //   // Catch errors if any
    //   .catch((error) => {
    //     if (error.response.status === 401) {
    //       navigate("/login");
    //     }
    //   });
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  useEffect(() => {
    //getProducts();
  }, []);

  return (
    <>
       
      <div className=" flex flex-col max-w-[1000px] h-fit break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto">
        <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold capitalize">
              Products
            </h6>
            <button
              className=" text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:text-red-600 w-8 h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                hideList();
              }}
            >
              <i className="fa-solid fa-close"></i>
            </button>
          </div>
        </div>
        <div className="flex-auto px-10 py-4 overflow-auto">
          <div className="break-words w-full shadow-lg overflow-auto p-0 m-0 border-0">
            <div className="w-full">
              <table className=" w-full border-collapse ">
                <thead className="sticky top-0 whitespace-nowrap">
                  <tr>
                    <th
                      className={
                        "   px-6 align-middle py-3 text-xs uppercase   font-semibold text-left bg-slate-50 text-slate-500 "
                      }
                    >
                      Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                      }
                    >
                      Price
                    </th>
                    <th
                      className={
                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                      }
                    >
                      Total quantity
                    </th>
                    <th
                      className={
                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                      }
                    >
                      Purchase date
                    </th>

                    <th
                      className={
                        "   text-xs uppercase  font-semibold flex justify-around   transition-all duration-150 bg-indigo-500 hover:bg-indigo-600 text-white "
                      }
                    >
                      <Link
                        className="w-full ease-linear px-6 py-3 "
                        role={"button"}
                        onClick={() => {
                          show("add");
                        }}
                      >
                        Add
                        <i class="fa-solid fa-plus ml-4"></i>
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, id) => {
                    return (
                      <tr key={id} className="bg-white hover:bg-slate-100">
                        <th
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          <span className={"font-bold "}>{product.title}</span>
                        </th>
                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          {product.price}
                        </td>
                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          {product.qte_total}
                        </td>
                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          {product.purchase_date}
                        </td>

                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left items-center flex justify-evenly gap-2"
                          }
                        >
                          <Link
                            role={"button"}
                            onClick={() => {
                              show("edit", product);
                            }}
                            className="hover:text-yellow-400 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                          >
                            <i class="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <Link
                            role={"button"}
                            onClick={() => destroy(product.id)}
                            className="hover:text-red-600 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
