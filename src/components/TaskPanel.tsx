import { useState, useEffect } from "react";

interface TaskPanelProps {
  date: string | null;
}

export default function TaskPanel({ date }: TaskPanelProps) {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (date) {
      const saved = JSON.parse(localStorage.getItem(date) || "[]") as string[];
      setTasks(saved);
    }
  }, [date]);

  const addTask = () => {
    if (!date || !input.trim()) return;

    const updated = [...tasks, input];
    setTasks(updated);
    localStorage.setItem(date, JSON.stringify(updated));
    setInput("");
  };

  const removeTask = (i: number) => {
    if (!date) return;

    const updated = tasks.filter((_, idx) => idx !== i);
    setTasks(updated);
    localStorage.setItem(date, JSON.stringify(updated));
  };

  if (!date) return <div className="tasks-panel">Select a day</div>;

  return (
    <div className="tasks-panel">
      <h2>{date}</h2>

      <ul>
        {tasks.map((t, i) => (
          <li key={i} onClick={() => removeTask(i)}>
            {t}
          </li>
        ))}
      </ul>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task..."
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}
