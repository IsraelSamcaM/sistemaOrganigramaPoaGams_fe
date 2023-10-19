import { TestBed } from '@angular/core/testing';

import { DependenceServiceService } from './dependence.service.service';

describe('DependenceServiceService', () => {
  let service: DependenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
