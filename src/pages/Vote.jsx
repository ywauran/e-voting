import { useState } from "react";
import { dummyNominees } from "../utils/dataDummy";
import ImageDefault from "../assets/image_default.jpg";
import ImageWaiting from "../assets/waiting.jpg";
import ModalConfirmation from "../components/ModalConfirmation";

const Vote = () => {
  const [name, setName] = useState("Harke");
  const [selectedNomineeAsn, setSelectedNomineeAsn] = useState(null);
  const [selectedNomineeThl, setSelectedNomineeThl] = useState(null);
  const [activeTab, setActiveTab] = useState("asn");
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
  };

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

  const handleVoteSubmit = () => {
    if (selectedNomineeAsn === null || selectedNomineeThl === null) {
      setOpenModalConfirmation(false);
      setError(
        "Silakan pilih satu calon untuk setiap kategori sebelum mengirim suara Anda."
      );
    } else {
      setIsVoting(true);
      setOpenModalConfirmation(false);
      console.log(
        `Calon Terpilih ASN: ${selectedNomineeAsn}, Calon Terpilih THL: ${selectedNomineeThl}`
      );
      //   setSelectedNomineeAsn(null);
      //   setSelectedNomineeThl(null);
      //   setError(null);
    }
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
          <div className="mt-8 flex justify-center flex-col items-center">
            <img src={ImageWaiting} alt="Waiting" className="w-80 h-96" />
            <h4 className="font-bold text-2xl text-gray-500 text-center mt-4">
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

            <h3 className="font-semibold text-xl text-left">
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
                    <div className=" mx-auto bg-white rounded-3xl shadow-xl p-4">
                      <div className="grid rounded-3xl max-w-sm shadow-sm place-items-center  flex-col">
                        <img
                          src={ImageDefault}
                          className="rounded-t-3xl justify-center grid h-80 object-cover"
                          alt="Yohanes Harke Wauran"
                        />
                        <div className="group p-6 grid z-10">
                          <h4 className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2">
                            {nominee.name}
                          </h4>
                          <p className="text-slate-400 text-base pt-2 font-semibold">
                            {nominee.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <p className="bg-red-700 text-white p-4  mt-4">{error}</p>
            )}

            <button
              className="bg-red-700 text-white p-2 px-4 mt-4"
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
