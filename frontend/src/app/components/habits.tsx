"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Habit } from "../utils/interfaces";
import CreateHabitForm from "../forms/createHabitForm";

function DailyHabits({ habits }: { habits: Habit[] }) {
  return (
    <>
      <ul>
        <div className="p-2 border border-red-300">
          {habits.map((habit: Habit, index: number) => (
            <li key={index} className="border border-red-100">
              <Link href={`/habit/${habit.slug}`}>{habit.name}</Link>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
}

const handleHabitFormVisibility = () => {
  const [isVisible, setVisibility] = useState(false);
  const changeVisibility = () => {
    if (isVisible) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };
  return { isVisible, changeVisibility };
};

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { isVisible, changeVisibility } = handleHabitFormVisibility();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/habits/")
      .then((response) => {
        setHabits(response.data.habits);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="relative h-full w-full">
        {isVisible && (
          <CreateHabitForm
            isVisible={isVisible}
            changeVisibility={changeVisibility}
          />
        )}
        {!isVisible && (
          <div className="absolute h-full w-full top-0 left-0 flex flex-col z-1">
            <div className="p-2 flex justify-between border border-red-300">
              <h2 className="bg-red-500">Habits:</h2>
              <button
                onClick={changeVisibility}
                className="px-1 py-1 flex items-center justify-center bg-red-500"
              >
                +
              </button>
            </div>
            <DailyHabits habits={habits} />
          </div>
        )}
      </div>
    </>
  );
}
