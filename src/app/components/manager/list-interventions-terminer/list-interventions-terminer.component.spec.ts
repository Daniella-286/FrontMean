import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterventionsTerminerComponent } from './list-interventions-terminer.component';

describe('ListInterventionsTerminerComponent', () => {
  let component: ListInterventionsTerminerComponent;
  let fixture: ComponentFixture<ListInterventionsTerminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInterventionsTerminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInterventionsTerminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
