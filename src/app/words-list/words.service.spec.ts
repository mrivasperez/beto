import { TestBed } from '@angular/core/testing';
import { WordsService } from './words.service';
import { wordListMap, Word } from '../../data/spanish/wordListMap';
import { alphabet } from '../../data/spanish/alphabet';

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get available letters', () => {
    const letters = service.getAvailableLetters();
    expect(letters).toEqual(alphabet);
  });

  it('should get words for a specific letter', async () => {
    const letter = 'a';
    const mockWords: Word[] = [{ word: 'apple', emoji: '🍎' }];

    // Mock the dynamic import
    spyOn(wordListMap['spanish'], letter).and.returnValue(
      Promise.resolve({ words: mockWords })
    );

    const words = await service.getWordsForLetter(letter);
    expect(words).toEqual(mockWords);
  });

  it('should return an empty array if the letter is invalid', async () => {
    const letter = 'invalid';

    // Mock the dynamic import to simulate an error
    spyOn(wordListMap['spanish'], 'a').and.throwError('Invalid letter');

    const words = await service.getWordsForLetter(letter);
    expect(words).toEqual([]);
  });

  it('should get a random word', async () => {
    const mockWord: Word = { word: 'test', emoji: '🧪' };

    // Mock getAvailableLetters and dynamic import
    spyOn(service, 'getAvailableLetters').and.returnValue(['a']);
    spyOn(wordListMap['spanish'], 'a').and.returnValue(
      Promise.resolve({ words: [mockWord] })
    );

    const word = await service.getRandomWord();
    expect(word).toEqual(mockWord);
  });
});
