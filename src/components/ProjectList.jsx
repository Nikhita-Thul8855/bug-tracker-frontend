import React, { useEffect, useState } from 'react';
import api from '../api/api'; // this imports the axios instance

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects'); // automatically includes token
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err.response?.data || err.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">My Projects</h1>
      <ul>
        {projects.map((proj) => (
          <li key={proj._id}>{proj.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;