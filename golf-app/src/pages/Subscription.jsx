import { useState, useEffect } from 'react';
import {
  getCharities,
  createSubscription,
  cancelSubscription,
  getSubscriptionStatus,
} from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const plans = [
  { id: 'monthly', name: 'Monthly', price: '₹1,000' },
  { id: 'yearly', name: 'Yearly', price: '₹10,000' },
];

export default function Subscription() {
  const [status, setStatus] = useState(null);
  const [charities, setCharities] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedCharity, setSelectedCharity] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isActive = status?.status === 'active'; // 🔥 FIX

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, charityRes] = await Promise.all([
          getSubscriptionStatus(),
          getCharities(),
        ]);

        setStatus(statusRes.data);

        const raw = charityRes.data;

        const list = Array.isArray(raw)
          ? raw
          : raw?.data || raw?.charities || [];

        setCharities(list);

        if (list.length > 0) {
          setSelectedCharity(list[0]._id || list[0].id);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = async () => {
    if (!selectedCharity) {
      setError('Select charity');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await createSubscription({
        plan: selectedPlan,
        charityId: selectedCharity,
        charityPercentage: 10,
      });

      const res = await getSubscriptionStatus();
      setStatus(res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.response?.data?.message || 'Subscription failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setSubmitting(true);
    try {
      await cancelSubscription();
      setStatus(null);
    } catch {
      setError('Cancel failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Subscription</h1>

      {error && <p className="text-red-500">{error}</p>}

      {isActive ? (
        <Card>
          <p>✅ Active Plan: {status.plan}</p>
          <p>Charity: {status.charityId?.name}</p>
          <Button onClick={handleCancel}>Cancel Subscription</Button>
        </Card>
      ) : (
        <>
          <div className="flex gap-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.name} - {plan.price}
              </button>
            ))}
          </div>

          <select
            value={selectedCharity}
            onChange={(e) => setSelectedCharity(e.target.value)}
          >
            {Array.isArray(charities) && charities.length > 0 ? (
              charities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))
            ) : (
              <option>No charities</option>
            )}
          </select>

          <Button onClick={handleSubscribe}>
            Subscribe
          </Button>
        </>
      )}
    </div>
  );
}