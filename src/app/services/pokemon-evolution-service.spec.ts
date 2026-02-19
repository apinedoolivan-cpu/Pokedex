import { TestBed } from '@angular/core/testing';

import { PokemonEvolutionService } from './pokemon-evolution-service';

describe('PokemonEvolutionService', () => {
  let service: PokemonEvolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonEvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
