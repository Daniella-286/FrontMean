import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeEnvoyeClientComponent } from './list-demande-envoye-client.component';

describe('ListDemandeEnvoyeClientComponent', () => {
  let component: ListDemandeEnvoyeClientComponent;
  let fixture: ComponentFixture<ListDemandeEnvoyeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDemandeEnvoyeClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDemandeEnvoyeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
