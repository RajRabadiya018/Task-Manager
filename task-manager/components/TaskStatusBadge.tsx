"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/task";


interface TaskStatusBadgeProps {
    status: TaskStatus;                  
    size?: "sm" | "md" | "lg";            
    className?: string;                    
}

const statusStyles: Record<TaskStatus, string> = {
    todo: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    done: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};


const statusLabels: Record<TaskStatus, string> = {
    todo: "Todo",
    "in-progress": "In Progress",
    done: "Done",
};

const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
};

export default function TaskStatusBadge({
    status,
    size = "md",
    className,
}: TaskStatusBadgeProps) {
    return (
        <span
            className={cn(
        
                "inline-flex items-center rounded-full border font-medium",
  
                statusStyles[status],
        
                sizeClasses[size],
          
                status === "in-progress" && "animate-pulse",
                className
            )}
        >
            <span
                className={cn(
                    "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
                    status === "todo" && "bg-zinc-400",
                    status === "in-progress" && "bg-blue-400",
                    status === "done" && "bg-emerald-400"
                )}
            />
            {statusLabels[status]}
        </span>
    );
}
