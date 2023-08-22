import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetaryComponent } from './budgetary.component';

describe('BudgetaryComponent', () => {
  let component: BudgetaryComponent;
  let fixture: ComponentFixture<BudgetaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetaryComponent]
    });
    fixture = TestBed.createComponent(BudgetaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
