import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutionComponent } from './pokemon-evolution';

describe('PokemonEvolutionComponent', () => {
  let component: PokemonEvolutionComponent;
  let fixture: ComponentFixture<PokemonEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonEvolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonEvolutionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
