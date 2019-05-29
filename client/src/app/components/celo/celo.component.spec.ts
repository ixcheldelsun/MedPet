import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeloComponent } from './celo.component';

describe('CeloComponent', () => {
  let component: CeloComponent;
  let fixture: ComponentFixture<CeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
