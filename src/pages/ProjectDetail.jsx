import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/projects/${projectId}`)
      .then((res) => {
        if (res.status === 404) throw new Error('Project not found');
        if (!res.ok) throw new Error('Failed to load project details.');
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading project...</div>;
  
  if (error) {
    return (
      <section style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>{error}</h2>
        <Link to="/projects" style={{ color: 'blue', textDecoration: 'underline' }}>← Back to Projects</Link>
      </section>
    );
  }

  return (
    <section className="project-detail" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{project.title}</h2>
      <img 
        src={project.image} 
        alt={project.title} 
        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f8f9fa' }} 
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
      <Link to="/projects" style={{ textDecoration: 'underline' }}>← Back to Projects Gallery</Link>
    </section>
  );
};

export default ProjectDetail;