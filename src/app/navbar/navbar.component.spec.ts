import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterModule,
} from '@angular/router';
import { Subject } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let routerEventsSubject: Subject<NavigationEnd>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<NavigationEnd>();

    await TestBed.configureTestingModule({
      imports: [RouterModule, NavbarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                routeConfig: {
                  path: 'game',
                },
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(),
            navigate: () => Promise.resolve(true),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize activeRoute on ngOnInit', () => {
    routerEventsSubject.next(new NavigationEnd(1, '/game', '/game'));
    component.ngOnInit();
    expect(component.activeRoute).toBe('game');
  });

  it('should navigate to / when navigateToAlphabet is called and isAlphabetHighlighted is true', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.isAlphabetHighlighted = true;
    component.navigateToAlphabet();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should speak and highlight when navigateToAlphabet is called and isAlphabetHighlighted is false', fakeAsync(() => {
    const speakSpy = spyOn(window.speechSynthesis, 'speak');
    component.isAlphabetHighlighted = false;
    component.navigateToAlphabet();
    expect(speakSpy).toHaveBeenCalled();
    expect(component.isAlphabetHighlighted).toBe(true);
    tick(5000);
    expect(component.isAlphabetHighlighted).toBe(false);
  }));

  it('should navigate to /game when navigateToGame is called and isGameHighlighted is true', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.isGameHighlighted = true;
    component.navigateToGame();
    expect(navigateSpy).toHaveBeenCalledWith(['/game']);
  });

  it('should speak and highlight when navigateToGame is called and isGameHighlighted is false', fakeAsync(() => {
    const speakSpy = spyOn(window.speechSynthesis, 'speak');
    component.isGameHighlighted = false;

    component.navigateToGame();

    expect(speakSpy).toHaveBeenCalled();
    expect(component.isGameHighlighted).toBe(true);
    tick(5000);
    expect(component.isGameHighlighted).toBe(false);
  }));

  it('should navigate to /voice when navigateToVoiceInput is called and isVoiceInputHighlighted is true', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.isVoiceInputHighlighted = true;

    component.navigateToVoiceInput();

    expect(navigateSpy).toHaveBeenCalledWith(['/voice']);
  });

  it('should speak and highlight when navigateToVoiceInput is called and isVoiceInputHighlighted is false', fakeAsync(() => {
    const speakSpy = spyOn(window.speechSynthesis, 'speak');
    component.isVoiceInputHighlighted = false;
    component.navigateToVoiceInput();
    expect(speakSpy).toHaveBeenCalled();
    expect(component.isVoiceInputHighlighted).toBe(true);
    tick(5000);
    expect(component.isVoiceInputHighlighted).toBe(false);
  }));
});
