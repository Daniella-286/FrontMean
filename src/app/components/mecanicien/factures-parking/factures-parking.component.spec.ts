import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturesParkingComponent } from './factures-parking.component';

describe('FacturesParkingComponent', () => {
  let component: FacturesParkingComponent;
  let fixture: ComponentFixture<FacturesParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturesParkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturesParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
