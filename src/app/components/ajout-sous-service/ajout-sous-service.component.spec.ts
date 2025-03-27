import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSousServiceComponent } from './ajout-sous-service.component';

describe('AjoutSousServiceComponent', () => {
  let component: AjoutSousServiceComponent;
  let fixture: ComponentFixture<AjoutSousServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSousServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSousServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
