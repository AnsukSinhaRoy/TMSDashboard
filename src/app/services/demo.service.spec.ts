import { TestBed } from '@angular/core/testing';

import { DEMOService } from './demo.service';

describe('DEMOService', () => {
  let service: DEMOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DEMOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
