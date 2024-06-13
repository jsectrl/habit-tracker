import Header from "./components/header";
import Footer from "./components/footer";

import Habits from "./components/habits";
import Objectives from "./components/objectives";

export default function Home() {
  return (
    <>
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
    </>
  );
}
