import { appConfig } from "@/lib/config/app-config";
import { API_PREFIX } from "@/lib/config/constants";
import { demoUsers } from "@/lib/demo/dataset";
import type { UserListItem, UserListParams } from "@/modules/user/user.types";
import { apiClient } from "@/services/apiClient";

let userStore: UserListItem[] = [...demoUsers];

function shouldUseDemoData(): boolean {
  return appConfig.demoData;
}

export const userService = {
  async listUsers(params: UserListParams = {}): Promise<UserListItem[]> {
    if (shouldUseDemoData()) {
      if (!params.role || params.role === "all") {
        return userStore;
      }
      return userStore.filter((user) => user.role === params.role);
    }

    return apiClient.get<UserListItem[]>(
      `${API_PREFIX}/users`,
      `
      query Users {
        users {
          id
          name
          email
          role
        }
      }
      `
    );
  },

  async updateUserRole(id: string, role: UserListItem["role"]): Promise<UserListItem> {
    if (shouldUseDemoData()) {
      userStore = userStore.map((user) => (user.id === id ? { ...user, role } : user));
      const next = userStore.find((user) => user.id === id);
      if (!next) {
        throw new Error("User not found");
      }
      return next;
    }

    return apiClient.post<UserListItem, { role: UserListItem["role"] }>(
      `${API_PREFIX}/users/${id}/role`,
      { role }
    );
  }
};
