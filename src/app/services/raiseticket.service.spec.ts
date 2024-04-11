import { TestBed } from '@angular/core/testing';

import { RaiseticketService } from './raiseticket.service';

describe('RaiseticketService', () => {
  let service: RaiseticketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaiseticketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
