import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  async getWordsForLetter(
    letter: string
  ): Promise<{ word: string; emoji: string }[]> {
    try {
      const module = await import(`../data/spanish/words/${letter}.ts`);
      return module.words;
    } catch (error) {
      console.error(`Error loading words for ${letter}:`, error);
      return [];
    }
  }
}
