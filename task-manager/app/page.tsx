"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import TaskCard from "@/components/TaskCard";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks, removeTask } from "@/store/taskSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StatsCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20">
   
      <div className="mb-2 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${accent}`} />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
  
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}


export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { tasks, status } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "done").length;

  const overdue = tasks.filter((t) => {
    if (t.status === "done") return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  }).length;

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  const handleEdit = (task: { id: string }) => {
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };


  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" label="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your tasks and progress.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatsCard label="Total Tasks" value={totalTasks} accent="bg-foreground" />
        <StatsCard label="In Progress" value={inProgress} accent="bg-blue-500" />
        <StatsCard label="Completed" value={completed} accent="bg-emerald-500" />
        <StatsCard
          label="Overdue"
          value={overdue}
          accent="bg-red-500"
        />
      </div>


      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Tasks</h2>
          <Link
            href="/tasks"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all →
          </Link>
        </div>

     
        {recentTasks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
     
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No tasks yet. Create your first task to get started!
            </p>
            <Link
              href="/create"
              className="mt-3 inline-block rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              + Create Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
