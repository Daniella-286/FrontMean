import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDemandeDevisComponent } from './gestion-demande-devis.component';

describe('GestionDemandeDevisComponent', () => {
  let component: GestionDemandeDevisComponent;
  let fixture: ComponentFixture<GestionDemandeDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDemandeDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDemandeDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
