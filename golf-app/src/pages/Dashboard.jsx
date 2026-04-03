import { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Scores from './Scores';
import Subscription from './Subscription';

const tabs = ['Overview', 'Scores', 'Subscription'];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isActive = data?.subscription?.status === 'active';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hello, {data?.user?.name || user?.name}
            </h1>

            <p className={`text-sm mt-1 font-medium ${
              isActive ? 'text-green-600' : 'text-gray-500'
            }`}>
              {isActive ? 'Active Subscriber' : 'Free Account'}
            </p>
          </div>

          {/* 💰 Highlight */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105">
            <p className="text-xs opacity-80">Total Earnings</p>
            <p className="text-lg font-semibold">
              ₹{data?.participation?.totalAmount || 0}
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-6 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-sm font-medium transition ${
                activeTab === tab
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-500'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 max-w-7xl mx-auto">

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {activeTab === 'Overview' && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">

              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
                <p className="text-xs text-gray-500">Total Draws</p>
                <h2 className="text-xl font-semibold text-gray-800">
                  {data?.participation?.totalDraws || 0}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
                <p className="text-xs text-gray-500">Wins</p>
                <h2 className="text-xl font-semibold text-green-600">
                  {data?.participation?.totalWins || 0}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
                <p className="text-xs text-gray-500">Scores</p>
                <h2 className="text-xl font-semibold text-indigo-600">
                  {data?.scores?.total || 0}
                </h2>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
                <p className="text-xs opacity-80">Winnings</p>
                <h2 className="text-xl font-semibold">
                  ₹{data?.participation?.totalAmount || 0}
                </h2>
              </div>
            </div>

            {/* PROFILE */}
            <Card className="mb-5 bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-3">Profile</h2>
              <p className="text-sm text-gray-600">Name: {data?.user?.name}</p>
              <p className="text-sm text-gray-600">Email: {data?.user?.email}</p>
            </Card>

            {/* SUBSCRIPTION */}
            <Card className="mb-5 bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-3">Subscription</h2>

              {isActive ? (
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    Status:
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      Active
                    </span>
                  </p>
                  <p>Plan: {data?.subscription?.plan}</p>
                  <p>
                    Charity: {data?.charity?.name} ({data?.charity?.percentage}%)
                  </p>
                  <p>Renewal: {data?.subscription?.renewalDate || '—'}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No active subscription</p>
              )}
            </Card>

            {/* SCORES */}
            <Card className="mb-5 bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-3">Recent Scores</h2>

              {data?.scores?.recent?.length > 0 ? (
                <div className="space-y-2">
                  {data.scores.recent.map((s, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 hover:bg-indigo-50 border border-gray-100 px-4 py-2 rounded-xl text-sm transition"
                    >
                      Score: {s.value}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No scores yet</p>
              )}
            </Card>

            {/* WINNINGS */}
            <Card className="bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-3">Winnings</h2>

              {data?.winnings?.length > 0 ? (
                <div className="space-y-3">
                  {data.winnings.map((w, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 hover:bg-indigo-50 border border-gray-100 rounded-xl p-3 text-sm transition"
                    >
                      <p>Match: {w.match}</p>
                      <p>Prize: ₹{w.prize}</p>
                      <p>Status: {w.status}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No winnings yet</p>
              )}
            </Card>
          </>
        )}

        {activeTab === 'Scores' && <Scores />}
        {activeTab === 'Subscription' && <Subscription />}
      </div>
    </div>
  );
}