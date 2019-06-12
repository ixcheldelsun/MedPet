import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximasComponent } from './proximas.component';

describe('ProximasComponent', () => {
  let component: ProximasComponent;
  let fixture: ComponentFixture<ProximasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
