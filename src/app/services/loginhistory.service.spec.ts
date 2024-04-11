import { TestBed } from '@angular/core/testing';

import { LoginhistoryService } from './loginhistory.service';

describe('LoginhistoryService', () => {
  let service: LoginhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
