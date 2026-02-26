import TaskList from "@/components/TaskList";
import { Task } from "@/types/task";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function TasksPage() {
  const response = await fetch(`${getBaseUrl()}/api/tasks`, {
    cache: "no-store",
  });
  const tasks: Task[] = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and track all your tasks.
        </p>
      </div>
      <TaskList initialTasks={tasks} />
    </div>
  );
}
