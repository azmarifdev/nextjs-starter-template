"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { userService } from "@/modules/user/services/user.service";
import type { UserListItem } from "@/modules/user/user.types";

export function useUsers() {
  const [role, setRole] = useState<"all" | UserListItem["role"]>("all");
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["users", { role }],
    queryFn: () => userService.listUsers({ role })
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, nextRole }: { id: string; nextRole: UserListItem["role"] }) =>
      userService.updateUserRole(id, nextRole),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  return {
    users: query.data ?? [],
    role,
    setRole,
    updateUserRole: updateUserRoleMutation.mutateAsync,
    isMutating: updateUserRoleMutation.isPending,
    isLoading: query.isLoading,
    isError: query.isError
  };
}
