"use client";

import { useEffect, useState } from "react";

import { projectService } from "@/modules/project/services/project.service";
import { ProjectItem } from "@/modules/project/types";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const run = async (): Promise<void> => {
      try {
        const response = await projectService.listProjects();
        setProjects(response);
      } catch {
        setProjects([]);
      }
    };

    void run();
  }, []);

  return { projects };
}
