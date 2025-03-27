import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationConfirmeComponent } from './list-reservation-confirme.component';

describe('ListReservationConfirmeComponent', () => {
  let component: ListReservationConfirmeComponent;
  let fixture: ComponentFixture<ListReservationConfirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationConfirmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReservationConfirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
