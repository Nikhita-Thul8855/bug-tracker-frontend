import { useEffect, useState } from 'react';
import api from '../api/api';

const ProjectSelector = ({ selectedProject, setSelectedProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await api.get('/projects');
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <select
      value={selectedProject}
      onChange={(e) => setSelectedProject(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">Select Project</option>
      {projects.map((proj) => (
        <option key={proj._id} value={proj._id}>
          {proj.title}
        </option>
      ))}
    </select>
  );
};

export default ProjectSelector;
