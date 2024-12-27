import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessBoardComponent } from './guess-board.component';

describe('GuessBoardComponent', () => {
  let component: GuessBoardComponent;
  let fixture: ComponentFixture<GuessBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
