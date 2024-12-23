import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
})
export class WordComponent {
  @Input() word: string = '';
  @Input() classes: string = ''; // Default to text-xl
  isHighlighted = false;
  constructor(private cdr: ChangeDetectorRef) {}
  speakWord() {
    this.isHighlighted = true;
    const utterance = new SpeechSynthesisUtterance(this.word);
    utterance.lang = 'es-US';
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      this.isHighlighted = false;
      this.cdr.detectChanges();
    };
  }
}
