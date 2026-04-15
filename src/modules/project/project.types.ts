export interface ProjectItem {
  id: string;
  name: string;
  owner: string;
  status: "planning" | "active" | "completed";
}

export interface ProjectListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ProjectItem["status"] | "all";
}

export interface ProjectListResult {
  items: ProjectItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
