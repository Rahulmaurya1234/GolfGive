import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../services/api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res.data.user);
      setName(res.data.user.name);
    });
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile({ name });
      setUser((prev) => ({ ...prev, name }));
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = async () => {
    try {
      setPassLoading(true);
      await changePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          {/* Avatar + Heading */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 
            flex items-center justify-center text-white text-xl font-semibold shadow-md">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500">Manage your account</p>
            </div>
          </div>

          <div className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <input
                value={user.email || ""}
                disabled
                className="mt-1 w-full border rounded-xl px-4 py-2 text-sm bg-gray-100 text-gray-500"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 
              text-white py-2.5 rounded-xl font-medium shadow-md 
              hover:shadow-lg hover:scale-[1.02] active:scale-95 
              transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* PASSWORD CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Security
          </h2>

          <div className="space-y-4">

            {/* Old Password */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Button */}
            <button
              onClick={handlePassword}
              disabled={passLoading}
              className="w-full bg-red-500 text-white py-2.5 rounded-xl font-medium shadow-md 
              hover:bg-red-600 hover:shadow-lg hover:scale-[1.02] active:scale-95 
              transition-all duration-200 disabled:opacity-50"
            >
              {passLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}