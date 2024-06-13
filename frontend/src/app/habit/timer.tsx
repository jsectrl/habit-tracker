import { useState, useEffect } from "react";

export default function Timer({ pomodoros }: { pomodoros: number }) {
  const activeDuration = 5; // 25 * 60;
  const restDuration = 3; // 10 * 60;

  const [mode, setMode] = useState(true); // isActive
  const [completed, setCompleted] = useState(0);
  const [seconds, setSeconds] = useState(activeDuration);
  const [isRunning, setRunning] = useState(false);

  const [tomatos, setTomatos] = useState(<></>);
  const [tomatoColors, setTomatoColors] = useState<String[]>(
    Array.from({ length: pomodoros }, () => "bg-red-500")
  );

  useEffect(() => {
    const updateColor = (index: number, newColor: string) => {
      // Create a new array with updated item
      const updatedItems = [...tomatoColors];
      updatedItems[index] = newColor;

      // Update state with the new array
      setTomatoColors(updatedItems);
    };
    let countdown: any;
    if (isRunning) {
      countdown = setInterval(() => {
        setSeconds((prevTime) => {
          if (prevTime <= 0) {
            if (mode) {
              if (completed < pomodoros - 1) {
                setMode(false);
                setSeconds(restDuration);
                updateColor(completed, "bg-blue-500");
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

  useEffect(() => {
    const divArray = Array.from({ length: pomodoros }, (_, index) => index);
    setTomatos(
      <>
        {divArray.map((number) => (
          <div className="p-2">
            <div
              key={number}
              className={`h-12 w-12 rounded-full ${tomatoColors[number]}`}
            ></div>
          </div>
        ))}
      </>
    );
  }, [tomatoColors, tomatos]);

  const toggleCountdown = () => {
    setRunning((isRunning) => !isRunning);
  };

  const padNumber = (num: number) => {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const tomatoGenerator = (num: number) => {
    const divArray = Array.from({ length: num }, (_, index) => index + 1);
    return (
      <>
        {divArray.map((number) => (
          <div className="p-2">
            <div
              key={number}
              className="h-12 w-12 rounded-full bg-red-500"
            ></div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col  border border-green-500">
        <div className="flex justify-center">{tomatos}</div>
        <div className="flex justify-center">
          <div className="text-8xl font-bold">
            {padNumber(Math.floor((seconds % (60 * 60)) / 60))}
          </div>
          <div className="text-8xl font-bold">:</div>
          <div className="text-8xl font-bold">{padNumber(seconds % 60)}</div>
        </div>
        <button onClick={toggleCountdown}>
          {isRunning ? "Pause Timer" : "Start Timer"}
        </button>
      </div>
      {pomodoros}
    </>
  );
}
