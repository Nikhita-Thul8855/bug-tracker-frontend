import Header from '../components/Header';
import ProjectSelector from '../components/ProjectSelector';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Header title="Dashboard" />

      {/* Project Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Select a Project</h2>
        <ProjectSelector
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {/* Dashboard Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome to your Bug Tracker dashboard
        </h2>
        <p className="text-gray-600 mt-2">
          Here you can view project details, manage tickets, and track progress.
        </p>

        {selectedProject && (
          <div className="mt-4 text-blue-600 font-medium">
            📁 Currently viewing project ID: {selectedProject}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;