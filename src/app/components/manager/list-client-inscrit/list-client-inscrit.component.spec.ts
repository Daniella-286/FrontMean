import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientInscritComponent } from './list-client-inscrit.component';

describe('ListClientInscritComponent', () => {
  let component: ListClientInscritComponent;
  let fixture: ComponentFixture<ListClientInscritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientInscritComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientInscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
