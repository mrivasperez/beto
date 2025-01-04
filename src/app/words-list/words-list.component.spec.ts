import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordsListComponent } from './words-list.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { WordComponent } from '../shared/word/word.component';
import { By } from '@angular/platform-browser';

describe('WordsListComponent', () => {
  let component: WordsListComponent;
  let fixture: ComponentFixture<WordsListComponent>;
  let route: ActivatedRoute;
  const paramsSubject = new BehaviorSubject({
    letter: 'a',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsListComponent, WordComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: paramsSubject } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a back button', () => {
    const backButton = fixture.debugElement.query(
      By.css('#back-button')
    ).nativeElement;
    expect(backButton).toBeTruthy();
    expect(backButton.textContent).toContain('⬅️');
    expect(backButton.href).toContain('/');
  });

  it('should navigate to the home page when the back button is clicked', () => {
    const backButton = fixture.debugElement.query(By.css('#back-button'));
    const href = backButton.nativeElement.getAttribute('href');
    expect(href).toBe('/');
  });

  it('should get letter from route params', () => {
    route.params.subscribe((params) => {
      expect(params['letter']).toBe('a');
    });
  });
});
