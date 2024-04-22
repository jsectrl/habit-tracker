"use client";
import { use, useState } from "react";

export default function CreateHabitForm(props: {
  isVisible: boolean;
  changeVisibility: VoidFunction;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleDaySelect = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      if (!selectedDays.includes(value)) {
        setSelectedDays(selectedDays.concat(value));
      }
    } else {
      if (selectedDays.includes(value)) {
        setSelectedDays(selectedDays.filter((item) => item !== value));
      }
      console.log(selectedDays);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Submitted data:", {
      name,
      description,
      selectedDays,
    });
    try {
      const response = await fetch("http://127.0.0.1:8000/habits/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "hello",
          description: description,
          days: selectedDays,
        }), // Convert form data to JSON string
      });
      // You can perform further actions with the form data here, such as submitting it to a server
      setName("");
      setDescription("");
      setSelectedDays([]);
    } catch {}
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      {props.isVisible && (
        <div className="absolute flex flex-col h-full w-full inset-0 bg-black">
          <button onClick={props.changeVisibility}>Close</button>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border border-brown-900"
          >
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="text-black"
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                className="text-black"
              />
            </label>
            {days.map((day, index) => (
              <div key={index}>
                <label>{day}:</label>
                <input
                  type="checkbox"
                  value={day}
                  onChange={handleDaySelect}
                  checked={selectedDays.includes(day)}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
