import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionMecanicienComponent } from './inscription-mecanicien.component';

describe('InscriptionMecanicienComponent', () => {
  let component: InscriptionMecanicienComponent;
  let fixture: ComponentFixture<InscriptionMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
