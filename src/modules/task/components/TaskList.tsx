"use client";

import { useTranslations } from "next-intl";

import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/common/skeleton";
import { useTasks } from "@/modules/task/hooks/use-tasks.hook";

export function TaskList() {
  const t = useTranslations("tasks");
  const { tasks, isLoading, isError, status, setStatus, updateTaskStatus, isMutating } = useTasks();

  if (isLoading) {
    return <Skeleton lines={4} />;
  }

  if (isError) {
    return <EmptyState title={t("errorTitle")} description={t("errorDescription")} />;
  }

  if (tasks.length === 0) {
    return <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />;
  }

  return (
    <div className="stack">
      <div className="card">
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "all" | "todo" | "in-progress" | "done")
          }
          className="input"
        >
          <option value="all">All statuses</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      {tasks.map((task) => (
        <article key={task.id} className="card">
          <h3 className="card-title text-title-xs">{task.title}</h3>
          <p className="help-text">
            {t("assignee")}: {task.assignee}
          </p>
          <p className="help-text">
            {t("priority")}: {task.priority}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="badge">{task.status}</span>
            <select
              value={task.status}
              disabled={isMutating}
              onChange={async (event) => {
                await updateTaskStatus({
                  id: task.id,
                  nextStatus: event.target.value as "todo" | "in-progress" | "done"
                });
              }}
              className="input"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </article>
      ))}
    </div>
  );
}
