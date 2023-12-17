import { getDatabase, ref, get } from "firebase/database";
import { app } from "../config/Firebase";
const database = getDatabase(app);
import { useEffect, useState } from "react";
import VerticalChart from "../components/VerticalChart";
import { dummyNomineesASN, dummyNomineesTHL } from "../utils/dataDummy";
import Table from "../components/Table";
const Dashboard = () => {
  const [votes, setVotes] = useState([]);
  const [asnCounts, setAsnCounts] = useState(Array(6).fill(0));
  const [thlCounts, setThlCounts] = useState(Array(6).fill(0));

  const votesRef = ref(database, "votes");

  useEffect(() => {
    get(votesRef)
      .then((snapshot) => {
        const votesArray = [];
        const asnCountArray = Array(6).fill(0);
        const thlCountArray = Array(6).fill(0);

        snapshot.forEach((childSnapshot) => {
          const vote = childSnapshot.val();
          votesArray.push(vote);

          const asnIndex = parseInt(vote.selectedNomineeAsn, 10) - 1;
          const thlIndex = parseInt(vote.selectedNomineeThl, 10) - 1;

          if (asnIndex >= 0 && asnIndex < 6) {
            asnCountArray[asnIndex]++;
          }

          if (thlIndex >= 0 && thlIndex < 6) {
            thlCountArray[thlIndex]++;
          }
        });

        setAsnCounts(asnCountArray);
        setThlCounts(thlCountArray);
        setVotes(votesArray);
      })
      .catch((error) => {
        console.error("Error checking existing vote: ", error);
        // Handle error accordingly
      });
  }, []);
  return (
    <>
      <div className="grid">
        <div className="overflow-x-auto">
          <VerticalChart
            labels={dummyNomineesASN.map((item) => item.name.split(" ")[0])}
            datasets={asnCounts}
            title="Nominasi ASN"
            label="Data ASN"
          />
        </div>
        <div className="overflow-x-auto">
          <VerticalChart
            labels={dummyNomineesTHL.map((item) => item.name.split(" ")[0])}
            datasets={thlCounts}
            title="Nominasi THL"
            label="Data THL"
          />
        </div>

        <Table />
      </div>
    </>
  );
};

export default Dashboard;
