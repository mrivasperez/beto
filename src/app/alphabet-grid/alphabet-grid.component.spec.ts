import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AlphabetGridComponent } from './alphabet-grid.component';
import { Router, RouterModule } from '@angular/router';
import { alphabet } from '../../data/spanish/alphabet';
import { Component, Input } from '@angular/core';

// Mock the WordComponent because we don't want to test its implementation
@Component({
  selector: 'app-word',
  template: '',
})
class MockWordComponent {
  @Input() word!: string;
}

describe('AlphabetGridComponent', () => {
  let component: AlphabetGridComponent;
  let fixture: ComponentFixture<AlphabetGridComponent>;
  let router: Router;
  let speechSynthesisSpy: jasmine.SpyObj<SpeechSynthesis>;

  beforeEach(async () => {
    speechSynthesisSpy = jasmine.createSpyObj('speechSynthesis', [
      'speak',
      'cancel',
    ]);
    Object.defineProperty(window, 'speechSynthesis', {
      value: speechSynthesisSpy,
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [RouterModule, AlphabetGridComponent, MockWordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlphabetGridComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct alphabet', () => {
    expect(component.alphabet).toEqual(alphabet);
  });

  it('should have null selectedLetter initially', () => {
    expect(component.selectedLetter).toBeNull();
  });

  it('should have empty currentInput initially', () => {
    expect(component.currentInput).toBe('');
  });

  it('should set selectedLetter on letter click', () => {
    const letter = 'a';
    component.onLetterClick(letter);
    expect(component.selectedLetter).toEqual(letter);
  });

  it('should append letter to currentInput on letter click', () => {
    const letter = 'b';
    component.onLetterClick(letter);
    expect(component.currentInput).toEqual(letter);
    component.onLetterClick('c');
    expect(component.currentInput).toEqual('bc');
  });

  it('should speak the letter on letter click (normal letter)', () => {
    const letter = 'a';
    component.onLetterClick(letter);
    expect(speechSynthesisSpy.speak).toHaveBeenCalled();
    const utterance = speechSynthesisSpy.speak.calls.mostRecent()
      .args[0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe(letter);
    expect(utterance.lang).toBe('es-US');
  });

  it('should speak "i griega" for "y" letter', () => {
    const letter = 'y';
    component.onLetterClick(letter);
    expect(speechSynthesisSpy.speak).toHaveBeenCalled();
    const utterance = speechSynthesisSpy.speak.calls.mostRecent()
      .args[0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe('i griega');
    expect(utterance.lang).toBe('es-US');
  });

  it('should cancel previous speech on letter click', () => {
    component.onLetterClick('a');
    expect(speechSynthesisSpy.cancel).toHaveBeenCalled();
  });

  it('should navigate to the words route after 500ms on startPressTimer', (done) => {
    const letter = 'a';
    spyOn(router, 'navigate');
    component.startPressTimer(letter);

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/words', letter]);
      done();
    }, 500);
  });

  it('should clear the timer on endPressTimer', () => {
    spyOn(window, 'clearTimeout');
    component.startPressTimer('a');
    component.endPressTimer();
    expect(window.clearTimeout).toHaveBeenCalled();
  });

  it('should clear the currentInput on eraseWord', () => {
    component.currentInput = 'abc';
    component.onEraseWord();
    expect(component.currentInput).toBe('');
  });

  it('should navigate to the game route when navigateToGame is called for the second time', () => {
    spyOn(router, 'navigate');
    component.navigateToGame();
    component.navigateToGame();
    expect(router.navigate).toHaveBeenCalledWith(['/game']);
  });

  it('should speak "Juego de deletreo" before navigating to the game', () => {
    spyOn(router, 'navigate');
    component.navigateToGame();
    expect(speechSynthesisSpy.speak).toHaveBeenCalled();
    const utterance = speechSynthesisSpy.speak.calls.mostRecent()
      .args[0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe('Juego de deletreo');
    expect(utterance.lang).toBe('es-US');
  });

  it('should set isGameHighlighted to true before navigating and reset it in 5000ms', fakeAsync(() => {
    component.navigateToGame();
    expect(component.isGameHighlighted).toBeTrue();
    tick(5000);
    expect(component.isGameHighlighted).toBeFalse();
  }));

  it('should navigate to the voice route when navigateToVoiceInput is called for the second time', () => {
    spyOn(router, 'navigate');
    component.navigateToVoiceInput();
    component.navigateToVoiceInput();
    expect(router.navigate).toHaveBeenCalledWith(['/voice']);
  });

  it('should speak "Entrada de Voz" before navigating to the voice route', () => {
    spyOn(router, 'navigate');
    component.navigateToVoiceInput();
    expect(speechSynthesisSpy.speak).toHaveBeenCalled();
    const utterance = speechSynthesisSpy.speak.calls.mostRecent()
      .args[0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe('Entrada de Voz');
    expect(utterance.lang).toBe('es-US');
  });

  it('should set isVoiceInputHighlighted to true before navigating and reset it in 5000ms', fakeAsync(() => {
    component.navigateToVoiceInput();
    expect(component.isVoiceInputHighlighted).toBeTrue();
    tick(5000);
    expect(component.isVoiceInputHighlighted).toBeFalse();
  }));
});
