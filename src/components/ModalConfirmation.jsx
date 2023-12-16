const ModalConfirmation = ({
  onClose,
  onSubmit,
  selectedNomineeAsnName,
  selectedNomineeThlName,
}) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="p-8 bg-white rounded shadow-md">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onClose(false)}
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

        <h4 className="mt-4 mb-1 text-lg font-bold">
          Sudah yakin dengan pilihan anda? Silahkan cek kembali
        </h4>
        <p className="text-xs text-red-600">
          Anda hanya bisa melakukan vote 1x
        </p>

        <div className="mt-4">
          <h5>
            ASN yang dipilih :{" "}
            <span className="font-bold">{selectedNomineeAsnName}</span>
          </h5>
          <h5>
            THL yang dipilih :{" "}
            <span className="font-bold">{selectedNomineeThlName}</span>
          </h5>
        </div>
        <div className="flex justify-center mt-4 space-x-2 ">
          <button
            onClick={() => onSubmit()}
            className="px-4 py-2 font-bold text-white bg-red-600"
          >
            Ya
          </button>
          <button
            className="px-4 py-2 font-bold text-red-700 bg-white border-2 border-red-700"
            onClick={() => onClose(false)}
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
