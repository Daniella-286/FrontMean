import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisDuTempsMecanicienComponent } from './emplois-du-temps-mecanicien.component';

describe('EmploisDuTempsMecanicienComponent', () => {
  let component: EmploisDuTempsMecanicienComponent;
  let fixture: ComponentFixture<EmploisDuTempsMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploisDuTempsMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploisDuTempsMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
