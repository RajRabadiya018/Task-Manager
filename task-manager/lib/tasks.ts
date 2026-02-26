import { Task } from "@/types/task";

let tasks: Task[] = [
    {
        id: "1",
        title: "Design Landing Page",
        description:
            "Create a modern landing page design with hero section, features grid, and call-to-action buttons. Should follow the black & white theme.",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-03-05",
        createdAt: "2026-02-20T10:00:00Z",
        tags: ["design", "frontend"],
        assignedTo: "Raj",
    },
    {
        id: "2",
        title: "Set Up CI/CD Pipeline",
        description:
            "Configure GitHub Actions for automated testing, linting, and deployment to Vercel on every push to the main branch.",
        priority: "high",
        status: "todo",
        dueDate: "2026-03-10",
        createdAt: "2026-02-21T08:30:00Z",
        tags: ["devops", "automation"],
        assignedTo: "Raj",
    },
    {
        id: "3",
        title: "Write API Documentation",
        description:
            "Document all REST API endpoints including request/response formats, authentication, and error codes using Swagger/OpenAPI.",
        priority: "medium",
        status: "todo",
        dueDate: "2026-03-15",
        createdAt: "2026-02-22T14:00:00Z",
        tags: ["documentation", "backend"],
        assignedTo: "Raj",
    },
    {
        id: "4",
        title: "Fix Login Bug",
        description:
            "Users intermittently get logged out after 5 minutes. Investigate token refresh logic and fix the session timeout issue.",
        priority: "high",
        status: "done",
        dueDate: "2026-02-25",
        createdAt: "2026-02-18T09:00:00Z",
        tags: ["bug", "auth"],
        assignedTo: "Raj",
    },
    {
        id: "5",
        title: "Add Dark Mode Toggle",
        description:
            "Implement a theme switcher component that allows users to toggle between light and dark mode. Persist preference in localStorage.",
        priority: "low",
        status: "todo",
        dueDate: "2026-03-20",
        createdAt: "2026-02-23T11:00:00Z",
        tags: ["feature", "ui"],
        assignedTo: "Raj",
    },
    {
        id: "6",
        title: "Optimize Database Queries",
        description:
            "Profile and optimize slow database queries on the tasks listing endpoint. Add proper indexes and implement pagination.",
        priority: "medium",
        status: "in-progress",
        dueDate: "2026-03-08",
        createdAt: "2026-02-19T16:00:00Z",
        tags: ["performance", "backend"],
        assignedTo: "Raj",
    },
];


export function getAllTasks(): Task[] {
    return [...tasks];
}

export function getTaskById(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
}

export function addTask(task: Task): Task {
    tasks.push(task);
    return task;
}

export function updateTask(
    id: string,
    updates: Partial<Task>
): Task | undefined {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return undefined;

    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
}

export function deleteTask(id: string): boolean {
    const lengthBefore = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length < lengthBefore;
}
