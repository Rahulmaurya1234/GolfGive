import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, verifyOtp } from '../services/api';

export default function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile_no: '', // ✅ ADDED
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.mobile_no) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await signup(form); // ✅ mobile_no bhi jayega
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp({
        email: form.email,
        otp,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">

        <h1 className="text-xl font-bold mb-4 text-center">
          {step === 1 ? 'Signup' : 'Verify OTP'}
        </h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* SIGNUP FORM */}
        {step === 1 && (
          <form onSubmit={handleSignup} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {/* ✅ NEW FIELD */}
            <input
              type="tel"
              name="mobile_no"
              placeholder="Mobile Number"
              value={form.mobile_no}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              {loading ? 'Please wait...' : 'Signup'}
            </button>
          </form>
        )}

        {/* OTP FORM */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}