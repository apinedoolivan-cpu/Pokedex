import { TestBed } from '@angular/core/testing';

import { GameRoutesService } from './game-routes-service';

describe('GameRoutesService', () => {
  let service: GameRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
