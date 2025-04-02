import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationServiceComponent } from './facturation-service.component';

describe('FacturationServiceComponent', () => {
  let component: FacturationServiceComponent;
  let fixture: ComponentFixture<FacturationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
