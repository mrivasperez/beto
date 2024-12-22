import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { alphabet } from './alphabet';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'beto';
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
