import {
  buildingTypeOptions,
  roofCoveringOptions,
  timelineOptions,
  type ChoiceOption,
} from "@/data/qualification";

function labelFrom(options: readonly ChoiceOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export const roofCoveringLabel = (value: string) => labelFrom(roofCoveringOptions, value);
export const buildingTypeLabel = (value: string) => labelFrom(buildingTypeOptions, value);
export const timelineLabel = (value: string) => labelFrom(timelineOptions, value);

export const financingLabel = (interested: boolean) => (interested ? "Tak" : "Nie");
