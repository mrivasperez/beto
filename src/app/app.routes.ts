import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AlphabetGridComponent } from './alphabet-grid/alphabet-grid.component';
import { WordsListComponent } from './words-list/words-list.component';
import { SpellingGameComponent } from './spelling-game/spelling-game.component';
import { VoiceComponent } from './voice/voice.component';

export const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent },
  { path: '', component: AlphabetGridComponent },
  { path: 'words/:letter', component: WordsListComponent },
  { path: 'game', component: SpellingGameComponent },
  { path: 'voice', component: VoiceComponent },
];
