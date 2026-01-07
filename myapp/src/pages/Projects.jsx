import { useEffect, useState } from "react"
import api from "../api/axious"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const role = localStorage.getItem("role")

  useEffect(() => {
    api.get("projects/").then((res) => setProjects(res.data))
  }, [])

  const createProject = async () => {
    try {
      await api.post("projects/", {
        name: "New Project",
        description: "Created by admin",
      })
      alert("Project created")
      window.location.reload()
    } catch {
      alert("Only admin can create project")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Projects</h1>

      {role === "admin" && (
        <button
          className="bg-black text-white px-4 py-2 mb-4"
          onClick={createProject}
        >
          Create Project
        </button>
      )}

      {projects.map((p) => (
        <div key={p.id} className="border p-3 mb-2">
          <h3 className="font-semibold">{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  )
}
