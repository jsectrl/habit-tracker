"use client";
import { useState } from "react";

export default function CreateObjectiveForm(props: {
  isVisible: boolean;
  changeVisibility: VoidFunction;
}) {
  return (
    <>
      {props.isVisible && (
        <div className="absolute h-full w-full inset-0 bg-pink-500">
          Hello from Objective
          <button onClick={props.changeVisibility}>close</button>
        </div>
      )}
    </>
  );
}
