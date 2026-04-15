"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/common/skeleton";
import { useProjects } from "@/modules/project/hooks/use-projects.hook";

export function ProjectList() {
  const t = useTranslations("projects");
  const {
    projects,
    isLoading,
    isError,
    page,
    totalPages,
    status,
    search,
    setPage,
    setStatus,
    setSearch,
    createProject,
    deleteProject,
    isMutating
  } = useProjects();
  const [newProjectName, setNewProjectName] = useState("");

  if (isLoading) {
    return <Skeleton lines={4} />;
  }

  if (isError) {
    return <EmptyState title={t("errorTitle")} description={t("errorDescription")} />;
  }

  if (projects.length === 0) {
    return <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />;
  }

  return (
    <div className="stack">
      <div className="card" style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "2fr 1fr auto" }}>
          <input
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            placeholder="Search projects"
            className="input"
          />
          <select
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value as "all" | "planning" | "active" | "completed");
            }}
            className="input"
          >
            <option value="all">All statuses</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="button button-primary"
            disabled={isMutating || !newProjectName.trim()}
            onClick={async () => {
              await createProject({
                name: newProjectName.trim(),
                owner: "Demo Admin",
                status: "planning"
              });
              setNewProjectName("");
            }}
          >
            Add
          </button>
        </div>
        <input
          value={newProjectName}
          onChange={(event) => setNewProjectName(event.target.value)}
          placeholder="New project name"
          className="input"
        />
      </div>

      <div className="grid-two">
        {projects.map((project) => (
          <article key={project.id} className="card">
            <h3 className="card-title text-title-sm">{project.name}</h3>
            <p className="help-text">
              {t("owner")}: {project.owner}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="badge">{project.status}</span>
              <button
                className="button button-ghost"
                disabled={isMutating}
                onClick={async () => {
                  await deleteProject(project.id);
                }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          className="button button-ghost"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="help-text">
          Page {page} / {totalPages}
        </span>
        <button
          className="button button-ghost"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
