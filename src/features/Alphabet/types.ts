export interface Letter {
  value: string;
  index: number;
  data: {
    words: {
      word: string;
      sentence: string;
    }[];
  };
}
