import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  activeRoute: string | null = null;
  isGameHighlighted = false;
  isVoiceInputHighlighted = false;
  isAlphabetHighlighted = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToAlphabet() {
    if (!this.isAlphabetHighlighted) {
      this.isAlphabetHighlighted = true;
      const utterance = new SpeechSynthesisUtterance('Alfabeto');
      utterance.lang = 'es-US';
      window.speechSynthesis.speak(utterance);
      setTimeout(() => {
        this.isAlphabetHighlighted = false;
      }, 5000);
    } else {
      this.router.navigate(['/']);
    }
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

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute =
          this.route.snapshot.firstChild?.routeConfig?.path ?? '';
      });
  }
}
