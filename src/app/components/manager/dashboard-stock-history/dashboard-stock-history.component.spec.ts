import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStockHistoryComponent } from './dashboard-stock-history.component';

describe('DashboardStockHistoryComponent', () => {
  let component: DashboardStockHistoryComponent;
  let fixture: ComponentFixture<DashboardStockHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStockHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
