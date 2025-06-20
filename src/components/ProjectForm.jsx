import { useState } from "react";
import axios from "axios";

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // if using auth
      await axios.post("http://localhost:5003/api/projects", {
        title,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle("");
      setDescription("");
      onProjectCreated(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <input
        className="w-full p-2 border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      />
      <textarea
        className="w-full p-2 border"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Project</button>
    </form>
  );
};

export default ProjectForm;
