import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  // Grab the dynamic :projectId from the URL
  const { projectId } = useParams();
  
  // Find the specific project in our data array that matches the ID
  const project = projects.find(p => p.id === projectId);

  // If someone types a random ID in the URL that doesn't exist
  if (!project) {
    return (
      <section style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Project Not Found</h2>
        <Link to="/projects">← Back to Projects</Link>
      </section>
    );
  }

  return (
    <section className="project-detail" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{project.title}</h2>
      <img 
        src={project.image} 
        alt={project.title} 
        style={{ 
            width: '100%', 
            maxHeight: '400px', /* Give it a bit more vertical room on the big page */
            objectFit: 'contain', 
            borderRadius: '8px', 
            marginBottom: '20px',
            backgroundColor: '#f8f9fa'
        }} 
        />
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{project.description}</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Technologies Used:</h3>
        <ul>
          {project.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>

      <a href={project.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 15px', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        View Source Code
      </a>
      
      <br />
      <Link to="/projects" style={{ color: 'blue', textDecoration: 'underline' }}>← Back to Projects Gallery</Link>
    </section>
  );
};

export default ProjectDetail;