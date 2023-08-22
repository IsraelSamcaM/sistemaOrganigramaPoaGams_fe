import { TestBed } from '@angular/core/testing';

import { BudgetaryServiceService } from './budgetary.service.service';

describe('BudgetaryServiceService', () => {
  let service: BudgetaryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetaryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
