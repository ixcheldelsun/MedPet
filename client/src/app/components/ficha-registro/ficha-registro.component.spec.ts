import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaRegistroComponent } from './ficha-registro.component';

describe('FichaRegistroComponent', () => {
  let component: FichaRegistroComponent;
  let fixture: ComponentFixture<FichaRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
