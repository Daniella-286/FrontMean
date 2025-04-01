import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendezVousClientComponent } from './list-rendez-vous-client.component';

describe('ListRendezVousClientComponent', () => {
  let component: ListRendezVousClientComponent;
  let fixture: ComponentFixture<ListRendezVousClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRendezVousClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRendezVousClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
