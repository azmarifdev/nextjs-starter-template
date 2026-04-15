"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import type { ProjectItem } from "@/modules/project/project.types";
import { projectService } from "@/modules/project/services/project.service";

export function useProjects() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"all" | ProjectItem["status"]>("all");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["projects", { page, status, search }],
    queryFn: () =>
      projectService.listProjectsPage({
        page,
        pageSize: 4,
        status,
        search
      })
  });

  const createProjectMutation = useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });

  const paging = useMemo(
    () => ({
      page: query.data?.page ?? page,
      totalPages: query.data?.totalPages ?? 1,
      total: query.data?.total ?? 0
    }),
    [page, query.data?.page, query.data?.total, query.data?.totalPages]
  );

  return {
    projects: query.data?.items ?? [],
    page: paging.page,
    totalPages: paging.totalPages,
    total: paging.total,
    status,
    search,
    setPage,
    setStatus,
    setSearch,
    createProject: createProjectMutation.mutateAsync,
    deleteProject: deleteProjectMutation.mutateAsync,
    isMutating: createProjectMutation.isPending || deleteProjectMutation.isPending,
    isLoading: query.isLoading,
    isError: query.isError
  };
}
