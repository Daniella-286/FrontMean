import { TestBed } from '@angular/core/testing';

import { FactureParkingService } from './facture-parking.service';

describe('FactureParkingService', () => {
  let service: FactureParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactureParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
