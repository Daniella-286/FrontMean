import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesTachesComponent } from './listes-taches.component';

describe('ListesTachesComponent', () => {
  let component: ListesTachesComponent;
  let fixture: ComponentFixture<ListesTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesTachesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
