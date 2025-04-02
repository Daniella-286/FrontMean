import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueInterventionsVehiculesComponent } from './historique-interventions-vehicules.component';

describe('HistoriqueInterventionsVehiculesComponent', () => {
  let component: HistoriqueInterventionsVehiculesComponent;
  let fixture: ComponentFixture<HistoriqueInterventionsVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueInterventionsVehiculesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueInterventionsVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
