import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonShowcaseComponent } from './pokemon-showcase';

describe('PokemonShowcaseComponent', () => {
  let component: PokemonShowcaseComponent;
  let fixture: ComponentFixture<PokemonShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonShowcaseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
