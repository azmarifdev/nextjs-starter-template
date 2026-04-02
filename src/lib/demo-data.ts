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

export function listDemoUsers(): UserListItem[] {
  return users;
}

export function listDemoProjects(): ProjectItem[] {
  return projects;
}

export function listDemoTasks(): TaskItem[] {
  return tasks;
}
