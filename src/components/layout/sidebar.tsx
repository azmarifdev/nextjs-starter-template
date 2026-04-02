"use client";

import { BriefcaseBusiness, CheckSquare, LayoutDashboard, Users } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";

const links = [
  { href: "/dashboard", key: "overviewNav", icon: LayoutDashboard },
  { href: "/users", key: "usersNav", icon: Users },
  { href: "/projects", key: "projectsNav", icon: BriefcaseBusiness },
  { href: "/tasks", key: "tasksNav", icon: CheckSquare }
] as const;

export function Sidebar() {
  const t = useTranslations("dashboard");

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href as Route} className="sidebar-link">
              <span className="icon-inline icon-gap-sm">
                <Icon size={16} />
              </span>
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
