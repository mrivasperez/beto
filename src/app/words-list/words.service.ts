import { Injectable } from '@angular/core';
import { Word, WordList, wordListMap } from '../../data/spanish/wordListMap';
import { alphabet } from '../../data/spanish/alphabet';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  currentLanguage: string = 'spanish';

  getAvailableLetters(): string[] {
    return alphabet;
  }

  async getRandomWord(): Promise<Word> {
    const letters = this.getAvailableLetters();
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const module = await wordListMap['spanish'][randomLetter]();
    const words = module.words;
    return words[Math.floor(Math.random() * words.length)];
  }

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
