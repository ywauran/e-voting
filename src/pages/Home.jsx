import React, { useState } from "react";
import GetStarted from "../assets/get_started.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h2 className="font-bold text-3xl text-center text-gray-400">
        Mari Mulai Voting
      </h2>
      <div className="flex justify-center">
        <img src={GetStarted} alt="Mulai" className="w-80 h-96" />
      </div>
      <div>
        <button
          onClick={openModal}
          className="bg-red-600 text-white font-bold py-2 px-4 hover:bg-white hover:border-2 hover:border-red-700 hover:text-red-700"
        >
          Mulai Voting
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <h2 className="text-lg mt-4 font-bold mb-4">
              Masuk Menggunakan NIP/NPnP
            </h2>
            <form>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  NIP/NPnP
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Masukkan NIP/NPnP"
                />
              </div>
              <Link
                to="/vote"
                className="bg-red-600 text-white font-bold py-2 px-4 hover:bg-white hover:border-2 hover:border-red-700 hover:text-red-700"
              >
                Masuk
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
