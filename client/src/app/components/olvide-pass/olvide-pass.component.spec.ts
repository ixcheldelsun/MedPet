import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidePassComponent } from './olvide-pass.component';

describe('OlvidePassComponent', () => {
  let component: OlvidePassComponent;
  let fixture: ComponentFixture<OlvidePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
