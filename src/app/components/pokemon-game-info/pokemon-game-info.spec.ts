import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGameInfoComponent } from './pokemon-game-info';

describe('PokemonGameInfoComponent', () => {
  let component: PokemonGameInfoComponent;
  let fixture: ComponentFixture<PokemonGameInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonGameInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonGameInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
