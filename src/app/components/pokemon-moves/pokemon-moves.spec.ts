import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMovesComponent } from './pokemon-moves';

describe('PokemonMovesComponent', () => {
  let component: PokemonMovesComponent;
  let fixture: ComponentFixture<PokemonMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMovesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMovesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
