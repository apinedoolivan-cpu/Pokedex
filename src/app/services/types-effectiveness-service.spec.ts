import { TestBed } from '@angular/core/testing';

import { TypesEffectivenessService } from './types-effectiveness-service';

describe('TypesEffectivenessService', () => {
  let service: TypesEffectivenessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesEffectivenessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
