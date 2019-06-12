import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReiniciaPassComponent } from './reinicia-pass.component';

describe('ReiniciaPassComponent', () => {
  let component: ReiniciaPassComponent;
  let fixture: ComponentFixture<ReiniciaPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReiniciaPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReiniciaPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
