const SINGLE_LETTER_WORD = /(?<=^|\s)([aiouwz])\s+/gi;

/** Keeps Polish one-letter words (w, z, i, a, o, u) from ending a line. */
export function bindShortWords(text: string) {
  return text.replace(SINGLE_LETTER_WORD, "$1 ");
}
