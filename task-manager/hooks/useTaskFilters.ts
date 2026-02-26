import { RootState } from "@/store";
import { Task } from "@/types/task";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export function useTaskFilters() {

    const allTasks = useSelector((state: RootState) => state.tasks.tasks);
    const filters = useSelector((state: RootState) => state.tasks.filters);

    
    const isFiltered = useMemo(() => {
        return (
            filters.status !== "all" ||
            filters.priority !== "all" ||
            filters.search !== ""
        );
    }, [filters]);

    const filteredTasks = useMemo((): Task[] => {
        return allTasks.filter((task) => {
          
            if (filters.status !== "all" && task.status !== filters.status) {
                return false;
            }
       
            if (filters.priority !== "all" && task.priority !== filters.priority) {
                return false;
            }

          
            if (filters.search.trim() !== "") {
                const searchLower = filters.search.toLowerCase();
                const matchesTitle = task.title.toLowerCase().includes(searchLower);
                const matchesDesc = task.description.toLowerCase().includes(searchLower);
                if (!matchesTitle && !matchesDesc) return false;
            }

            return true; 
        });
    }, [allTasks, filters]);

    return {
        filteredTasks,                
        totalCount: allTasks.length,   
        isFiltered,                    
    };
}
