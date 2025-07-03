import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [userRes, usersRes] = await Promise.all([
        axios.get("/user"),
        axios.get("/users"),
      ]);
      setCurrentUser(userRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (err) {
      console.warn("Logout gagal, lanjut clear token.");
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-gray-300 to-white flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Daftar User</h2>

          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentUser.name
                  )}&background=4f46e5&color=fff&size=32`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700 font-semibold">
                  {currentUser.name}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <table className="w-full border text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">No HP</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.no_hp}</td>
                  <td className="border p-2">{u.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
