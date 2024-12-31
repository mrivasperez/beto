import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { WordComponent } from './word.component';
import { ChangeDetectorRef } from '@angular/core';

describe('WordComponent', () => {
  let component: WordComponent;
  let fixture: ComponentFixture<WordComponent>;
  let cdr: ChangeDetectorRef;
  let speakSpy: jasmine.Spy;
  let cancelSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordComponent],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    fixture = TestBed.createComponent(WordComponent);
    component = fixture.componentInstance;
    cdr = TestBed.inject(ChangeDetectorRef);

    // Setup spies in beforeEach for better organization
    speakSpy = spyOn(window.speechSynthesis, 'speak').and.callFake(
      (utterance: SpeechSynthesisUtterance) => {
        setTimeout(() => {
          if (utterance.onend) {
            utterance.onend(new SpeechSynthesisEvent('end', { utterance }));
          }
        }, 10);
      }
    );
    cancelSpy = spyOn(window.speechSynthesis, 'cancel');

    fixture.detectChanges();
  });
  
  afterEach(() => {
    // Reset the spies after each test
    speakSpy.calls.reset();
    cancelSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.word).toBe('');
    expect(component.classes).toBe('');
  });

  it('should speak the word and update isHighlighted', fakeAsync(() => {
    component.word = 'test';
    component.speakWord();

    expect(component.isHighlighted).toBe(true);
    expect(cancelSpy).toHaveBeenCalled();
    expect(speakSpy).toHaveBeenCalled();

    tick(500);

    expect(component.isHighlighted).toBe(false);
  }));

  it('should set isHighlighted to false when onend event is triggered', fakeAsync(() => {
    // Arrange
    component.word = 'hola';
    component.isHighlighted = true; // isHighlighted is true initially when calling speakWord()

    // Act
    component.speakWord(); // Call speakWord to initiate speech synthesis
    tick(500);

    // Assert
    expect(component.isHighlighted).toBe(false); // isHighlighted should be false after onend
  }));
});
