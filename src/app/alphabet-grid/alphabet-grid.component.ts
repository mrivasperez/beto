import { Component } from '@angular/core';
import { alphabet } from '../alphabet';
import { WordComponent } from '../shared/word/word.component';

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

  onEraseWord() {
    this.currentInput = '';
  }
}
