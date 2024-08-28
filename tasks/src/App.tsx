import React from 'react';
import CheckBoxTile from './components/CheckboxTile';
import { useTaskContext } from './context/TaskContext';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const { tasks, addTask, removeTask, toggleTaskCompletion, completedCount, uncompletedCount } = useTaskContext();

  const [input, setInput] = React.useState<string>("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input) return;
    addTask({
      id: Date.now(), // Use a unique identifier
      name: input,
      completed: false,
    },);
    setInput("");
  }

  function onRemove(id: number) {
    removeTask(id);
  }

  function onCheckboxChange(id: number) {
    toggleTaskCompletion(id)
  }


  return (
    <div className="flex justify-center min-h-screen">

      <div className="flex-col flex items-center mt-12">
        <h3 className="text-2xl font-bold my-4">Tasks App</h3>
        <div>
          {completedCount} completed, {uncompletedCount} uncompleted
        </div>
        <form onSubmit={onSubmit} className="w-96">
          <input
            type="text"
            value={input}
            placeholder="Add a task"
            className="shadow-md p-2 w-96 my-2"
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        {
          tasks.map((task, index) => (
            <CheckBoxTile
              key={task.id}
              label={task.name}
              onRemove={() => onRemove(task.id)}
              checked={task.completed}
              onCheckboxChange={() => onCheckboxChange(task.id)}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;

