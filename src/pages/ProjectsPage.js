import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ProjectsPage;
