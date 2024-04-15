import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductForm({ action, data, getProducts, hide}) {
  const token = window.localStorage.getItem("token");
  const user_id = window.localStorage.getItem("user_id");
  const url =
    action === "add"
      ? process.env.REACT_APP_API_URL + "/products/create"
      : process.env.REACT_APP_API_URL + "/products/" + data.id + "/update";
  const method = action === "add" ? "post" : "put";
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [purchase_date, setPurchaseDate] = React.useState("");
  const [qte_total, setQteTotal] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [uploaded_images, setUploadedImages] = useState([]);

  const call = () => {
    axios({
      // Endpoint to send files
      url: url,
      method: method,
      data: {
        title,
        price,
        purchase_date,
        qte_total,
        description,
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
        getProducts();
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
  const handleFileUpload = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const updatedImages = [...uploaded_images];

    for (let i = 0; i < files.length; i++) {
      updatedImages.push(files[i]);
    }

    setUploadedImages(updatedImages);
  };

  const handleRemoveImage = (event, index) => {
    event.preventDefault();
    const updatedImages = [...uploaded_images];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  useEffect(() => {
    AOS.init();
    if (action === "add") {
      setTitle("");
      setPrice(0);
      setPurchaseDate(null);
      setQteTotal(0);
      setDescription("");
    } else {
      setTitle(data.title);
      setPrice(data.price);
      setPurchaseDate(data.purchase_date);
      setDescription(data.description);
      setQteTotal(data.qte_total);
    }
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
              {action} Product
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
              Product Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
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
                <div className="relative w-full mb-3">
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

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(event) => {
                      setPurchaseDate(event.target.value);
                    }}
                  ></input>
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Quantity Total
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Total Quantity "
                    onChange={(event) => {
                      setQteTotal(event.target.value);
                    }}
                    value={qte_total}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    description
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Description"
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    value={description}
                  />
                </div>
              </div>
            </div>
            <div className=" px-4 mb-3">
              <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                Upload Photos
              </label>
              <div className="flex flex-row  w-full  overflow-auto pb-4">
                <div>
                  <label className="text-slate-500 text-md">
                    <div className="w-[200px] h-[120px] rounded-xl border-dashed border-2 border-slate-200px text-slate-500 flex justify-center items-center p-4 hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out text-xl hover:text-blue-500 hover:border-solid">
                      <i className="fa-solid fa-add p-2"></i> Add Image{" "}
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploaded_images.map((image, index) => (
                  <div key={index} className="relative min-w-fit mx-2">
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-[200px] h-[120px] object-contain rounded-xl "
                      alt={`uploaded-image-${index}`}
                    />
                    <button
                      className="absolute top-0 right-0 m-2 rounded-full bg-black bg-opacity-50 text-white !w-8 h-8 hover:text-red-600 transition-all duration-200"
                      onClick={(event) => handleRemoveImage(event, index)}
                    >
                      <i className="fa-solid fa-close"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className=" text-white bg-indigo-500 hover:bg-indigo-600 font-bold uppercase text-xs px-4 py-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
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

export default ProductForm;
