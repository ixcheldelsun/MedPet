import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerMascotaComponent } from './escoger-mascota.component';

describe('EscogerMascotaComponent', () => {
  let component: EscogerMascotaComponent;
  let fixture: ComponentFixture<EscogerMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscogerMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
