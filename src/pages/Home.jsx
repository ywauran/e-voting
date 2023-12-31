import { useState } from "react";
import GetStarted from "../assets/get_started.jpg";
import { useNavigate } from "react-router-dom";
import { data } from "../utils/data.js";
import { getDatabase, ref, get } from "firebase/database";
import Logo from "../assets/ic_logo.png";

import { app } from "../config/Firebase";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const database = getDatabase(app);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (number === "") {
      setMessage("NIP/NPnP harus diisi");
    } else if (number) {
      const user = data.find((item) => item.number === number);

      if (user) {
        const { name, number } = user;
        const votesRef = ref(database, "votes");
        get(votesRef)
          .then((snapshot) => {
            let userAlreadyVoted = false;

            snapshot.forEach((childSnapshot) => {
              const vote = childSnapshot.val();
              if (vote.name === name) {
                userAlreadyVoted = true;
              }
            });

            if (userAlreadyVoted) {
              setIsVoting(true);
              setTimeout(() => {
                setIsVoting(false);
              }, 1500);
            } else {
              // Simpan NPnP dan nama ke dalam localStorage
              localStorage.setItem("number", number);
              localStorage.setItem("name", name);

              // Arahkan ke halaman /vote
              navigate("/vote", { state: { number } });
            }
          })
          .catch((error) => {
            console.error("Error checking existing vote: ", error);
            // Handle error accordingly
          });
      } else {
        // Jika NPnP tidak ditemukan, atur pesan kesalahan
        setMessage("NIP/NPnP tidak valid");
      }
    } else {
      setMessage("Gagal");
    }
  };

  return (
    <>
      <img src={Logo} alt="" className="w-32 h-32 mx-auto" />
      <h1 className="text-3xl font-bold text-center text-gray-800">
        DIKDA Prov Sulut Employee of the year
      </h1>
      <p className="mt-2 font-semibold text-center text-gray-700">
        Dalam aplikasi akan menampilkan 6 Nominasi ASN dan 6 Nominasi THL, Mari
        berpartipasi memilih ASN dan THL yang berkinerja dan berprestasi menurut
        anda!!
      </p>
      <h4 className="mt-4 text-2xl font-bold text-center">DIKDA HEBAT</h4>
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
            {isVoting && (
              <p className="p-1 text-sm font-semibold text-white bg-red-500">
                Anda sudah melakukan voting sebelumnya
              </p>
            )}
            <form>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-left text-gray-700"
                  htmlFor="username"
                >
                  NIP(ASN)/NPnP(THL)
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
                <p className="text-sm font-semibold text-left">
                  Masukkan NIP tanpa spasi
                </p>
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
