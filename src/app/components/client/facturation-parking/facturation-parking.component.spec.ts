import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationParkingComponent } from './facturation-parking.component';

describe('FacturationParkingComponent', () => {
  let component: FacturationParkingComponent;
  let fixture: ComponentFixture<FacturationParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationParkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
