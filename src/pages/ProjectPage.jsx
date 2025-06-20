import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';

const ProjectPage = ({ projectId }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tickets for Project</h2>
      <TicketForm projectId={projectId} />
      <TicketList projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
