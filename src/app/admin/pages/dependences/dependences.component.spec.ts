import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesComponent } from './dependences.component';

describe('DependencesComponent', () => {
  let component: DependencesComponent;
  let fixture: ComponentFixture<DependencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependencesComponent]
    });
    fixture = TestBed.createComponent(DependencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
