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
  isGameHighlighted = false;
  isVoiceInputHighlighted = false;

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

  navigateToGame() {
    if (!this.isGameHighlighted) {
      this.isGameHighlighted = true;
      const utterance = new SpeechSynthesisUtterance('Juego de deletreo');
      utterance.lang = 'es-US';
      window.speechSynthesis.speak(utterance);
      setTimeout(() => {
        this.isGameHighlighted = false;
      }, 5000);
    } else {
      this.router.navigate(['/game']);
    }
  }

  navigateToVoiceInput() {
    if (!this.isVoiceInputHighlighted) {
      this.isVoiceInputHighlighted = true;
      const utterance = new SpeechSynthesisUtterance('Entrada de Voz');
      utterance.lang = 'es-US';
      window.speechSynthesis.speak(utterance);
      setTimeout(() => {
        this.isVoiceInputHighlighted = false;
      }, 5000);
    } else {
      this.router.navigate(['/voice']);
    }
  }
}
