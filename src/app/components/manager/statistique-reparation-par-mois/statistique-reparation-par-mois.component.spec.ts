import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueReparationParMoisComponent } from './statistique-reparation-par-mois.component';

describe('StatistiqueReparationParMoisComponent', () => {
  let component: StatistiqueReparationParMoisComponent;
  let fixture: ComponentFixture<StatistiqueReparationParMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiqueReparationParMoisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueReparationParMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
