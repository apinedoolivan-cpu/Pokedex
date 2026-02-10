import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPageComponent } from './pokemon-page';

describe('PokemonPage', () => {
  let component: PokemonPageComponent;
  let fixture: ComponentFixture<PokemonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
