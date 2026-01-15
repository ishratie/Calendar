import { useState } from "react";
import Calendar from "./components/Calendar";
import TaskPanel from "./components/TaskPanel";

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="app">
      <Calendar onSelectDate={setSelectedDate} />
      <TaskPanel date={selectedDate} />
    </div>
  );
}
