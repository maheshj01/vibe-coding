// src/hooks/useTasks.ts

import { useState } from 'react';
import { Task } from '../context/TaskContext';

export const useTasks = () => {
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
    const uncompletedCount = tasks.filter((task) => !task.completed).length;

    return {
        tasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        completedCount,
        uncompletedCount,
    };
};