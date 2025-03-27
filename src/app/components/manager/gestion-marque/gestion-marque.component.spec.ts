import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMarqueComponent } from './gestion-marque.component';

describe('GestionMarqueComponent', () => {
  let component: GestionMarqueComponent;
  let fixture: ComponentFixture<GestionMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMarqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
