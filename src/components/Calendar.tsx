import { useState } from "react";

interface CalendarProps {
  onSelectDate: (date: string) => void;
}

export default function Calendar({ onSelectDate }: CalendarProps) {
  const [current, setCurrent] = useState<Date>(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset: number) => {
    const newDate = new Date(current);
    newDate.setMonth(month + offset);
    setCurrent(newDate);
  };

  return (
    <div>
      <header className="header">
        <button onClick={() => changeMonth(-1)}>←</button>
        <h1>
          {current.toLocaleString("default", { month: "long" })} {year}
        </h1>
        <button onClick={() => changeMonth(1)}>→</button>
      </header>

      <div className="calendar">
        {[...Array(firstDay)].map((_, i) => (
          <div key={"e" + i}></div>
        ))}

        {[...Array(days)].map((_, i) => (
          <div
            key={i}
            className="day"
            onClick={() =>
              onSelectDate(`${year}-${month + 1}-${i + 1}`)
            }
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
