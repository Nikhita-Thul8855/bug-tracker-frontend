import React, { useEffect, useState } from 'react';
import api from '../api/api';
import NewTicketForm from '../components/NewTicketForm';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      {projects.map((proj) => {
        console.log('Project object:', proj); // This will log each project
        return (
          <div key={proj._id} className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{proj.name}</h2>
            <p>{proj.description}</p>
            <NewTicketForm projectId={proj._id} />
          </div>
        );
      })}
    </div>
  );
};

export default Projects;