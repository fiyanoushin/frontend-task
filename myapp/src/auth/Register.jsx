import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axious"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post("register/", form)
      alert("Registered successfully")
      navigate("/")
    } catch (err) {
      alert("Registration failed")
    }
  }


  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 shadow w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-black text-white w-full py-2">
          Register
        </button>
      </form>
    </div>
  )
}
