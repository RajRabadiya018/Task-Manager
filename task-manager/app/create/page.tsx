"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTaskForm } from "@/hooks/useTaskForm";
import { AppDispatch } from "@/store";
import { createTask } from "@/store/taskSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateTaskPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const { values, handleChange, handleSubmit, errors, reset } = useTaskForm();

    const onSubmit = async (formValues: typeof values) => {
        setSubmitting(true);
        try {
            await dispatch(
                createTask({
                    title: formValues.title.trim(),
                    description: formValues.description.trim(),
                    priority: formValues.priority,
                    status: formValues.status,
                    dueDate: formValues.dueDate,
                    tags: formValues.tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    assignedTo: formValues.assignedTo.trim(),
                })
            ).unwrap();

            router.push("/tasks");
        } catch {
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">

            <Link
                href="/tasks"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Tasks
            </Link>

            <div>
                <h1 className="text-2xl font-bold tracking-tight">Create New Task</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Fill in the details below to create a new task.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
                <div className="space-y-5">

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={values.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Enter task title"
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                            <p className="text-xs text-red-400">{errors.title}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={values.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Describe the task in detail..."
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <select
                                id="priority"
                                value={values.priority}
                                onChange={(e) => handleChange("priority", e.target.value)}
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={values.status}
                                onChange={(e) => handleChange("status", e.target.value)}
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="todo">Todo</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date *</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={values.dueDate}
                                onChange={(e) => handleChange("dueDate", e.target.value)}
                                className={errors.dueDate ? "border-red-500" : ""}
                            />
                            {errors.dueDate && (
                                <p className="text-xs text-red-400">{errors.dueDate}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="assignedTo">Assigned To</Label>
                            <Input
                                id="assignedTo"
                                value={values.assignedTo}
                                onChange={(e) => handleChange("assignedTo", e.target.value)}
                                placeholder="e.g., Raj"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            value={values.tags}
                            onChange={(e) => handleChange("tags", e.target.value)}
                            placeholder="Comma-separated, e.g., bug, frontend, urgent"
                        />
                        <p className="text-[11px] text-muted-foreground">
                            Separate tags with commas
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={reset}
                            disabled={submitting}
                        >
                            Reset
                        </Button>
                        <Link href="/tasks">
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            onClick={() => handleSubmit(onSubmit)}
                            disabled={submitting}
                        >
                            {submitting ? "Creating..." : "Create Task"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
