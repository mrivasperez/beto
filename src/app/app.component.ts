import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'beto';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (onboardingComplete) {
      return;
    } else {
      this.router.navigate(['/onboarding']);
    }
  }
}
