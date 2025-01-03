import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { SpellingGameComponent } from './spelling-game.component';
import { WordsService } from '../words-list/words.service';
import { Word } from '../../data/spanish/wordListMap';
import { By } from '@angular/platform-browser';

describe('SpellingGameComponent', () => {
  let component: SpellingGameComponent;
  let fixture: ComponentFixture<SpellingGameComponent>;
  let mockWordsService: jasmine.SpyObj<WordsService>;

  const mockWord: Word = { word: 'casa', emoji: '🏠' };

  beforeEach(waitForAsync(async () => {
    mockWordsService = jasmine.createSpyObj('WordsService', [
      'getRandomWord',
      'getAvailableLetters',
    ]);
    mockWordsService.getRandomWord.and.returnValue(Promise.resolve(mockWord));
    mockWordsService.getAvailableLetters.and.returnValue([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'ñ',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ]);

    await TestBed.configureTestingModule({
      imports: [SpellingGameComponent],
      providers: [{ provide: WordsService, useValue: mockWordsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SpellingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial detectChanges
    await fixture.whenStable(); // Wait for asynchronous activities in ngOnInit
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a random word on ngOnInit', async () => {
    expect(mockWordsService.getRandomWord).toHaveBeenCalled();
    expect(component.targetWord).toBe(mockWord.word);
    expect(component.targetEmoji).toBe(mockWord.emoji);
    expect(component.currentInput).toBe('');
    expect(component.feedback).toBe('');
  });

  it('should set available letters correctly', () => {
    component.targetWord = 'test';
    component.setLetters();
    expect(component.availableLetters.length).toBe(9);
    expect(component.availableLetters).toContain('t');
    expect(component.availableLetters).toContain('e');
    expect(component.availableLetters).toContain('s');
  });

  it('should load a new word correctly', async () => {
    const newMockWord: Word = { word: 'perro', emoji: '🐶' };
    mockWordsService.getRandomWord.and.returnValue(Promise.resolve(newMockWord));

    component.loadNewWord();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(mockWordsService.getRandomWord).toHaveBeenCalled();
    expect(component.targetWord).toBe(newMockWord.word);
    expect(component.targetEmoji).toBe(newMockWord.emoji);
    expect(component.currentInput).toBe('');
    expect(component.feedback).toBe('');
    expect(component.availableLetters.length).toBe(9);
  });

  it('should add a letter to currentInput and check if correct', () => {
    component.targetWord = 'test';
    component.addLetter('t');
    expect(component.currentInput).toBe('t');
    expect(component.feedback).toBe('');

    component.addLetter('e');
    expect(component.currentInput).toBe('te');
    expect(component.feedback).toBe('');

    component.addLetter('s');
    expect(component.currentInput).toBe('tes');
    expect(component.feedback).toBe('');

    component.addLetter('t');
    expect(component.currentInput).toBe('test');
    expect(component.feedback).toBe('correct');
  });

  it('should set feedback to incorrect if input does not start with target word', () => {
    component.targetWord = 'test';
    component.addLetter('x');
    expect(component.currentInput).toBe('x');
    expect(component.feedback).toBe('incorrect');
  });

  it('should reset input and feedback', () => {
    component.currentInput = 'test';
    component.feedback = 'correct';
    component.resetInput();
    expect(component.currentInput).toBe('');
    expect(component.feedback).toBe('');
  });

  it('should utter the target word', async () => {
    component.targetWord = 'hola';
    spyOn(window.speechSynthesis, 'speak').and.callFake(() => {});
    spyOn(window.speechSynthesis, 'cancel').and.callFake(() => {});

    component.utterTargetWord();
    await fixture.whenStable();

    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
    expect(window.speechSynthesis.speak).toHaveBeenCalled();

    const utterance: SpeechSynthesisUtterance = (
      window.speechSynthesis.speak as jasmine.Spy
    ).calls.mostRecent().args[0];
    expect(utterance.text).toBe('hola');
    expect(utterance.lang).toBe('es-US');
  });

  it('should render the target emoji', async () => {
    component.targetEmoji = '🥳';
    fixture.detectChanges();
    await fixture.whenStable();

    const emojiElement: HTMLElement =
      fixture.nativeElement.querySelector('.flex .p-4 .text-center button');
    expect(emojiElement.textContent).toContain('🥳');
  });

  it('should render available letters', async () => {
    component.availableLetters = ['a', 'b', 'c'];
    fixture.detectChanges();
    await fixture.whenStable();

    const letterButtons = fixture.nativeElement.querySelectorAll(
      '.flex.justify-start.gap-2.flex-wrap button'
    );
    expect(letterButtons.length).toBe(3);
    expect(letterButtons[0].textContent).toContain('a');
    expect(letterButtons[1].textContent).toContain('b');
    expect(letterButtons[2].textContent).toContain('c');
  });

  it('should add letter to currentInput when letter button is clicked', async () => {
    component.availableLetters = ['a', 'b', 'c'];
    fixture.detectChanges();
    await fixture.whenStable();

    const letterButtons = fixture.debugElement.queryAll(
      By.css('.flex.justify-start.gap-2.flex-wrap button')
    );
    letterButtons[0].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.currentInput).toBe('a');
  });

  it('should reset input when reset button is clicked', async () => {
    component.currentInput = 'test';
    component.feedback = 'correct';
    fixture.detectChanges();
    await fixture.whenStable();

    const resetButton = fixture.nativeElement.querySelector(
      '.mt-11.flex.justify-center span'
    );
    resetButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.currentInput).toBe('');
    expect(component.feedback).toBe('');
  });

  it('should utter target word when speak button is clicked', async () => {
    spyOn(component, 'utterTargetWord');
    fixture.detectChanges();
    await fixture.whenStable();

    const speakButton = fixture.nativeElement.querySelector(
      '.flex.justify-center.items-start .p-4.w-full.max-w-screen-lg .text-center button'
    );
    speakButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.utterTargetWord).toHaveBeenCalled();
  });
});