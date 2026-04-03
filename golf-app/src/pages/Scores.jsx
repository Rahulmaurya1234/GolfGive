import { useState, useEffect } from 'react';
import { getScores, postScore } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchScores = async () => {
    try {
      const res = await getScores();
      const raw = res.data;

      // ✅ robust parsing
      const parsed = Array.isArray(raw)
        ? raw
        : raw?.data
        ? raw.data
        : raw?.scores
        ? raw.scores
        : [];

      setScores(parsed);
    } catch (err) {
      console.error(err);
      setError('Failed to load scores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const num = Number(value);

    // ✅ validation
    if (!value) {
      setError('Please enter a score value.');
      return;
    }

    if (isNaN(num) || num < 1 || num > 45) {
      setError('Score must be between 1 and 45.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await postScore({ value: num });

      setValue('');
      setSuccess('✅ Score submitted successfully!');
      await fetchScores();

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === 'Subscription required') {
        setError('❌ Please subscribe first');
      } else if (msg === 'Subscription expired') {
        setError('⚠️ Subscription expired');
      } else if (msg === 'Score must be between 1-45') {
        setError('⚠️ Invalid score (1–45 only)');
      } else {
        setError(msg || 'Failed to submit score');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getValueColor = (v) => {
    if (v <= 15) return 'text-green-600 bg-green-50';
    if (v <= 30) return 'text-cyan-600 bg-cyan-50';
    if (v <= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* ADD SCORE */}
      <Card>
        <h2 className="font-bold text-lg mb-2">Submit a Score</h2>
        <p className="text-sm text-gray-500 mb-2">
          Range: 1–45 · Max 5 scores (oldest auto replaced)
        </p>

        {error && (
          <div className="mb-3 text-red-500 text-sm">{error}</div>
        )}

        {success && (
          <div className="mb-3 text-green-600 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            placeholder="Enter score"
            min="1"
            max="45"
            className="border px-3 py-2 rounded w-full"
          />

          <Button loading={submitting}>Submit</Button>
        </form>
      </Card>

      {/* SCORE LIST */}
      <Card>
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">My Scores</h2>
          <span className="text-sm">{scores.length}/5</span>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          <div className="space-y-2">
            {scores.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="text-sm">Score #{i + 1}</p>
                  <p className="text-xs text-gray-400">
                    {s.createdAt
                      ? new Date(s.createdAt).toLocaleDateString()
                      : ''}
                  </p>
                </div>

                <div
                  className={`px-3 py-1 rounded font-bold ${getValueColor(
                    s.value
                  )}`}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}