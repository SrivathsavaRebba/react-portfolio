import { projects } from '../data/projects';
import ProjectList from '../components/ProjectList';

// 1st Level: The Page Component
const Projects = () => {
  return (
    <section id="projects">
      <h2>Projects:</h2>
      {/* Passing the imported data down to the child component */}
      <ProjectList projects={projects} />
    </section>
  );
};

export default Projects;
