import Image from "next/image";
import DashBoardLayout from "./dashboard/layout";
import Habits from "./components/habits";
import Objectives from "./components/objectives";
import Settings from "./components/settings";
import CreateHabitForm from "./forms/CreateHabitForm";
import CreateObjectiveForm from "./forms/CreateObjectiveForm";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full px-28 border border-yellow-400">
      <header className="h-36 w-full border border-red-500">
        <h1>Welcome Back [INSERT NAME]</h1>
        <h2>Today's date is [INSERT DATE]</h2>
      </header>
      <main className="relative h-full w-full p-8 border border-blue-500">
        <Settings></Settings>
        <div className="flex h-full w-full">
          <div className="flex flex-col w-1/2 justify-evenly">
            <h3>Calendar</h3>
            <Objectives></Objectives>
          </div>
          <div className="flex flex-col w-1/2 justify-evenly">
            <Habits></Habits>
          </div>
        </div>
      </main>
    </div>
  );
}
