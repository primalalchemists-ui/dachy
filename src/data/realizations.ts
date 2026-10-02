import manifest from "../../content/realizations.json";

export type RealizationPhoto = {
  src: string;
  alt: string;
};

export type Realization = {
  id: string;
  before: RealizationPhoto;
  after: RealizationPhoto;
};

/**
 * Pairs from content/realizations.json shown on the landing, in display order.
 * Pairs 1–6 are kept in the assets but not published (edited rather than separate photos).
 */
const LANDING_REALIZATION_IDS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export const realizations: Realization[] = LANDING_REALIZATION_IDS.map((id) => {
  const pair = manifest.find((entry) => entry.id === id);
  if (!pair) throw new Error(`Realization ${id} is missing from content/realizations.json`);

  return {
    id: `realizacja-${id}`,
    before: { src: pair.before, alt: `Dach przed wymianą pokrycia – realizacja ${id}` },
    after: { src: pair.after, alt: `Dach po wymianie pokrycia – realizacja ${id}` },
  };
});
