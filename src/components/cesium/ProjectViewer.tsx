import { CesiumViewer } from './CesiumViewer';
import type { Project } from '../../content/config';

interface ProjectViewerProps {
  project: Project;
  className?: string;
}

export function ProjectViewer({ project, className }: ProjectViewerProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <CesiumViewer 
        initialLocation={project.location} 
      />
      <div className="mt-4 prose">
        {project.description}
      </div>
    </div>
  );
}