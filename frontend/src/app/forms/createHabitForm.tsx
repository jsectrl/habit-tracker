"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const nameFieldLogic = () => {
  const [apiName, setName] = useState("");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  return { apiName, handleNameChange };
};

const descriptionFieldLogic = () => {
  const [apiDescription, setDescription] = useState("");

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };
  return { apiDescription, handleDescriptionChange };
};

/**
 * Selects the objective to attach the Habit to. Sets the selectedObjective variable to the Objective's ID.
 * @returns
 */
const objectiveSelectLogic = () => {
  const [selectedObjective, setSelectedObjective] = useState("");

  const handleObjectiveSelect = (event: any) => {
    setSelectedObjective(event.target.value);
  };
  return { selectedObjective, handleObjectiveSelect };
};

/**
 * Selects the days in which the habit will be performed. Sets the selectedDays variable to the days ids.
 * @returns
 */
const daySelectLogic = () => {
  const [selectedDays, setSelectedDays] = useState<any[]>([]);
  const handleDaySelect = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => parseInt(option.value)
    );
    setSelectedDays(selectedValues);
  };
  return { selectedDays, handleDaySelect };
};

const pomodoroFieldLogic = () => {
  const [apiPomodoros, setPomodoros] = useState(0);
  const handlePomodoroChange = (event: any) => {
    setPomodoros(event.target.value);
  };
  return { apiPomodoros, handlePomodoroChange };
};

export default function CreateHabitForm(props: {
  isVisible: boolean;
  changeVisibility: VoidFunction;
}) {
  // Form Fields
  const { apiName, handleNameChange } = nameFieldLogic();
  const { apiDescription, handleDescriptionChange } = descriptionFieldLogic();
  const { selectedObjective, handleObjectiveSelect } = objectiveSelectLogic();
  const { selectedDays, handleDaySelect } = daySelectLogic();
  const { apiPomodoros, handlePomodoroChange } = pomodoroFieldLogic();
  // Selections
  const [days, setDayOptions] = useState<any[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);

  useEffect(() => {
    // Fetches the objectives and days from the API.
    axios
      .get("http://127.0.0.1:8000/days/")
      .then((response) => {
        setDayOptions(response.data.days);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:8000/objectives/")
      .then((response) => {
        setObjectives(response.data.objectives);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const apiObjective = objectives.find(
      (objective) => objective.name == selectedObjective
    );

    const apiDays = days.filter((day) =>
      selectedDays.includes(parseInt(day.id))
    );

    const formData = {
      name: apiName,
      description: apiDescription,
      objective: apiObjective,
      pomodoros: apiPomodoros,
      days: apiDays,
    };

    console.log(formData);
    axios
      .post("http://127.0.0.1:8000/habits/create/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Habit : POST Request Made");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="absolute h-full w-full top-0 left-0 flex flex-col inset-0 bg-black">
        <div className="p-2 flex justify-between border border-red-300">
          <h2 className="bg-red-500">Register New Habit</h2>
          <button
            onClick={props.changeVisibility}
            className="px-1 py-1 flex items-center justify-center bg-red-500"
          >
            X
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 justify-center border border-red-300"
          method="POST"
        >
          <label>
            Name:
            <input
              type="text"
              name="id_name"
              value={apiName}
              onChange={handleNameChange}
              className="w-full text-black"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={apiDescription}
              onChange={handleDescriptionChange}
              rows={5}
              className="w-full text-black"
            />
          </label>
          <label>
            Objective:
            <select
              name=""
              id=""
              value={selectedObjective}
              onChange={handleObjectiveSelect}
              className="w-full text-black"
            >
              {objectives.map((objective, index) => (
                <option value={objective.name} key={index}>
                  {objective.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Days:
            <select
              multiple
              name=""
              id=""
              value={selectedDays}
              onChange={handleDaySelect}
              className="text-black"
            >
              {days.map((day) => (
                <option value={day.id} key={day.id}>
                  {day.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Pomodoros:
            <input
              type="number"
              name="pomodoros"
              value={apiPomodoros}
              onChange={handlePomodoroChange}
              className="w-full text-black"
              min={1}
              max={10}
              step={1}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
