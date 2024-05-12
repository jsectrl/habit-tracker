export interface Habit {
  id: number;
  name: string;
  description: string;
  created: string;
  objective: number;
  days: number[];
  pomodoros: number;
  slug: string;
}

export interface Objective {
  id: number;
  term: string;
  name: string;
  impact: string;
  created: string;
  projected: string;
  time_spent: string;
  slug: string;
}

export interface Day {
  id: string;
  name: string;
}
