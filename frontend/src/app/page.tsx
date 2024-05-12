import Habits from "./components/habits";
import Objectives from "./components/objectives";
import Settings from "./components/settings";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full px-28 border border-yellow-400">
      <header className="h-36 w-full flex flex-col justify-center items-center border border-red-500">
        <h1>Habit Tracker</h1>
        <h2>Today is [Insert Date Here]</h2>
      </header>
      <main className="relative flex h-full w-full">
        <div className="flex flex-col w-1/4 h-full border border-blue-500">
          <Objectives></Objectives>
        </div>
        <div className="flex flex-col w-1/2 h-full border border-purple-500">
          <h3>Calendar</h3>
        </div>
        <div className="flex flex-col w-1/4 h-full border border-red-500">
          <Habits></Habits>
        </div>
      </main>
    </div>
  );
}
