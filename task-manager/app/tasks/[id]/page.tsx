import TaskDetailView from "@/components/TaskDetailView";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import Link from "next/link";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${getBaseUrl()}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-4 text-sm text-muted-foreground">Task not found</p>
        <Link href="/tasks">
          <Button variant="ghost">← Back to Tasks</Button>
        </Link>
      </div>
    );
  }

  const task: Task = await response.json();

  return <TaskDetailView task={task} />;
}
