import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionManagerComponent } from './connexion-manager.component';

describe('ConnexionManagerComponent', () => {
  let component: ConnexionManagerComponent;
  let fixture: ComponentFixture<ConnexionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
