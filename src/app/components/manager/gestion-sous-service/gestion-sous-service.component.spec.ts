import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSousServiceComponent } from './gestion-sous-service.component';

describe('GestionSousServiceComponent', () => {
  let component: GestionSousServiceComponent;
  let fixture: ComponentFixture<GestionSousServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSousServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSousServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
