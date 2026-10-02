import { CalendarDays, FileText, House, Phone, type LucideIcon } from "lucide-react";

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Zostaw kontakt", text: "Oddzwonimy i dopytamy o dach.", icon: Phone },
  { number: "02", title: "Ustalimy termin", text: "Wybierzemy dogodny termin.", icon: CalendarDays },
  { number: "03", title: "Obejrzymy dach", text: "Sprawdzimy pokrycie i zakres prac.", icon: House },
  { number: "04", title: "Dostaniesz wycenę", text: "Decyzja należy do Ciebie.", icon: FileText },
];
