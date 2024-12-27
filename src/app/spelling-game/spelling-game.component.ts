import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words-list/words.service';
import { Word } from '../../data/spanish/wordListMap';

@Component({
  selector: 'app-spelling-game',
  imports: [],
  templateUrl: './spelling-game.component.html',
  styleUrl: './spelling-game.component.css',
})
export class SpellingGameComponent implements OnInit {
  targetWord: string = '';
  targetEmoji: string = '';
  currentInput: string = '';
  availableLetters: string[] = [];
  feedback: string = '';
  constructor(private wordService: WordsService) {}

  setLetters() {
    const letters = new Set<string>(this.targetWord.split(''));
    const availableLetters = this.wordService.getAvailableLetters();
    while (letters.size < 9) {
      const randomLetter =
        availableLetters[Math.floor(Math.random() * availableLetters.length)];
      letters.add(randomLetter);
    }

    this.availableLetters = Array.from(letters).sort(() => Math.random() - 0.5);
  }

  async loadNewWord() {
    const wordObject: Word = await this.wordService.getRandomWord();
    this.targetWord = wordObject.word;
    this.targetEmoji = wordObject.emoji;
    this.setLetters();
    this.currentInput = '';
    this.feedback = '';
  }

  addLetter(letter: string) {
    this.currentInput += letter;
    this.checkIfCorrect();
  }

  checkIfCorrect() {
    if (this.currentInput === this.targetWord) {
      this.feedback = 'correct';
    } else if (
      this.currentInput.length > 0 &&
      !this.targetWord.startsWith(this.currentInput)
    ) {
      this.feedback = 'incorrect';
    } else {
      this.feedback = '';
    }
  }

  utterTargetWord() {
    const utterance = new SpeechSynthesisUtterance(this.targetWord);
    utterance.lang = 'es-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  resetInput() {
    this.currentInput = '';
    this.feedback = '';
  }

  async ngOnInit(): Promise<void> {
    this.loadNewWord();
  }
}
