import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexPageComponent } from './pokedex-page';

describe('PokedexPage', () => {
  let component: PokedexPageComponent;
  let fixture: ComponentFixture<PokedexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
