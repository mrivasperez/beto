import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent implements OnInit {
  headerText = '¡Bienvenide a Beto!';
  introductionText = '¡Comencemos a aprender a leer!'; // TODO

  constructor(private router: Router) {}

  ngOnInit(): void {}

  continue() {
    localStorage.setItem('onboardingCompute', 'true');
    this.router.navigate(['/']);
  }
}
