import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeAttenteClientComponent } from './list-demande-attente-client.component';

describe('ListDemandeAttenteClientComponent', () => {
  let component: ListDemandeAttenteClientComponent;
  let fixture: ComponentFixture<ListDemandeAttenteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDemandeAttenteClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDemandeAttenteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
