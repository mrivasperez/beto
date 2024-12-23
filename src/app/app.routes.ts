import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AlphabetGridComponent } from './alphabet-grid/alphabet-grid.component';

export const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent },
  { path: '', component: AlphabetGridComponent },
];
