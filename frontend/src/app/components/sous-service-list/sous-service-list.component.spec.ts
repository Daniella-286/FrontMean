import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousServiceListComponent } from './sous-service-list.component';

describe('SousServiceListComponent', () => {
  let component: SousServiceListComponent;
  let fixture: ComponentFixture<SousServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousServiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
