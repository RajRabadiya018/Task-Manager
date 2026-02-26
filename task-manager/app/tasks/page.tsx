import TaskList from "@/components/TaskList";
import { Task } from "@/types/task";


export default async function TasksPage() {
    const response = await fetch("http://localhost:3000/api/tasks", {
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
