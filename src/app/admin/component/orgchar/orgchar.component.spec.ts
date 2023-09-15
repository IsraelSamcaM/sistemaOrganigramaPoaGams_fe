import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgcharComponent } from './orgchar.component';

describe('OrgcharComponent', () => {
  let component: OrgcharComponent;
  let fixture: ComponentFixture<OrgcharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgcharComponent]
    });
    fixture = TestBed.createComponent(OrgcharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
