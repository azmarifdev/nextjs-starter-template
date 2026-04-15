import { appConfig } from "@/lib/config/app-config";
import { API_PREFIX } from "@/lib/config/constants";
import { demoProjects } from "@/lib/demo/dataset";
import type {
  ProjectItem,
  ProjectListParams,
  ProjectListResult
} from "@/modules/project/project.types";
import { apiClient } from "@/services/apiClient";

let projectStore: ProjectItem[] = [...demoProjects];

function shouldUseDemoData(): boolean {
  return appConfig.demoData;
}

function paginate(items: ProjectItem[], params: ProjectListParams): ProjectListResult {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.max(1, params.pageSize ?? 6);
  const offset = (page - 1) * pageSize;
  const slice = items.slice(offset, offset + pageSize);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  return {
    items: slice,
    total: items.length,
    page,
    pageSize,
    totalPages
  };
}

function filterProjects(params: ProjectListParams): ProjectItem[] {
  const status = params.status ?? "all";
  const search = (params.search ?? "").trim().toLowerCase();

  return projectStore.filter((project) => {
    const statusMatch = status === "all" ? true : project.status === status;
    const searchMatch = search
      ? project.name.toLowerCase().includes(search) || project.owner.toLowerCase().includes(search)
      : true;
    return statusMatch && searchMatch;
  });
}

export const projectService = {
  async listProjects(params: ProjectListParams = {}): Promise<ProjectItem[]> {
    if (shouldUseDemoData()) {
      return paginate(filterProjects(params), params).items;
    }

    return apiClient.get<ProjectItem[]>(
      `${API_PREFIX}/projects`,
      `
      query Projects {
        projects {
          id
          name
          owner
          status
        }
      }
      `
    );
  },

  async listProjectsPage(params: ProjectListParams = {}): Promise<ProjectListResult> {
    if (shouldUseDemoData()) {
      return paginate(filterProjects(params), params);
    }

    const list = await apiClient.get<ProjectItem[]>(
      `${API_PREFIX}/projects`,
      `
      query Projects {
        projects {
          id
          name
          owner
          status
        }
      }
      `
    );
    return paginate(list, params);
  },

  async createProject(input: Pick<ProjectItem, "name" | "owner" | "status">): Promise<ProjectItem> {
    if (shouldUseDemoData()) {
      const created: ProjectItem = {
        id: `p_${crypto.randomUUID()}`,
        name: input.name,
        owner: input.owner,
        status: input.status
      };
      projectStore = [created, ...projectStore];
      return created;
    }

    return apiClient.post<ProjectItem, typeof input>(`${API_PREFIX}/projects`, input);
  },

  async updateProject(
    id: string,
    updates: Partial<Pick<ProjectItem, "name" | "owner" | "status">>
  ) {
    if (shouldUseDemoData()) {
      projectStore = projectStore.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      );
      const next = projectStore.find((project) => project.id === id);
      if (!next) {
        throw new Error("Project not found");
      }
      return next;
    }

    return apiClient.post<ProjectItem, typeof updates>(`${API_PREFIX}/projects/${id}`, updates);
  },

  async deleteProject(id: string): Promise<{ deleted: boolean }> {
    if (shouldUseDemoData()) {
      projectStore = projectStore.filter((project) => project.id !== id);
      return { deleted: true };
    }

    return apiClient.post<{ deleted: boolean }>(`${API_PREFIX}/projects/${id}/delete`);
  }
};
