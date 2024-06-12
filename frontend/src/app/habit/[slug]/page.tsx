"use client";

import { Habit } from "@/app/utils/interfaces";
import { useState, useEffect } from "react";
import axios from "axios";

function Timer({ pomodoros }: { pomodoros: number }) {
  const activeDuration = 5; // 25 * 60;
  const restDuration = 3; // 10 * 60;

  const [mode, setMode] = useState(true); // isActive
  const [completed, setCompleted] = useState(0);
  const [seconds, setSeconds] = useState(activeDuration);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    let countdown: any;
    if (isRunning) {
      countdown = setInterval(() => {
        setSeconds((prevTime) => {
          if (prevTime <= 0) {
            if (mode) {
              if (completed < pomodoros - 1) {
                setMode(false);
                setSeconds(restDuration);
                setCompleted(completed + 1);
                return restDuration;
              } else {
                setCompleted(0);
                return activeDuration;
              }
            } else {
              setMode(true);
              return activeDuration;
            }
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [mode, completed, isRunning]);

  const toggleCountdown = () => {
    setRunning((isRunning) => !isRunning);
  };

  return (
    <>
      <h1>Hours: {Math.floor(seconds / (60 * 60))} </h1>
      <h1>Minutes: {Math.floor((seconds % (60 * 60)) / 60)} </h1>
      <h1>Seconds: {seconds % 60}</h1>
      <button onClick={toggleCountdown}>
        {isRunning ? "Pause Timer" : "Start Timer"}
      </button>
      {pomodoros}
    </>
  );
}

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
      <div>My Post: {params.slug}</div>
      <>
        <Timer pomodoros={habit.pomodoros}></Timer>
        {habit.pomodoros}
      </>
    </>
  );
}
