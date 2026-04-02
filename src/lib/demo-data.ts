import type { BillingSummary } from "@/modules/billing/types";
import type { EcommerceSummary } from "@/modules/ecommerce/types";
import type { ProjectItem } from "@/modules/project/types";
import type { TaskItem } from "@/modules/task/types";
import type { UserListItem } from "@/modules/user/types";

const users: UserListItem[] = [
  { id: "u_1", name: "Sarah Khan", email: "sarah@example.com", role: "admin" },
  { id: "u_2", name: "Alex Reed", email: "alex@example.com", role: "user" }
];

const projects: ProjectItem[] = [
  { id: "pr_1", name: "Website Redesign", owner: "Sarah Khan", status: "active" },
  { id: "pr_2", name: "Analytics Revamp", owner: "Alex Reed", status: "planning" }
];

const tasks: TaskItem[] = [
  {
    id: "t_1",
    title: "Prepare onboarding flow",
    assignee: "Ariyan",
    priority: "high",
    status: "in-progress"
  },
  {
    id: "t_2",
    title: "Audit route guards",
    assignee: "Nadia",
    priority: "medium",
    status: "todo"
  }
];

const ecommerceSummary: EcommerceSummary = {
  orders: 128,
  revenue: 24120
};

const billingSummary: BillingSummary = {
  activePlans: 43,
  mrr: 12800
};

export function listDemoUsers(): UserListItem[] {
  return users;
}

export function listDemoProjects(): ProjectItem[] {
  return projects;
}

export function listDemoTasks(): TaskItem[] {
  return tasks;
}

export function getDemoEcommerceSummary(): EcommerceSummary {
  return ecommerceSummary;
}

export function getDemoBillingSummary(): BillingSummary {
  return billingSummary;
}
