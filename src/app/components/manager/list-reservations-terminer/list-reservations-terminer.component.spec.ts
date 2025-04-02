import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsTerminerComponent } from './list-reservations-terminer.component';

describe('ListReservationsTerminerComponent', () => {
  let component: ListReservationsTerminerComponent;
  let fixture: ComponentFixture<ListReservationsTerminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationsTerminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReservationsTerminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
