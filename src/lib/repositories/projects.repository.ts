import { listDemoProjects } from "@/lib/demo-data";
import type { ProjectItem } from "@/modules/project/types";

export const projectsRepository = {
  async list(): Promise<ProjectItem[]> {
    return listDemoProjects();
  }
};
