"use client";
import { useState } from "react";
import CreateHabitForm from "../forms/CreateHabitForm";
import CreateObjectiveForm from "../forms/CreateObjectiveForm";

export default function Settings() {
  const [isHabitFormVisible, setHabitFormVisibility] = useState(false);
  const changeHabitFormVisibility = () => {
    console.log("here");
    if (isHabitFormVisible) {
      setHabitFormVisibility(false);
    } else {
      setHabitFormVisibility(true);
    }
  };

  const [isObjectiveFormVisible, setObjectiveFormVisibility] = useState(false);
  const changeObjectiveFormVisibility = () => {
    console.log("here");
    if (isObjectiveFormVisible) {
      setObjectiveFormVisibility(false);
    } else {
      setObjectiveFormVisibility(true);
    }
  };
  return (
    <>
      <div className="border border-pink-500">
        <button id="create-habit" onClick={changeHabitFormVisibility}>
          {" "}
          Create New Habit
        </button>
        <button id="create-objective" onClick={changeObjectiveFormVisibility}>
          {" "}
          Create New Objective
        </button>
      </div>
      <CreateHabitForm
        isVisible={isHabitFormVisible}
        changeVisibility={changeHabitFormVisibility}
      />
      <CreateObjectiveForm
        isVisible={isObjectiveFormVisible}
        changeVisibility={changeObjectiveFormVisibility}
      />
    </>
  );
}
