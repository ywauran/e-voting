import { useState } from "react";
import GetStarted from "../assets/get_started.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "../utils/data.js";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (number === "") {
      setMessage("NPnP/NIP harus diisi");
    } else if (number) {
      const user = data.find((item) => item.number === number);

      if (user) {
        const { name, number } = user;

        // Simpan NPnP dan nama ke dalam localStorage
        localStorage.setItem("number", number);
        localStorage.setItem("name", name);

        // Arahkan ke halaman /vote
        navigate("/vote", { state: { number } });
      } else {
        // Jika NPnP tidak ditemukan, atur pesan kesalahan
        setMessage("NPnP tidak valid");
      }
    } else {
      setMessage("Gagal");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Dikda Prov Sulut Employee of the year
      </h1>
      <h2 className="mt-4 text-3xl font-bold text-center text-gray-400">
        Mari Mulai Voting
      </h2>
      <div className="flex justify-center">
        <img src={GetStarted} alt="Mulai" className="w-80 h-96" />
      </div>
      <div>
        <button
          onClick={openModal}
          className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-white hover:border-2 hover:border-red-700 hover:text-red-700"
        >
          Mulai Voting
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="p-8 bg-white rounded shadow-md">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
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
            <h2 className="mt-4 mb-4 text-lg font-bold">
              Masuk Menggunakan NIP/NPnP
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="username"
                >
                  NIP/NPnP
                </label>
                <input
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Masukkan NIP/NPnP"
                />
              </div>
              {message && <p className="mb-2 text-red-500">{message}</p>}
              <button
                onClick={(e) => handleLogin(e)}
                className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-white hover:border-2 hover:border-red-700 hover:text-red-700"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
