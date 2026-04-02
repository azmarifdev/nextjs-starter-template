"use client";

import { useEffect, useState } from "react";

import { userService } from "@/modules/user/services/user.service";
import { UserListItem } from "@/modules/user/types";

export function useUsers() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async (): Promise<void> => {
      try {
        const response = await userService.listUsers();
        setUsers(response);
      } catch {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, []);

  return { users, isLoading };
}
