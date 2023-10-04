import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loaders/Loading";

function Register() {
    const url = process.env.REACT_APP_API_URL;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const token = window.localStorage.getItem("token");

    let navigate = useNavigate();

    const register = () => {
        setLoading(true);
        let data = {
            email,
            password,
        };
        axios({
            // Endpoint to send files
            url: url + "/register",
            method: "POST",

            headers: {
                Accept: "Application/json",
            },

            // Attaching the form data
            data: data,
        })
            // Handle the response from backend here
            .then((response) => {
                setLoading(false);
                Swal.fire({
                    title: "Go to dashboard",
                    text: "You are successfuly logged in .",
                    icon: "success",

                    iconColor: "#3dc00c",
                }).then(async () => {
                    const imgUrl = `data:image/${response.data.profile_picture.extension};base64,${response.data.profile_picture.content}`;

                    window.localStorage.setItem("profile_picture_url", imgUrl);
                    window.localStorage.setItem("token", response.data.token);
                    window.localStorage.setItem("user_id", response.data.id);
                    navigate("/dashboard");
                });
            })

            // Catch errors if any
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    title: "Bad credentials!",
                    text: "Verify your email or password.",
                    icon: "error",
                });
            });
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, []);
    return (
        <div className="w-full h-screen bg-slate-900">
            <div className=" flex justify-center items-center flex-col h-screen">
                <div className="container mx-auto px-4">
                    <div className="flex content-center  justify-center">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50 border-0 py-8 px-4">
                                <form>
                                    <h6 className="text-slate-700 text-sm mt-3 mb-6 font-bold uppercase text-center">
                                        Sign In
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                    onChange={(event) => {
                                                        setEmail(
                                                            event.target.value
                                                        );
                                                    }}
                                                    value={email}
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                    onChange={(event) => {
                                                        setPassword(
                                                            event.target.value
                                                        );
                                                    }}
                                                    value={password}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center px-4">
                                        <button
                                            className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-sm px-4 py-2  rounded shadow hover:shadow-md outline-none focus:outline-none justify-center ease-linear transition-all duration-150 flex items-center w-full"
                                            type="button"
                                            onClick={() => register()}
                                        >
                                            {loading ? (
                                                <Loading
                                                    width="20px"
                                                    height={"20px"}
                                                    color="white"
                                                    weight={"2px"}
                                                ></Loading>
                                            ) : (
                                                ""
                                            )}
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-wrap mt-6 relative">
                                <div className="w-1/2">
                                    <Link
                                        to={"/forgot.password"}
                                        className="text-slate-200"
                                    >
                                        <small>Forgot password?</small>
                                    </Link>
                                </div>
                                <div className="w-1/2 text-right">
                                    <Link
                                        to="/register"
                                        className="text-slate-200"
                                    >
                                        <small>Create new account.</small>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
