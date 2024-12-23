import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent implements OnInit {
  headerText = '¡Bienvenide a Beto!';
  introductionText = '¡Comencemos a aprender juntos!';
  words: string[] = [];
  highlightedWord: number | null = null;
  isAnimationDone = false;
  continueHighlighted = false;
  hasAnimationStarted = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.words = this.headerText.split(' ');
  }

  animateHeader() {
    let index = 0;
    const readWord = () => {
      if (index < this.words.length) {
        this.highlightedWord = index;
        this.cdr.detectChanges();
        const utterance = new SpeechSynthesisUtterance(this.words[index]);
        utterance.lang = 'es-US';
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => {
          setTimeout(() => {
            index++;
            readWord();
          }, 200);
        };
      } else {
        this.highlightedWord = null;
        this.continueHighlighted = true;
        this.cdr.detectChanges();
      }
    };
    this.highlightedWord = 0;
    this.cdr.detectChanges();
    readWord();
  }

  continue() {
    if (!this.hasAnimationStarted) {
      this.animateHeader();
      this.hasAnimationStarted = true;
      this.continueHighlighted = true;
    } else if (this.continueHighlighted) {
      localStorage.setItem('onboardingComplete', 'true');
      this.router.navigate(['/']);
    }
  }
}
