import { TestBed } from '@angular/core/testing';

import { TokengetsetService } from './tokengetset.service';

describe('TokengetsetService', () => {
  let service: TokengetsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokengetsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
