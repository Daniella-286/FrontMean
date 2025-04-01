import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionClientListComponent } from './intervention-client-list.component';

describe('InterventionClientListComponent', () => {
  let component: InterventionClientListComponent;
  let fixture: ComponentFixture<InterventionClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionClientListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
