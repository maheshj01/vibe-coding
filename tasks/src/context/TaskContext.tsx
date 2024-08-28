import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of a Task
export interface Task {
    id: number;
    name: string;
    completed: boolean;
}

// Define the structure of the TaskContext value
interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (id: number) => void;
    toggleTaskCompletion: (id: number) => void;
    completedCount: number;
    uncompletedCount: number;
}

// Create the TaskContext with an initial value of undefined
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook to use the TaskContext
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks((prev) => [...prev, task]);
    };

    const removeTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const completedCount = tasks.filter((task) => task.completed).length;
    const uncompletedCount = tasks.length - completedCount;

    const value: TaskContextType = {
        tasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        completedCount,
        uncompletedCount,
    };

    return (
        <TaskContext.Provider value={value} > {children} </TaskContext.Provider>
    );
};