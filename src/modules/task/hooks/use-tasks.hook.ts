"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { taskService } from "@/modules/task/services/task.service";
import type { TaskItem } from "@/modules/task/task.types";

export function useTasks() {
  const [status, setStatus] = useState<"all" | TaskItem["status"]>("all");
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks", { status }],
    queryFn: () => taskService.listTasks({ status })
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: TaskItem["status"] }) =>
      taskService.updateTaskStatus(id, nextStatus),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  return {
    tasks: query.data ?? [],
    status,
    setStatus,
    updateTaskStatus: updateTaskStatusMutation.mutateAsync,
    isMutating: updateTaskStatusMutation.isPending,
    isLoading: query.isLoading,
    isError: query.isError
  };
}
