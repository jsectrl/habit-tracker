"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Habit } from "@/app/utils/interfaces";
import Timer from "../timer";

const initializeHabit = (): Habit => ({
  id: 0,
  name: "",
  description: "",
  pomodoros: 0,
  days: [],
  created: "",
  objective: 0,
  slug: "",
});

export default function Page({ params }: { params: { slug: string } }) {
  const [habit, setHabit] = useState<Habit>(initializeHabit);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/habits/${params.slug}`)
      .then((response) => {
        console.log(response.data);
        setHabit(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <main className="h-full w-full flex flex-col justify-between px-60">
        <div>
          <p>
            No time to lose focus. Get a step closer to your objective by
            practicing your habit for the whole duration.
          </p>
          <p>{habit.description}</p>
        </div>

        <Timer pomodoros={habit.pomodoros}></Timer>
      </main>
    </>
  );
}
