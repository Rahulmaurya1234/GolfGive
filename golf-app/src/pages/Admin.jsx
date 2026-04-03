import { useEffect, useState } from "react";
import { adminAPI } from "../services/api";

export default function Admin() {
  const [stats, setStats] = useState({});
  const [winners, setWinners] = useState([]);
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const statsRes = await adminAPI.getStats();
      const winnersRes = await adminAPI.getWinners();

      setStats(statsRes.data);
      setWinners(winnersRes.data.winners || []);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🎯 SIMULATE
  const handleSimulate = async () => {
    try {
      const res = await adminAPI.simulateDraw();
      setSimulation(res.data);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // 🚀 RUN DRAW
  const handleRunDraw = async () => {
    if (!window.confirm("Run final draw?")) return;

    try {
      await adminAPI.runDraw();
      alert("Draw done ✅");
      setSimulation(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // 🏆 VERIFY
  const handleVerify = async (w) => {
    try {
      await adminAPI.verifyWinner({
        drawId: w.drawId,
        userId: w.userId,
        status: "approved",
      });
      fetchData();
    } catch {
      alert("Failed");
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-5 space-y-6">

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Box title="Users" value={stats.totalUsers} />
        <Box title="Draws" value={stats.totalDraws} />
        <Box title="Pool" value={`₹${stats.totalPrizePool}`} />
        <Box title="Charity" value={`₹${stats.totalCharity}`} />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={handleSimulate}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 
          text-white font-medium shadow-md transition-all duration-300 
          hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-blue-800 
          active:scale-95"
        >
          Simulate
        </button>

        <button
          onClick={handleRunDraw}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
          text-white font-medium shadow-md transition-all duration-300 
          hover:scale-105 hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 
          active:scale-95"
        >
          Run Draw
        </button>
      </div>
      {/* 🎲 SIMULATION RESULT */}
      {simulation && (
        <div className="bg-white p-4 shadow rounded space-y-3">
          <h2 className="font-bold">Simulation Result</h2>

          <p>Numbers: {simulation.drawNumbers?.join(", ")}</p>
          <p>Pool: ₹{simulation.totalPool}</p>
          <p>Charity: ₹{simulation.charityTotal}</p>
          <p>Jackpot: ₹{simulation.jackpot}</p>

          <table className="w-full border mt-3">
            <thead>
              <tr>
                <th>User</th>
                <th>Match</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {simulation.results?.map((r, i) => (
                <tr key={i} className="text-center border-t">
                  <td>{r.user}</td>
                  <td>{r.match}</td>
                  <td>₹{r.result?.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🏆 WINNERS */}
      <div>
        <h2 className="font-bold mb-2">Winners</h2>

        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Prize</th>
              <th>Match</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {winners.map((w, i) => (
              <tr key={i} className="text-center border-t">
                <td>{w.user?.name}</td>
                <td>₹{w.prize}</td>
                <td>{w.matchCount}</td>
                <td>{w.status}</td>
                <td>
                  {w.status !== "approved" && (
                    <button
                      onClick={() => handleVerify(w)}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Box({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded text-center">
      <p className="text-gray-500">{title}</p>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
}