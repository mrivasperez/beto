import { Component } from '@angular/core';
import { alphabet } from '../alphabet';

@Component({
  selector: 'app-alphabet-grid',
  imports: [],
  templateUrl: './alphabet-grid.component.html',
  styleUrl: './alphabet-grid.component.css'
})
export class AlphabetGridComponent {
  alphabet = alphabet;
  selectedLetter: string | null = null;

  onLetterClick(letter: string) {
    this.selectedLetter = letter;
    let textToSpeak = letter;
    if (letter === 'y') {
      textToSpeak = "i griega"
    }
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-US'
    window.speechSynthesis.speak(utterance);
  }
}
