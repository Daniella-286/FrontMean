import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModelComponent } from './gestion-model.component';

describe('GestionModelComponent', () => {
  let component: GestionModelComponent;
  let fixture: ComponentFixture<GestionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
