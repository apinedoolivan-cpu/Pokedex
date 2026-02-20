import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEffectivenessComponent } from './pokemon-type-effectiveness';

describe('TypeEffectivenessComponent', () => {
  let component: TypeEffectivenessComponent;
  let fixture: ComponentFixture<TypeEffectivenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEffectivenessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEffectivenessComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
