import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessInputPopupComponent } from './guess-input-popup.component';

describe('GuessInputPopupComponent', () => {
  let component: GuessInputPopupComponent;
  let fixture: ComponentFixture<GuessInputPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessInputPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessInputPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
