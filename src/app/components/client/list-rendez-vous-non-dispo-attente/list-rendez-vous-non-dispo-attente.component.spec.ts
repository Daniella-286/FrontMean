import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendezVousNonDispoAttenteComponent } from './list-rendez-vous-non-dispo-attente.component';

describe('ListRendezVousNonDispoAttenteComponent', () => {
  let component: ListRendezVousNonDispoAttenteComponent;
  let fixture: ComponentFixture<ListRendezVousNonDispoAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRendezVousNonDispoAttenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRendezVousNonDispoAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
