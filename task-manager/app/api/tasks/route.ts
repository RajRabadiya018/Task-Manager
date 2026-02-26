import { addTask, getAllTasks } from "@/lib/tasks";
import { Task } from "@/types/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let tasks = getAllTasks();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");

    if (status && status !== "all") {
        tasks = tasks.filter((task) => task.status === status);
    }

    if (priority && priority !== "all") {
        tasks = tasks.filter((task) => task.priority === priority);
    }
    if (search) {
        const searchLower = search.toLowerCase();
        tasks = tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(searchLower) ||
                task.description.toLowerCase().includes(searchLower)
        );
    }

    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.title || body.title.trim() === "") {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }
        if (!body.dueDate || isNaN(Date.parse(body.dueDate))) {
            return NextResponse.json(
                { error: "A valid due date is required" },
                { status: 400 }
            );
        }
        const newTask: Task = {
            id: crypto.randomUUID(),               
            title: body.title.trim(),
            description: body.description || "",
            priority: body.priority || "medium",
            status: body.status || "todo",          
            dueDate: body.dueDate,
            createdAt: new Date().toISOString(),    
            tags: body.tags || [],
            assignedTo: body.assignedTo || "",
        };

        const created = addTask(newTask);
        return NextResponse.json(created, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}
