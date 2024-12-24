export interface Word {
  word: string;
  emoji: string;
}

export type WordList = Word[];

export interface LanguageMap {
  [key: string]: {
    [key: string]: () => Promise<{ words: WordList }>;
  };
}

export const wordListMap: LanguageMap = {
  spanish: {
    a: () => import('./words/a'),
    b: () => import('./words/b'),
    c: () => import('./words/c'),
    d: () => import('./words/d'),
    e: () => import('./words/e'),
    f: () => import('./words/f'),
    g: () => import('./words/g'),
    h: () => import('./words/h'),
    i: () => import('./words/i'),
    // TODO
    // j: () => import('./words/j'),
    // k: () => import('./words/k'),
    // l: () => import('./words/l'),
    // m: () => import('./words/m'),
    // n: () => import('./words/n'),
    // ñ: () => import('./words/ñ'),
    // o: () => import('./words/o'),
    // p: () => import('./words/p'),
    // q: () => import('./words/q'),
    // r: () => import('./words/r'),
    // s: () => import('./words/s'),
    // t: () => import('./words/t'),
    // u: () => import('./words/u'),
    // v: () => import('./words/v'),
    // w: () => import('./words/w'),
    // x: () => import('./words/x'),
    // y: () => import('./words/y'),
    // z: () => import('./words/z'),
  },
};
