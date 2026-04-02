import { getTranslations } from "next-intl/server";

import { UserTable } from "@/modules/user/components/UserTable";

export default async function UsersPage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="stack">
      <h1 className="card-title">{t("usersNav")}</h1>
      <UserTable />
    </div>
  );
}
