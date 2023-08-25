import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetaryDialogComponent } from './budgetary-dialog.component';

describe('BudgetaryDialogComponent', () => {
  let component: BudgetaryDialogComponent;
  let fixture: ComponentFixture<BudgetaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetaryDialogComponent]
    });
    fixture = TestBed.createComponent(BudgetaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
