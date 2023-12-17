import { getDatabase, ref, get } from "firebase/database";
import { app } from "../config/Firebase";
import { useEffect, useState } from "react";

const Table = () => {
  const database = getDatabase(app);
  const [votes, setVotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page as needed
  const votesRef = ref(database, "votes");

  useEffect(() => {
    get(votesRef)
      .then((snapshot) => {
        const votesArray = [];

        snapshot.forEach((childSnapshot) => {
          const vote = childSnapshot.val();
          votesArray.push(vote);
        });

        setVotes(votesArray);
      })
      .catch((error) => {
        console.error("Error checking existing vote: ", error);
        // Handle error accordingly
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = votes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const maxPagesToShow = 5;
  const totalPageCount = Math.ceil(votes.length / itemsPerPage);

  const getPageNumbers = () => {
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    const startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    const endPage = Math.min(totalPageCount, startPage + maxPagesToShow - 1);

    return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
  };

  return (
    <div className="overflow-x-auto">
      <div className="container mx-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nama</th>
              <th className="px-4 py-2 border-b">ASN yang dipilih</th>
              <th className="px-4 py-2 border-b">THL yang dipilih</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((vote, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-4 py-2 border-b">{vote.name}</td>
                <td className="px-4 py-2 border-b">
                  {vote.selectedNomineeAsnName}
                </td>
                <td className="px-4 py-2 border-b">
                  {vote.selectedNomineeThlName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <div>
            Jumlah : <span className="font-bold">{votes.length}</span>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              className="px-3 py-1 mx-1 bg-white border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Conditionally render buttons only for larger screens */}
            <div className="hidden sm:flex">
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`mx-1 px-3 py-1 border ${
                    currentPage === number
                      ? "bg-red-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                paginate(Math.min(totalPageCount, currentPage + 1))
              }
              className="px-3 py-1 mx-1 bg-white border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
