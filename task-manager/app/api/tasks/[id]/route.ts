import { deleteTask, getTaskById, updateTask } from "@/lib/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const task = getTaskById(id);

    if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updated = updateTask(id, body);

        if (!updated) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const deleted = deleteTask(id);

    if (!deleted) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted" });
}
