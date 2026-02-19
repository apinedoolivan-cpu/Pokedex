import { TestBed } from '@angular/core/testing';

import { GameItemsService } from './game-items-service';

describe('GameItemsService', () => {
  let service: GameItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
