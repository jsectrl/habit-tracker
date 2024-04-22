interface Objective {
  id: number;
  term: string;
  name: string;
  impact: string;
  created: string;
  projected: string;
  time_spent: string;
}

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/objectives/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

function ObjectiveList(objectives: Objective[]) {
  return (
    <div className="border border-purple-500">
      <ul>
        {objectives.map((objective: Objective, index: number) => (
          <li key={index}> {objective.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function Objectives() {
  const data = await getData();
  const objectives = ObjectiveList(data.objectives);
  return objectives;
}
