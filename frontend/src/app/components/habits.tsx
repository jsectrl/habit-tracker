interface Habit {
  id: number;
  name: string;
  description: string;
  created: string;
  objective: number;
  days: number[];
  pomodoros: number;
}

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/habits/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

function DailyHabits(habits: Habit[]) {
  return (
    <div className="border border-yellow-500">
      <ul>
        {habits.map((habit: Habit, index: number) => (
          <li key={index}> {habit.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function Habits() {
  const data = await getData();
  const habits = DailyHabits(data.habits);
  return habits;
}
