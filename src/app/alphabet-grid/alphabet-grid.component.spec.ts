import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetGridComponent } from './alphabet-grid.component';

describe('AlphabetGridComponent', () => {
  let component: AlphabetGridComponent;
  let fixture: ComponentFixture<AlphabetGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
