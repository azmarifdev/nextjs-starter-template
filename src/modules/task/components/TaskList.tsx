"use client";

import { useTranslations } from "next-intl";

import { useTasks } from "@/modules/task/hooks/useTasks";

export function TaskList() {
  const t = useTranslations("tasks");
  const { tasks } = useTasks();

  return (
    <div className="stack">
      {tasks.map((task) => (
        <article key={task.id} className="card">
          <h3 className="card-title text-title-xs">{task.title}</h3>
          <p className="help-text">
            {t("assignee")}: {task.assignee}
          </p>
          <p className="help-text">
            {t("priority")}: {task.priority}
          </p>
          <span className="badge">{task.status}</span>
        </article>
      ))}
    </div>
  );
}
