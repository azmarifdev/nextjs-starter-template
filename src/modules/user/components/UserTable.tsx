"use client";

import { useTranslations } from "next-intl";

import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/common/skeleton";
import { useAuth } from "@/hooks/use-auth.hook";
import { useUsers } from "@/modules/user/hooks/use-users.hook";

export function UserTable() {
  const t = useTranslations("users");
  const { user } = useAuth();
  const { users, isLoading, isError, role, setRole, updateUserRole, isMutating } = useUsers();
  const isAdmin = user?.role === "admin";

  if (isLoading) {
    return <Skeleton lines={5} />;
  }

  if (isError) {
    return <EmptyState title={t("errorTitle")} description={t("errorDescription")} />;
  }

  if (users.length === 0) {
    return <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />;
  }

  return (
    <div className="stack">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <select
            className="input"
            value={role}
            onChange={(event) => setRole(event.target.value as "all" | "admin" | "user")}
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <span className="help-text">
            {isAdmin ? "Admin controls enabled" : "Read-only (admin only for role changes)"}
          </span>
        </div>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>{t("columns.name")}</th>
              <th>{t("columns.email")}</th>
              <th>{t("columns.role")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((tableUser) => (
              <tr key={tableUser.id}>
                <td>{tableUser.name}</td>
                <td>{tableUser.email}</td>
                <td>
                  {isAdmin ? (
                    <select
                      className="input"
                      value={tableUser.role}
                      disabled={isMutating}
                      onChange={async (event) => {
                        await updateUserRole({
                          id: tableUser.id,
                          nextRole: event.target.value as "admin" | "user"
                        });
                      }}
                    >
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                  ) : (
                    tableUser.role
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
