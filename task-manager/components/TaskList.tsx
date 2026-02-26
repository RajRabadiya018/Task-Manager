"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { AppDispatch } from "@/store";
import { removeTask, setTasks } from "@/store/taskSlice";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PAGE_SIZE = 9;

interface TaskListProps {
    initialTasks: Task[];
}

export default function TaskList({ initialTasks }: TaskListProps) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        dispatch(setTasks(initialTasks));
    }, [dispatch, initialTasks]);

    const { filteredTasks } = useTaskFilters();

    const {
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        pageItems,
    } = usePagination(filteredTasks.length, PAGE_SIZE);

    const paginatedTasks = pageItems(filteredTasks);

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleEdit = (task: Task) => {
        router.push(`/tasks/${task.id}/edit`);
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            dispatch(removeTask(deleteId));
            setDeleteId(null);
        }
    };

    return (
        <>
            {paginatedTasks.length > 0 ? (
                <>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {paginatedTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 pt-8">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="text-sm"
                            >
                                ← Prev
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (page) => (
                                    <Button
                                        key={page}
                                        variant={page === currentPage ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => goToPage(page)}
                                        className="h-9 w-9 p-0 text-sm"
                                    >
                                        {page}
                                    </Button>
                                )
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="text-sm"
                            >
                                Next →
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="rounded-xl border border-dashed border-border p-12 text-center">
                    <p className="text-base text-muted-foreground">
                        No tasks match your current filters.
                    </p>
                </div>
            )}

            <ConfirmDialog
                open={deleteId !== null}
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteId(null)}
                confirmLabel="Delete"
                destructive
            />
        </>
    );
}
