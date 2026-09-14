import { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the new backend
    fetch('http://localhost:5001/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load projects from server.');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Graceful handling of loading and error states
  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading projects...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}><h3>Backend Error:</h3><p>{error}</p></div>;

  return (
    <section id="projects">
      <h2>Projects:</h2>
      <ProjectList projects={projects} />
    </section>
  );
};

export default Projects;