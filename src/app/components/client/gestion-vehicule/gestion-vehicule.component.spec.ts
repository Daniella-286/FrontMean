import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVehiculeComponent } from './gestion-vehicule.component';

describe('GestionVehiculeComponent', () => {
  let component: GestionVehiculeComponent;
  let fixture: ComponentFixture<GestionVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
