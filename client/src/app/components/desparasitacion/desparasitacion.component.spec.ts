import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesparasitacionComponent } from './desparasitacion.component';

describe('DesparasitacionComponent', () => {
  let component: DesparasitacionComponent;
  let fixture: ComponentFixture<DesparasitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesparasitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesparasitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
