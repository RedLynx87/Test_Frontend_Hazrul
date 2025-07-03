import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    no_hp: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", no_hp: "", email: "", password: "" });
    setErrors({});
  };

  const validate = () => {
    const err = {};

    if (!form.email) {
      err.email = "Email tidak boleh kosong";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Format email tidak valid";
    }

    if (!form.password) {
      err.password = "Password tidak boleh kosong";
    } else if (!isLogin) {
      if (form.password.length < 8 || form.password.length > 16) {
        err.password = "Password harus 8–16 karakter";
      } else if (
        !/(?=.*[a-z])/.test(form.password) ||
        !/(?=.*[A-Z])/.test(form.password) ||
        !/(?=.*[\W_])/.test(form.password)
      ) {
        err.password = "Password harus ada huruf besar, kecil, dan simbol";
      }
    }

    if (!isLogin) {
      if (!form.name || form.name.length < 6) {
        err.name = "Nama minimal 6 karakter";
      }
      if (!form.no_hp || !/^\d+$/.test(form.no_hp)) {
        err.no_hp = "No HP wajib diisi dan hanya angka";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isLogin) {
        const res = await axios.post("/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/users");
      } else {
        await axios.post("/register", form);
        const loginRes = await axios.post("/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", loginRes.data.token);
        navigate("/users");
      }
    } catch (err) {
      alert("Gagal login/register");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="relative w-full h-full">
        <div
          className={`w-[200%] h-full flex transition-transform duration-700 ease-in-out ${
            isLogin ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          <div className="w-1/2 flex items-center justify-start text-black bg-gradient-to-r from-white to-gray-300">
            <div className="w-[calc(100%-60px)] ml-[10%] max-w-md">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nama"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input
                  type="text"
                  placeholder="No HP"
                  value={form.no_hp}
                  onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                {errors.no_hp && <p className="text-red-500 text-sm">{errors.no_hp}</p>}

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                <button
                  type="submit"
                  className="w-full text-white py-2 rounded "
                >
                  Register
                </button>
              </form>
              <p className="mt-4 text-sm">
                Sudah punya akun?{" "}
                <button
                  onClick={toggleForm}
                  className="text-green-600 hover:underline"
                >
                  Login di sini
                </button>
              </p>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-end bg-gradient-to-r from-gray-300 to-white text-black">
            <div className="w-[calc(100%-60px)] mr-[10%] max-w-md">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                <button
                  type="submit"
                  className="w-full text-white py-2 rounded "
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-sm">
                Belum punya akun?{" "}
                <button
                  onClick={toggleForm}
                  className="text-green-600 hover:underline"
                >
                  Daftar di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
