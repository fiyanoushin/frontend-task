import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axious"

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("login/", form)
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh) 
      localStorage.setItem("role", res.data.role)
      navigate("/projects")
    } catch {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white w-full py-2">
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          No account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  )
}
