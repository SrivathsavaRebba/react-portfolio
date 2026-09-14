import { useState } from 'react';
import { Link } from 'react-router-dom';

// 3rd Level: Receives the specific project data via props
const ProjectCard = ({ project }) => {
  // Independent State: Only toggles for THIS specific card instance
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="project-card" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
        <img 
            src={project.image} 
            alt={project.title} 
            style={{ 
                width: '100%', 
                maxHeight: '200px', 
                objectFit: 'contain', 
                borderRadius: '4px',
                backgroundColor: '#f8f9fa' 
            }} 
        />
      <h3>{project.title}</h3>
      
      {/* Toggle Button for Independent State */}
      <button 
        onClick={() => setShowDetails(!showDetails)}
        style={{ margin: '10px 0', padding: '5px 10px', cursor: 'pointer' }}
      >
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>

      {/* Conditionally render details based on state */}
      {showDetails && (
        <div className="details">
          <p>{project.description}</p>
          <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
          
          {/* Link to the dynamic details page */}
          <Link to={`/projects/${project.id}`} >
            Go to Full Project Page →
          </Link>
        </div>
      )}
    </article>
  );
};

export default ProjectCard;