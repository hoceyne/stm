import React from "react";
import { useState } from "react";
import purpleBackground from "../../../assets/images/purple_background.jpg";
const ClientCard = ({ client, hideCard }) => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped(!flipped);
  };
  return (
    <div className="relative  flex flex-col justify-center items-center max-w-[600px] max-h-96 break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto transition-all duration-200 ease-out ">
      <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle w-full">
        <div className="text-center flex justify-between">
          <h6 className="text-slate-700 text-xl font-bold capitalize">Card</h6>
          <div>
            <button
              className=" text-white bg-gray-500 mr-1 hover:bg-white hover:border hover:border-solid hover:text-gray-500 w-8 h-8 rounded-full shadow hover:shadow-lg outline-none "
              type="button"
              onClick={() => {
                flipCard();
              }}
            >
              <i className="fa-solid fa-repeat"></i>
            </button>
            <button
              className=" text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:text-red-600 w-8 h-8 rounded-full shadow hover:shadow-lg outline-none "
              type="button"
              onClick={() => {
                hideCard();
              }}
            >
              <i className="fa-solid fa-close"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex justify-center w-96 h-60 text-white shadow-md my-8"
        style={{
          backgroundImage: `url(${purpleBackground})`,
          backgroundSize: "cover",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(0deg)" : "rotateY(360deg)",
        }}
      >
        {!flipped && (
          <div className="flex justify-center w-4/6 h-5/6 rounded-b-lg bg-slate-300">
            <div
              className="flex justify-center border-b-2 border-l-2 border-r-2  border-purple-900 rounded-b-lg w-11/12 py-5"
              style={{ height: "95%" }}
            >
              <img
                className="  mr-2 object-contain"
                src={require("../../../assets/images/store-logo.png")}
              ></img>
            </div>
          </div>
        )}

        {flipped && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex items-center h-11 bg-slate-300 w-4/5  justify-between ">
              <h3 className=" text-purple-900 text-xl font-semibold pl-2">
                Name: {client.name}
              </h3>
              <h2 className=" text-purple-900 text-l font-semibold pr-2">
                250 pts
              </h2>
            </div>
            <div className="w-full h-auto mt-3 flex flex-row justify-evenly ">
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
            </div>
            <div className="w-full h-auto mt-3 flex flex-row justify-evenly ">
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
              <div className="w-1/6 h-14 bg-slate-300 rounded-lg "></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;
