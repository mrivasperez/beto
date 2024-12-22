import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent implements OnInit {
  headerText = '¡Bienvenide a Beto!';
  showOnboarding = false;
  ngOnInit(): void {
    const onboardingComplete = localStorage.getItem('onboardingComplete');

    if (onboardingComplete) {
      this.showOnboarding = false;
    } else this.showOnboarding = true;
  }
}
