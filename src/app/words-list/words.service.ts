import { Injectable } from '@angular/core';
import { WordList, wordListMap } from '../../data/spanish/wordListMap';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  currentLanguage: string = 'spanish';

  async getWordsForLetter(letter: string): Promise<WordList> {
    try {
      const module = await wordListMap[this.currentLanguage][letter]();
      return module.words;
    } catch (error) {
      console.error(`Error loading words for ${letter}:`, error);
      return [];
    }
  }
}
