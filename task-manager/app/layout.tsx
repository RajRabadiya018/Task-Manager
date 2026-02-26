import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import ReduxProvider from "@/store/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager — Full-Stack Task Management System",
  description:
    "A production-level task management system built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Redux Toolkit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <Navbar />
            <main className="mx-auto min-h-[calc(100vh-4.5rem)] max-w-[1400px] px-6 py-8 sm:px-10 lg:px-14">
              {children}
            </main>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
