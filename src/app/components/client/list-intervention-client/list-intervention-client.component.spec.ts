import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterventionClientComponent } from './list-intervention-client.component';

describe('ListInterventionClientComponent', () => {
  let component: ListInterventionClientComponent;
  let fixture: ComponentFixture<ListInterventionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInterventionClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInterventionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
