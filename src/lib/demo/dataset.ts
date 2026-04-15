import type { BillingSummary } from "@/modules/billing/billing.types";
import type { EcommerceSummary } from "@/modules/ecommerce/ecommerce.types";
import type { ProjectItem } from "@/modules/project/project.types";
import type { TaskItem } from "@/modules/task/task.types";
import type { UserListItem } from "@/modules/user/user.types";

export const demoUsers: UserListItem[] = [
  { id: "u_demo_admin", name: "Demo Admin", email: "admin@example.com", role: "admin" },
  { id: "u_demo_pm", name: "Product Manager", email: "pm@example.com", role: "user" },
  { id: "u_demo_eng", name: "Frontend Engineer", email: "eng@example.com", role: "user" }
];

export const demoProjects: ProjectItem[] = [
  { id: "p_1", name: "Launch Website", owner: "Product Manager", status: "active" },
  { id: "p_2", name: "Auth Hardening", owner: "Demo Admin", status: "planning" },
  { id: "p_3", name: "Billing Refresh", owner: "Demo Admin", status: "completed" },
  { id: "p_4", name: "Dashboard UX", owner: "Frontend Engineer", status: "active" },
  { id: "p_5", name: "Customer Portal", owner: "Product Manager", status: "planning" },
  { id: "p_6", name: "Analytics v2", owner: "Demo Admin", status: "active" }
];

export const demoTasks: TaskItem[] = [
  {
    id: "t_1",
    title: "Create onboarding checklist",
    assignee: "Product Manager",
    priority: "high",
    status: "in-progress"
  },
  {
    id: "t_2",
    title: "Implement token refresh",
    assignee: "Demo Admin",
    priority: "high",
    status: "todo"
  },
  {
    id: "t_3",
    title: "Design KPI cards",
    assignee: "Frontend Engineer",
    priority: "medium",
    status: "done"
  },
  {
    id: "t_4",
    title: "Add role filters",
    assignee: "Demo Admin",
    priority: "medium",
    status: "in-progress"
  },
  { id: "t_5", title: "Update docs", assignee: "Product Manager", priority: "low", status: "todo" },
  {
    id: "t_6",
    title: "Fix table accessibility",
    assignee: "Frontend Engineer",
    priority: "medium",
    status: "todo"
  }
];

export const demoEcommerceSummary: EcommerceSummary = {
  orders: 124,
  revenue: 28500
};

export const demoBillingSummary: BillingSummary = {
  activePlans: 42,
  mrr: 14300
};
