import { Component } from '@angular/core';
import { alphabet } from '../../data/spanish/alphabet';
import { WordComponent } from '../shared/word/word.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alphabet-grid',
  imports: [WordComponent],
  templateUrl: './alphabet-grid.component.html',
  styleUrl: './alphabet-grid.component.css',
})
export class AlphabetGridComponent {
  alphabet = alphabet;
  selectedLetter: string | null = null;
  currentInput = '';
  placeholder = 'alfabeto';
  pressTimer: any;

  constructor(private router: Router) {}

  onLetterClick(letter: string) {
    this.selectedLetter = letter;
    this.currentInput += letter;
    let textToSpeak = letter;
    if (letter === 'y') {
      textToSpeak = 'i griega';
    }
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  startPressTimer(letter: string) {
    this.pressTimer = setTimeout(() => {
      this.router.navigate(['/words', letter]);
    }, 500);
  }

  endPressTimer() {
    clearTimeout(this.pressTimer);
  }

  onEraseWord() {
    this.currentInput = '';
  }
}
