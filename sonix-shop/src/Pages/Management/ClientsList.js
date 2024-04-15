import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClientCard from "./Components/ClientCard";

export default function ClientsList({ hideList, show}) {
  const token = localStorage.getItem("token");

  const url = ""; //import.meta.env.VITE_API_URL;
  const [card, setCard] = useState(false);
  const [client, setClient] = useState({});
  const navigate = useNavigate();
  //const [product, setProduct] = useState({});
  const [clients, setClients] = useState([
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone_num": "+1 (555) 123-4567"
    },
    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone_num": "+1 (555) 987-6543"
    },
    {
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "phone_num": "+1 (555) 789-0123"
    },
    {
      "name": "Alice Brown",
      "email": "alice.brown@example.com",
      "phone_num": "+1 (555) 234-5678"
    },
    {
      "name": "Charlie Wilson",
      "email": "charlie.wilson@example.com",
      "phone_num": "+1 (555) 876-5432"
    }
  ]);

  const getClients = async () => {
    axios({
      method: "get",
      url: url + "/clients",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "Application/json",
      },
    })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };
    const showCard = (data) => {
      setClient(data);
      setCard(true);
    };
      const hideCard = () => {
      setCard(false);
    };
  //   const showForm = (action, data) => {
  //     setMethod(action);
  //     setProduct(data);
  //     setForm(true);
  //   };
  //   const hide = () => {
  //     setForm(false);
  //   };
  // const destroy = (id) => {
  //   // axios({
  //   //   // Endpoint to send files
  //   //   url: url + "/products/" + id,
  //   //   method: "delete",
  //   //   headers: {
  //   //     Accept: "Application/json",
  //   //     Authorization: "Bearer " + token,
  //   //   },
  //   // })
  //   //   // Handle the response from backend here
  //   //   .then((response) => {
  //   //     getProducts();
  //   //   })

  //   //   // Catch errors if any
  //   //   .catch((error) => {
  //   //     if (error.response.status === 401) {
  //   //       navigate("/login");
  //   //     }
  //   //   });
  //   setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  // };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      {card ? (
        <div className="absolute bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center">
          <ClientCard
            hideCard={hideCard}
            client={client}
          ></ClientCard>
        </div>
      ) : (
        ""
      )}
      <div className=" flex flex-col max-w-[1000px] h-fit break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto">
        <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold capitalize">
              Clients
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
                      Phone number
                    </th>
                    <th
                      className={
                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                      }
                    >
                      Email
                    </th>
                    {/* <th
                      className={
                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                      }
                    >
                      Purchase date
                    </th> */}

                    <th
                      className={
                        "   text-xs uppercase  font-semibold flex justify-around   transition-all duration-150 bg-indigo-500 hover:bg-indigo-600 text-white "
                      }
                    >
                      <Link
                        className="w-full ease-linear px-6 py-3 "
                        role={"button"}
                        onClick={() => {
                          // show("add");
                        }}
                      >
                        Actions
                        {/* <i class="fa-solid fa-plus ml-4"></i> */}
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, id) => {
                    return (
                      <tr key={id} className="bg-white hover:bg-slate-100">
                        <th
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          <span className={"font-bold "}>{client.name}</span>
                        </th>
                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          {client.phone_num}
                        </td>
                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          {client.email}
                        </td>
                        {/* <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                          }
                        >
                          {product.purchase_date}
                        </td> */}

                        <td
                          className={
                            "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left items-center flex justify-evenly gap-2"
                          }
                        >
                          <Link
                            role={"button"}
                            onClick={() => {
                              showCard(client);
                            }}
                            className="hover:text-yellow-400 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                          >
                            <i class="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <Link
                            role={"button"}
                            onClick={() => {
                              showCard(client);
                            }}
                            className="hover:text-yellow-500 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                          >
                            <i class="fa-solid fa-award"></i>
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
