import { listDemoUsers } from "@/lib/demo-data";
import type { UserListItem } from "@/modules/user/types";

export const usersRepository = {
  async list(): Promise<UserListItem[]> {
    return listDemoUsers();
  }
};
