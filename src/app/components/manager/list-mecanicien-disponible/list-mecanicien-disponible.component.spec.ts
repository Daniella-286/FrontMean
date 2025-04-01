import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMecanicienDisponibleComponent } from './list-mecanicien-disponible.component';

describe('ListMecanicienDisponibleComponent', () => {
  let component: ListMecanicienDisponibleComponent;
  let fixture: ComponentFixture<ListMecanicienDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMecanicienDisponibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMecanicienDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
