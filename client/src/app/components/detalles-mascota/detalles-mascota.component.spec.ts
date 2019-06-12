import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMascotaComponent } from './detalles-mascota.component';

describe('DetallesMascotaComponent', () => {
  let component: DetallesMascotaComponent;
  let fixture: ComponentFixture<DetallesMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
