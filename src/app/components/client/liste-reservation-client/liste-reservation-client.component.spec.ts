import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReservationClientComponent } from './liste-reservation-client.component';

describe('ListeReservationClientComponent', () => {
  let component: ListeReservationClientComponent;
  let fixture: ComponentFixture<ListeReservationClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeReservationClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReservationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
