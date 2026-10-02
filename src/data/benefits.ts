import { Layers, ReceiptText, Wallet, type LucideIcon } from "lucide-react";

export type Benefit = {
  text: string;
  icon: LucideIcon;
};

export const benefits: Benefit[] = [
  { text: "Dobór pokrycia do Twojego dachu", icon: Layers },
  { text: "Jasna wycena przed podjęciem decyzji", icon: ReceiptText },
  { text: "Możliwość finansowania", icon: Wallet },
];
