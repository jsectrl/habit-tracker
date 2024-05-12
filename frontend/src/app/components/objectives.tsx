"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Objective } from "../utils/interfaces";
import CreateObjectiveForm from "../forms/createObjectiveForm";

function ObjectiveList({ objectives }: { objectives: Objective[] }) {
  return (
    <>
      <div className="p-2 border border-blue-300">
        <ul className="space-y-4">
          {objectives.map((objective: Objective, index: number) => (
            <li key={index} className="border border-blue-100">
              <Link href={`/objective/${objective.slug}}`}>
                {objective.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const handleObjectiveFormVisibility = () => {
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

export default function Objectives() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const { isVisible, changeVisibility } = handleObjectiveFormVisibility();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/objectives/")
      .then((response) => {
        setObjectives(response.data.objectives);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <>
        <div className="relative h-full w-full">
          {isVisible && (
            <CreateObjectiveForm
              isVisible={isVisible}
              changeVisibility={changeVisibility}
            />
          )}
          {!isVisible && (
            <div className="absolute h-full w-full top-0 left-0 flex flex-col z-1">
              <div className="flex justify-between p-2 border border-blue-300">
                <h2 className="bg-blue-500">Objectives:</h2>
                <button
                  onClick={changeVisibility}
                  className="px-1 py-1 flex items-center justify-center bg-blue-500"
                >
                  +
                </button>
              </div>
              <ObjectiveList objectives={objectives} />
            </div>
          )}
        </div>
      </>
    </>
  );
}
