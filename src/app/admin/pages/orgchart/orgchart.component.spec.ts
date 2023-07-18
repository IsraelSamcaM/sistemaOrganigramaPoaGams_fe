import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgchartComponent } from './orgchart.component';

describe('OrgchartComponent', () => {
  let component: OrgchartComponent;
  let fixture: ComponentFixture<OrgchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgchartComponent]
    });
    fixture = TestBed.createComponent(OrgchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
