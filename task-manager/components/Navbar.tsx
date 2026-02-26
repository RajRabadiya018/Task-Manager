"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme, toggleSidebar } = useTheme();

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-14">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 sm:hidden"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </Button>

                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
                            <span className="text-sm font-bold text-background">TM</span>
                        </div>
                        <span className="text-xl font-semibold tracking-tight">
                            Task Manager
                        </span>
                    </Link>
                </div>

                <div className="hidden items-center gap-1.5 sm:flex">
                    <Link
                        href="/"
                        className={`rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors ${isActive("/") && !isActive("/tasks") && !isActive("/create")
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/tasks"
                        className={`rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors ${isActive("/tasks")
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                    >
                        Tasks
                    </Link>

                    <Link
                        href="/create"
                        className={`rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors ${isActive("/create")
                            ? "bg-foreground text-background"
                            : "bg-foreground/90 text-background hover:bg-foreground"
                            }`}
                    >
                        + Create Task
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </Button>

                    <div className="flex items-center gap-1 sm:hidden">
                        <Link
                            href="/"
                            className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${isActive("/") && !isActive("/tasks") && !isActive("/create")
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/tasks"
                            className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${isActive("/tasks")
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                                }`}
                        >
                            Tasks
                        </Link>
                        <Link
                            href="/create"
                            className="rounded-md bg-foreground/90 px-2.5 py-1.5 text-sm font-medium text-background"
                        >
                            +New
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
