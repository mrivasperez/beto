export type Letter = {
  value: string;
  index: number;
  data: {
    words: {
      word: string;
      sentence: string;
    }[];
  };
  mp3: any;
};
