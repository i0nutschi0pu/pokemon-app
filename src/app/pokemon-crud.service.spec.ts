import { TestBed } from '@angular/core/testing';

import { PokemonCRUDService } from './pokemon-crud.service';

describe('PokemonCRUDService', () => {
  let service: PokemonCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
