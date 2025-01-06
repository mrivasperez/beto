import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Component } from '@angular/core';

// Mock for the onboarding route
@Component({ template: '' })
class OnboardingComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'onboarding', component: OnboardingComponent },
        ]),
        AppComponent,
        NavbarComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'beto'`, () => {
    expect(component.title).toEqual('beto');
  });

  it('should navigate to /onboarding if onboarding is not complete', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
    component.ngOnInit();
    tick();
    expect(localStorage.getItem).toHaveBeenCalledWith('onboardingComplete');
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding']);
  }));

  it('should not navigate if onboarding is complete', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    spyOn(router, 'navigate');
    component.ngOnInit();
    tick();
    expect(localStorage.getItem).toHaveBeenCalledWith('onboardingComplete');
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
