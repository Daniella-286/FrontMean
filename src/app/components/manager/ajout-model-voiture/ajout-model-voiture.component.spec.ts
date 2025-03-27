import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModelVoitureComponent } from './ajout-model-voiture.component';

describe('AjoutModelVoitureComponent', () => {
  let component: AjoutModelVoitureComponent;
  let fixture: ComponentFixture<AjoutModelVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutModelVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModelVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
