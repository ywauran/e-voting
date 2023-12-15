import { useState, useEffect } from "react";
import { dummyNominees } from "../utils/dataDummy";
import ImageDefault from "../assets/image_default.jpg";
import ImageWaiting from "../assets/waiting.jpg";
import ModalConfirmation from "../components/ModalConfirmation";
import { getDatabase, ref, push, get } from "firebase/database";

import { app } from "../config/Firebase";

const Vote = () => {
  const [name, setName] = useState("");
  const [selectedNomineeAsn, setSelectedNomineeAsn] = useState(null);
  const [selectedNomineeThl, setSelectedNomineeThl] = useState(null);
  const [activeTab, setActiveTab] = useState("asn");
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const database = getDatabase(app);

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
    } else {
      setSelectedNomineeThl(
        selectedNomineeThl === nomineeId ? null : nomineeId
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
          setError(`Maaf, ${name} sudah melakukan vote sebelumnya.`);
        } else {
          const newVote = {
            name,
            selectedNomineeAsn,
            selectedNomineeThl,
            timestamp: Date.now(),
          };
          push(votesRef, newVote)
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
    if (selectedNomineeAsn === null || selectedNomineeThl === null) {
      setError(
        "Silakan pilih satu calon untuk setiap kategori sebelum mengirim suara Anda."
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
        />
      )}

      <h2 className="text-2xl text-left">
        Halo, <span className="font-bold">{name}</span>
      </h2>

      {isVoting ? (
        <>
          <div className="flex flex-col items-center justify-center mt-8">
            <img src={ImageWaiting} alt="Waiting" className="w-80 h-96" />
            <h4 className="mt-4 text-2xl font-bold text-center text-gray-500">
              Anda sudah melakukan vote
            </h4>
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
                Nominatif ASN
              </button>
              <button
                className={`${
                  activeTab === "thl"
                    ? "text-white p-2 bg-red-700 border-b-2"
                    : "text-red-700 p-2 bg-white border-red-700 border-2"
                }`}
                onClick={() => handleTabChange("thl")}
              >
                Nominatif THL
              </button>
            </div>

            <h3 className="text-xl font-semibold text-left">
              {activeTab === "asn"
                ? "Nominatif ASN Employee of the year 2023"
                : "Nominatif THL Employee of the year 2023"}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {dummyNominees.map((nominee) => (
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
                          src={ImageDefault}
                          className="grid justify-center object-cover rounded-t-3xl h-80"
                          alt="Yohanes Harke Wauran"
                        />
                        <div className="z-10 grid p-6 group">
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
