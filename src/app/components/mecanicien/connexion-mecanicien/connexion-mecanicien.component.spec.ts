import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionMecanicienComponent } from './connexion-mecanicien.component';

describe('ConnexionMecanicienComponent', () => {
  let component: ConnexionMecanicienComponent;
  let fixture: ComponentFixture<ConnexionMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
