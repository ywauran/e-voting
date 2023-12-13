const ModalConfirmation = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onClose(false)}
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
        <h4 className="text-lg mt-4 font-bold mb-1">
          Anda yakin ingin melakukan vote?
        </h4>
        <p className="text-xs text-red-600">
          Anda hanya bisa melakukan vote 1x
        </p>
        <div
          className="
        mt-4 flex justify-center space-x-2"
        >
          <button
            onClick={() => onSubmit()}
            className="bg-red-600 text-white font-bold py-2 px-4"
          >
            Ya
          </button>
          <button
            className="bg-white text-red-700 font-bold py-2 px-4  border-2 border-red-700"
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
