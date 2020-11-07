import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoListarComponent } from './inscricao-listar.component';

describe('InscricaoListarComponent', () => {
  let component: InscricaoListarComponent;
  let fixture: ComponentFixture<InscricaoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscricaoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
