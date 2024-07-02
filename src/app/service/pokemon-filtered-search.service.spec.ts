import { TestBed } from '@angular/core/testing';

import { PokemonFilteredSearchService } from './pokemon-filtered-search.service';

describe('PokemonFilteredSearchService', () => {
  let service: PokemonFilteredSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFilteredSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
