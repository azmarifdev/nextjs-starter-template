import { listDemoTasks } from "@/lib/demo-data";
import type { TaskItem } from "@/modules/task/types";

export const tasksRepository = {
  async list(): Promise<TaskItem[]> {
    return listDemoTasks();
  }
};
