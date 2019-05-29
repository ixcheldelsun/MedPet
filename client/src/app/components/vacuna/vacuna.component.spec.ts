import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunaComponent } from './vacuna.component';

describe('VacunaComponent', () => {
  let component: VacunaComponent;
  let fixture: ComponentFixture<VacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
