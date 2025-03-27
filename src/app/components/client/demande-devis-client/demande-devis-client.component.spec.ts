import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisClientComponent } from './demande-devis-client.component';

describe('DemandeDevisClientComponent', () => {
  let component: DemandeDevisClientComponent;
  let fixture: ComponentFixture<DemandeDevisClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDevisClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
