export type ChoiceOption<V extends string = string> = {
  value: V;
  label: string;
};

export const roofCoveringOptions = [
  { value: "eternit", label: "Eternit" },
  { value: "blacha", label: "Blacha" },
  { value: "dachowka", label: "Dachówka" },
  { value: "inne", label: "Inne" },
  { value: "nie_wiem", label: "Nie wiem" },
] as const satisfies readonly ChoiceOption[];

export const buildingTypeOptions = [
  { value: "dom_jednorodzinny", label: "Dom jednorodzinny" },
  { value: "budynek_gospodarczy", label: "Budynek gospodarczy" },
  { value: "budynek_rolniczy", label: "Stodoła lub budynek rolniczy" },
  { value: "inny", label: "Inny" },
] as const satisfies readonly ChoiceOption[];

export const timelineOptions = [
  { value: "asap", label: "Jak najszybciej" },
  { value: "three_months", label: "W ciągu 3 miesięcy" },
  { value: "this_year", label: "W tym roku" },
  { value: "exploring", label: "Na razie sprawdzam możliwości" },
] as const satisfies readonly ChoiceOption[];

export type RoofCovering = (typeof roofCoveringOptions)[number]["value"];
export type BuildingType = (typeof buildingTypeOptions)[number]["value"];
export type Timeline = (typeof timelineOptions)[number]["value"];

export const qualificationQuestions = {
  roofCovering: {
    question: "Jakie pokrycie znajduje się obecnie na dachu?",
    helper: "Jeśli nie masz pewności, wybierz „Nie wiem”.",
  },
  buildingType: { question: "Jaki to budynek?" },
  timeline: { question: "Kiedy planujesz wymianę dachu?" },
} as const;
