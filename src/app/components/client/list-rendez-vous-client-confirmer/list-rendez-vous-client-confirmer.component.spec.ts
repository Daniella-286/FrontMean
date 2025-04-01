import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendezVousClientConfirmerComponent } from './list-rendez-vous-client-confirmer.component';

describe('ListRendezVousClientConfirmerComponent', () => {
  let component: ListRendezVousClientConfirmerComponent;
  let fixture: ComponentFixture<ListRendezVousClientConfirmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRendezVousClientConfirmerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRendezVousClientConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
