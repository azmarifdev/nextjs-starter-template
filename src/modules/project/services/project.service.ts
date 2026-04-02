import { API_PREFIX } from "@/lib/constants";
import { ProjectItem } from "@/modules/project/types";
import { apiClient } from "@/services/apiClient";

export const projectService = {
  async listProjects(): Promise<ProjectItem[]> {
    const { data } = await apiClient.get<ProjectItem[]>(`${API_PREFIX}/projects`);
    return data;
  }
};
