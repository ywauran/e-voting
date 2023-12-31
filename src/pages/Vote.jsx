import { useState, useEffect } from "react";
import { dummyNomineesASN } from "../utils/dataDummy";
import ImageDefault from "../assets/image_default.jpg";
import Thalia from "../assets/thalia.jpg";
import Try from "../assets/try.jpg";
import Asri from "../assets/asri.jpg";
import Atfri from "../assets/atfri.jpg";
import Calvyn from "../assets/calvin.jpeg";
import Sendi from "../assets/sendi.jpg";
import Sabeth from "../assets/sabeth.jpg";
import Feny from "../assets/feny.jpg";
import Adolf from "../assets/adolf.jpg";
import Cicilia from "../assets/cicilia.jpg";
import Thelma from "../assets/thelma.jpg";
import Febe from "../assets/febe.jpg";
import ImageWaiting from "../assets/waiting.jpg";
import ModalConfirmation from "../components/ModalConfirmation";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  child,
} from "firebase/database";

import { app } from "../config/Firebase";
import Footer from "../components/Footer";

const dummyNomineesTHL = [
  {
    id: "1",
    name: "Asriyani Tambone",
    position: "Sekretariat",
    photo: "../assets/thalia.jpg",
  },
  {
    id: "2",
    name: "Atfri Makarawung",
    position: "Sekretariat",
    photo: "../assets/thalia.jpg",
  },
  {
    id: "3",
    name: "Calvyn G. Piri",
    position: "SMA",
    photo: "../assets/thalia.jpg",
  },
  {
    id: "4",
    name: "Sendi K. Waworuntu",
    position: "SMA",
    photo: "../assets/thalia.jpg",
  },
  {
    id: "5",
    name: "Octaviani T. M Panekenan, S.Tr.Kom",
    position: "Balai Teknologi, Informasi dan Komunikasi Pendidikan",
    photo: "../assets/thalia.jpg",
  },
  {
    id: "6",
    name: "Try Sutrisno Syam",
    position: "Balai Teknologi, Informasi dan Komunikasi Pendidikan",
    photo: "../assets/thalia.jpg",
  },
];

const imageMap = {
  1: Asri,
  2: Atfri,
  3: Calvyn,
  4: Sendi,
  5: Thalia,
  6: Try,
};

const imageMapASN = {
  1: Cicilia,
  2: Feny,
  3: Sabeth,
  4: Thelma,
  5: Adolf,
  6: Febe,
};

const Vote = () => {
  const [name, setName] = useState("");
  const [selectedNomineeAsn, setSelectedNomineeAsn] = useState(null);
  const [selectedNomineeThl, setSelectedNomineeThl] = useState(null);
  const [serialNumber, setSerialNumber] = useState(0);
  const [activeTab, setActiveTab] = useState("asn");
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const database = getDatabase(app);

  const [selectedNomineeAsnName, setSelectedNomineeAsnName] = useState("");
  const [selectedNomineeThlName, setSelectedNomineeThlName] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
  };

  // Effect to get and set values from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedNPnP = localStorage.getItem("number");

    // Check if values exist in localStorage before setting state
    if (storedName) {
      setName(storedName);
    }

    // Assuming NPnP is a number, check if it's not null or undefined
    if (storedNPnP !== null && storedNPnP !== undefined) {
      // Convert the stored NPnP to a number if needed
      // and use it to set state or perform any other necessary actions
    }
  }, []);

  const handleNomineeSelect = (nomineeId) => {
    if (activeTab === "asn") {
      setSelectedNomineeAsn(
        selectedNomineeAsn === nomineeId ? null : nomineeId
      );
      setSelectedNomineeAsnName(
        dummyNomineesASN.find((nominee) => nominee.id === nomineeId)?.name || ""
      );
    } else {
      setSelectedNomineeThl(
        selectedNomineeThl === nomineeId ? null : nomineeId
      );
      setSelectedNomineeThlName(
        dummyNomineesTHL.find((nominee) => nominee.id === nomineeId)?.name || ""
      );
    }
    setError(null);
  };

  useEffect(() => {
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
        }
      })
      .catch((error) => {
        console.error("Error checking existing vote: ", error);
        // Handle error accordingly
      });
  }, []);

  const handleVoteSubmit = () => {
    const votesRef = ref(database, "votes");

    // Get the current maximum serial number
    get(votesRef)
      .then((snapshot) => {
        let userAlreadyVoted = false;
        let maxSerialNumber = 0;

        snapshot.forEach((childSnapshot) => {
          const vote = childSnapshot.val();
          if (vote.name === name) {
            userAlreadyVoted = true;
          }

          if (vote.serialNumber > maxSerialNumber) {
            maxSerialNumber = vote.serialNumber;
          }
        });

        if (userAlreadyVoted) {
          setError(`Maaf, ${name} sudah melakukan vote sebelumnya.`);
          setOpenModalConfirmation(false);
        } else {
          const newSerialNumber = maxSerialNumber + 1;
          setSerialNumber(newSerialNumber);
          const newVote = {
            name,
            selectedNomineeAsn,
            selectedNomineeAsnName,
            selectedNomineeThl,
            selectedNomineeThlName,
            serialNumber: newSerialNumber,
            timestamp: Date.now(),
          };

          // Add the new vote with the incremented serial number
          set(child(votesRef, String(newSerialNumber)), newVote)
            .then(() => {
              setIsVoting(true);
              setOpenModalConfirmation(false);
              console.log(
                `Calon Terpilih ASN: ${selectedNomineeAsn}, Calon Terpilih THL: ${selectedNomineeThl}`
              );
            })
            .catch((error) => {
              console.error("Error adding vote: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking existing vote: ", error);
      });
  };

  const onClose = () => {
    if (selectedNomineeAsn === null && selectedNomineeThl === null) {
      setError(
        "Silakan pilih satu nominasi untuk setiap kategori sebelum mengirim suara Anda."
      );
    } else if (selectedNomineeAsn === null) {
      setError(
        "Anda belum memilih pilih satu nominasi pada kategori ASN sebelum mengirim suara Anda."
      );
    } else if (selectedNomineeThl === null) {
      setError(
        "Anda belum memilih pilih satu nominasi pada kategori THL sebelum mengirim suara Anda."
      );
    } else {
      setOpenModalConfirmation(true);
    }
  };

  return (
    <>
      {openModalConfirmation && (
        <ModalConfirmation
          onSubmit={handleVoteSubmit}
          onClose={setOpenModalConfirmation}
          selectedNomineeAsnName={selectedNomineeAsnName}
          selectedNomineeThlName={selectedNomineeThlName}
        />
      )}

      <h2 className="text-2xl text-left">
        Halo, <span className="font-bold">{name}</span>
      </h2>
      {!isVoting ? (
        <>
          <p className="font-semibold text-left text-gray-700">
            Di bawah ini merupakan daftar nominasi employee of the year.
          </p>
          <p className="text-left text-gray-700">
            Silahkan pilih salah satu nama.
          </p>
        </>
      ) : null}

      {isVoting ? (
        <>
          <div className="flex flex-col items-center justify-center mt-8">
            <img src={ImageWaiting} alt="Waiting" className="w-80 h-96" />
            <h3 className="mt-4 text-xl font-bold">Terima kasih!</h3>
            <p className="mt-2 text-lg text-gray-600">
              Terima kasih atas partisipasi Anda dalam memberikan suara.
            </p>
            <h5 className="text-gray-800">
              Anda mendapatkan nomor urut{" "}
              <span className="font-bold">{serialNumber}</span>. Jangan lupa
              simpan screenshoot nomor ini
            </h5>
          </div>
        </>
      ) : (
        <>
          <div className="mt-8">
            <div className="flex mb-4">
              <button
                className={`mr-4 ${
                  activeTab === "asn"
                    ? "text-white p-2 bg-red-700 border-b-2"
                    : "text-red-700 p-2 bg-white border-red-700 border-2"
                }`}
                onClick={() => handleTabChange("asn")}
              >
                Kategori ASN
              </button>
              <button
                className={`${
                  activeTab === "thl"
                    ? "text-white p-2 bg-red-700 border-b-2"
                    : "text-red-700 p-2 bg-white border-red-700 border-2"
                }`}
                onClick={() => handleTabChange("thl")}
              >
                Kategori THL
              </button>
            </div>

            <h3 className="text-xl font-semibold text-left">
              {activeTab === "asn"
                ? "Kategori ASN Employee of the year 2023"
                : "Kategori THL Employee of the year 2023"}
            </h3>
            {activeTab === "asn" ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {dummyNomineesASN.map((nominee) => (
                    <div
                      key={nominee.id}
                      className={`p-4 border cursor-pointer ${
                        activeTab === "asn"
                          ? selectedNomineeAsn === nominee.id
                            ? "bg-red-100"
                            : ""
                          : selectedNomineeThl === nominee.id
                          ? "bg-red-100"
                          : ""
                      }`}
                      onClick={() => handleNomineeSelect(nominee.id)}
                    >
                      <div className="flex items-center justify-center ">
                        <div className="p-4 mx-auto bg-white shadow-xl rounded-3xl">
                          <div className="grid flex-col max-w-sm shadow-sm rounded-3xl place-items-center">
                            <img
                              src={imageMapASN[nominee.id] || ImageDefault} // Jika tidak ada pemetaan, tampilkan gambar default (Image6)
                              className="grid justify-center object-cover rounded-t-3xl h-80"
                              alt="Yohanes Harke Wauran"
                            />
                            <div className="grid p-6 group">
                              <h4 className="font-bold group-hover:text-cyan-700 sm:text-2xl line-clamp-2">
                                {nominee.name}
                              </h4>
                              <p className="pt-2 text-base font-semibold text-slate-400">
                                {nominee.position}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {dummyNomineesTHL.map((nominee) => (
                  <div
                    key={nominee.id}
                    className={`p-4 border cursor-pointer ${
                      activeTab === "asn"
                        ? selectedNomineeAsn === nominee.id
                          ? "bg-red-100"
                          : ""
                        : selectedNomineeThl === nominee.id
                        ? "bg-red-100"
                        : ""
                    }`}
                    onClick={() => handleNomineeSelect(nominee.id)}
                  >
                    <div className="flex items-center justify-center ">
                      <div className="p-4 mx-auto bg-white shadow-xl rounded-3xl">
                        <div className="grid flex-col max-w-sm shadow-sm rounded-3xl place-items-center">
                          <img
                            src={imageMap[nominee.id] || ImageDefault} // Jika tidak ada pemetaan, tampilkan gambar default (Image6)
                            className="grid justify-center object-cover rounded-t-3xl h-80"
                            alt="Yohanes Harke Wauran"
                          />
                          <div className="grid p-6 group">
                            <h4 className="font-bold group-hover:text-cyan-700 sm:text-2xl line-clamp-2">
                              {nominee.name}
                            </h4>
                            <p className="pt-2 text-base font-semibold text-slate-400">
                              {nominee.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="p-4 mt-4 text-white bg-red-700">{error}</p>}

            <button
              className="p-2 px-4 mt-4 text-white bg-red-700"
              onClick={() => onClose()}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Vote;
