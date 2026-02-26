"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import Link from "next/link";
import TaskStatusBadge from "./TaskStatusBadge";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    compact?: boolean;
    className?: string;
}

const priorityStyles = {
    low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
};

const priorityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

function isOverdue(task: Task): boolean {
    if (task.status === "done") return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    compact = false,
    className,
}: TaskCardProps) {
    const overdue = isOverdue(task);

    return (
        <div
            className={cn(
                "group relative rounded-xl border bg-card p-5 transition-all duration-200",
                "hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5",
                overdue && "border-l-4 border-l-red-500",
                className
            )}
        >
            <div className="mb-3.5 flex items-center justify-between">
                <TaskStatusBadge status={task.status} size="sm" />
                <span
                    className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        priorityStyles[task.priority]
                    )}
                >
                    {priorityLabels[task.priority]}
                </span>
            </div>

            <Link href={`/tasks/${task.id}`}>
                <h3 className="mb-1.5 text-base font-semibold leading-snug text-foreground transition-colors hover:text-foreground/80">
                    {task.title}
                </h3>
            </Link>

            {!compact && (
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {task.description}
                </p>
            )}

            {task.tags.length > 0 && !compact && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {task.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs px-2 py-0.5"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className={cn("flex items-center gap-1.5", overdue && "text-red-400")}>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(task.dueDate)}
                    {overdue && " (Overdue)"}
                </span>
                {task.assignedTo && (
                    <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {task.assignedTo}
                    </span>
                )}
            </div>

            <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                        e.preventDefault();
                        onEdit(task);
                    }}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400"
                    onClick={(e) => {
                        e.preventDefault();
                        onDelete(task.id);
                    }}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </Button>
            </div>
        </div>
    );
}
