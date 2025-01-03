import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { OnboardingComponent } from './onboarding.component';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;
  let router: Router;
  let cdr: ChangeDetectorRef;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(async () => {
    mockLocalStorage = {};
    spyOn(localStorage, 'getItem').and.callFake(
      (key: string) => mockLocalStorage[key] || null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (mockLocalStorage[key] = value)
    );
    spyOn(localStorage, 'clear').and.callFake(() => (mockLocalStorage = {}));
    await TestBed.configureTestingModule({
      imports: [RouterModule, OnboardingComponent],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    router = TestBed.inject(Router);
    cdr = TestBed.inject(ChangeDetectorRef);
    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize words array on ngOnInit', () => {
    component.ngOnInit();
    expect(component.words).toEqual(['¡Bienvenide', 'a', 'Beto!']);
  });

  it('should animate header and read words', fakeAsync(() => {
    // Mock SpeechSynthesis
    const speakSpy = spyOn(window.speechSynthesis, 'speak').and.callFake(
      (utterance: SpeechSynthesisUtterance) => {
        // Simulate the onend event after a short delay
        setTimeout(() => {
          if (utterance.onend) {
            utterance.onend(
              new SpeechSynthesisEvent('end', { utterance }) 
            );
          }
        }, 10);
      }
    );

    component.ngOnInit();
    component.animateHeader();

    expect(component.highlightedWord).toBe(0);

    // Wait for the entire animation duration
    tick(component.words.length * 200 + 500); // 200ms per word + a buffer

    expect(component.highlightedWord).toBeNull();
    expect(component.continueHighlighted).toBe(true);
    expect(speakSpy).toHaveBeenCalledTimes(component.words.length);
  }));

  it('should start animation when continue is called for the first time', () => {
    spyOn(component, 'animateHeader');

    component.continue();

    expect(component.animateHeader).toHaveBeenCalled();
    expect(component.hasAnimationStarted).toBe(true);
    expect(component.continueHighlighted).toBe(true);
  });

  it('should not navigate or set onboardingComplete when continue is called before animation', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.hasAnimationStarted = false;
    component.continueHighlighted = false;

    component.continue();
    // Check the mock localStorage
    expect(mockLocalStorage['onboardingComplete']).toBeUndefined();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should navigate to / and set onboardingComplete when continue is called after animation', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.hasAnimationStarted = true;
    component.continueHighlighted = true;

    component.continue();

    expect(localStorage.getItem('onboardingComplete')).toBe('true');
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should not navigate or set onboardingComplete when continue is called before animation', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.hasAnimationStarted = false;
    component.continueHighlighted = false;

    component.continue();

    expect(localStorage.getItem('onboardingComplete')).toBeNull();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
