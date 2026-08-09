import ProjectCard from './ProjectCard';

// 2nd Level: Receives the projects array via props from the parent
const ProjectList = ({ projects }) => {
  return (
    <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {projects.map((project) => (
        // Passing data down to the 3rd level
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
