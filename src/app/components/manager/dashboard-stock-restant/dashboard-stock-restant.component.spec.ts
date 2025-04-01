import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStockRestantComponent } from './dashboard-stock-restant.component';

describe('DashboardStockRestantComponent', () => {
  let component: DashboardStockRestantComponent;
  let fixture: ComponentFixture<DashboardStockRestantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStockRestantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStockRestantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
