"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { clearFilters, setFilters } from "@/store/taskSlice";
import { useDispatch, useSelector } from "react-redux";


interface TaskFiltersBarProps {
    className?: string; 
}

export default function TaskFiltersBar({ className }: TaskFiltersBarProps) {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.tasks.filters);

    const isFiltered =
        filters.status !== "all" ||
        filters.priority !== "all" ||
        filters.search !== "";

    return (
        <div
            className={cn(
                "flex flex-col gap-3",
                className
            )}
        >
          
            <div className="relative">
                <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
                    className="pl-9 bg-background border-border"
                />
            </div>
            <select
                value={filters.status}
                onChange={(e) => dispatch(setFilters({ status: e.target.value as typeof filters.status }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
                <option value="all">All Status</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <select
                value={filters.priority}
                onChange={(e) => dispatch(setFilters({ priority: e.target.value as typeof filters.priority }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {isFiltered && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(clearFilters())}
                    className="w-full justify-center text-muted-foreground hover:text-foreground"
                >
                    {/* X icon */}
                    <svg
                        className="mr-1 h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    Clear Filters
                </Button>
            )}
        </div>
    );
}
