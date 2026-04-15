import { appConfig } from "@/lib/config/app-config";
import { API_PREFIX } from "@/lib/config/constants";
import { demoTasks } from "@/lib/demo/dataset";
import type { TaskFilter, TaskItem } from "@/modules/task/task.types";
import { apiClient } from "@/services/apiClient";

let taskStore: TaskItem[] = [...demoTasks];

function shouldUseDemoData(): boolean {
  return appConfig.demoData;
}

export const taskService = {
  async listTasks(filter: TaskFilter = {}): Promise<TaskItem[]> {
    if (shouldUseDemoData()) {
      return taskStore.filter((task) => {
        const statusMatch =
          !filter.status || filter.status === "all" || task.status === filter.status;
        const assigneeMatch = !filter.assignee || task.assignee === filter.assignee;
        return statusMatch && assigneeMatch;
      });
    }

    return apiClient.get<TaskItem[]>(
      `${API_PREFIX}/tasks`,
      `
      query Tasks {
        tasks {
          id
          title
          assignee
          priority
          status
        }
      }
      `
    );
  },

  async updateTaskStatus(id: string, status: TaskItem["status"]): Promise<TaskItem> {
    if (shouldUseDemoData()) {
      taskStore = taskStore.map((task) => (task.id === id ? { ...task, status } : task));
      const next = taskStore.find((task) => task.id === id);
      if (!next) {
        throw new Error("Task not found");
      }
      return next;
    }

    return apiClient.post<TaskItem, { status: TaskItem["status"] }>(
      `${API_PREFIX}/tasks/${id}/status`,
      { status }
    );
  }
};
