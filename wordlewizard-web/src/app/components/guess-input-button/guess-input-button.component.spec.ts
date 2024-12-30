import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessInputButtonComponent } from './guess-input-button.component';

describe('GuessInputButtonComponent', () => {
  let component: GuessInputButtonComponent;
  let fixture: ComponentFixture<GuessInputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessInputButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
