import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMarqueVoitureComponent } from './ajout-marque-voiture.component';

describe('AjoutMarqueVoitureComponent', () => {
  let component: AjoutMarqueVoitureComponent;
  let fixture: ComponentFixture<AjoutMarqueVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutMarqueVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutMarqueVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
