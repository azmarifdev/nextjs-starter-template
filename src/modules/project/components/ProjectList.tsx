"use client";

import { useTranslations } from "next-intl";

import { useProjects } from "@/modules/project/hooks/useProjects";

export function ProjectList() {
  const t = useTranslations("projects");
  const { projects } = useProjects();

  return (
    <div className="grid-two">
      {projects.map((project) => (
        <article key={project.id} className="card">
          <h3 className="card-title text-title-sm">{project.name}</h3>
          <p className="help-text">
            {t("owner")}: {project.owner}
          </p>
          <span className="badge">{project.status}</span>
        </article>
      ))}
    </div>
  );
}
