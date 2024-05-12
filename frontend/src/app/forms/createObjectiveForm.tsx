"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const termSelectLogic = () => {
  const [apiTerm, setTerm] = useState("short_term");

  const handleTermSelection = (event: any) => {
    console.log(event.target.value);
    setTerm(event.target.value);
  };
  return { apiTerm, handleTermSelection };
};

const nameFieldLogic = () => {
  const [apiName, setName] = useState("");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  return { apiName, handleNameChange };
};

const impactFieldLogic = () => {
  const [apiImpact, setImpact] = useState("");

  const handleImpactChange = (event: any) => {
    setImpact(event.target.value);
  };
  return { apiImpact, handleImpactChange };
};

const dateFieldLogic = () => {
  const [apiDateofCompletion, setDateofCompletion] = useState("");

  const handleDateofCompletionChange = (event: any) => {
    setDateofCompletion(event.target.value);
  };

  return { apiDateofCompletion, handleDateofCompletionChange };
};

export default function CreateObjectiveForm(props: {
  isVisible: boolean;
  changeVisibility: VoidFunction;
}) {
  const { apiTerm, handleTermSelection } = termSelectLogic();
  const { apiName, handleNameChange } = nameFieldLogic();
  const { apiImpact, handleImpactChange } = impactFieldLogic();
  const { apiDateofCompletion, handleDateofCompletionChange } =
    dateFieldLogic();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = {
      term: apiTerm,
      name: apiName,
      impact: apiImpact,
      projected: apiDateofCompletion,
    };

    axios
      .post("http://127.0.0.1:8000/objectives/create/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Objective : POST Request Made");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mockSubmit = (event: any) => {
    event.preventDefault();

    const formData = {
      term: apiTerm,
      name: apiName,
      impact: apiImpact,
      projected: apiDateofCompletion,
    };

    console.log(formData);
    console.log("Objective: Submitted Mock Form");
  };

  return (
    <>
      <div className="absolute h-full w-full top-0 left-0 flex flex-col inset-0 bg-black">
        <div className="p-2 flex justify-between border border-red-300">
          <h2 className="bg-blue-500">Register New Objective</h2>
          <button
            onClick={props.changeVisibility}
            className="px-1 py-1 flex items-center justify-center bg-red-500"
          >
            X
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          method=""
          className="w-full h-full p-4 flex flex-col border border-brown-900"
        >
          <label>
            Term:
            <select
              name=""
              value={apiTerm}
              onChange={handleTermSelection}
              className="text-black"
            >
              <option value="short_term">Short Term</option>
              <option value="long_term">Long Term</option>
            </select>
          </label>
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
            Impact:
            <textarea
              name="description"
              value={apiImpact}
              onChange={handleImpactChange}
              rows={5}
              className="w-full h-40  text-black"
            />
          </label>
          <label>
            Projected Date of Completion:
            <input
              type="date"
              value={apiDateofCompletion}
              onChange={handleDateofCompletionChange}
              className="text-black"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
