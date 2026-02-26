"use client"; 

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";


interface ThemeContextValue {
    theme: "light" | "dark";
    toggleTheme: () => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    compactView: boolean;
    toggleCompactView: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);


export function ThemeProvider({ children }: { children: ReactNode }) {
    
    const [theme, setTheme] = useState<"light" | "dark">("dark");
   
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const [compactView, setCompactView] = useState<boolean>(false);

    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
     
        localStorage.setItem("theme", theme);
    }, [theme]);

   
    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

  
    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

 
    const toggleCompactView = useCallback(() => {
        setCompactView((prev) => !prev);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                sidebarOpen,
                toggleSidebar,
                compactView,
                toggleCompactView,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}


export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
