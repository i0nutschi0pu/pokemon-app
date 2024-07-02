import { Component, OnInit } from '@angular/core';
import { PokemonFilteredSearchService } from 'src/app/service/pokemon-filtered-search.service'; 
import { Pokemon } from '../../../model/pokemon.interfaces';
import { POKEMONS_URL } from 'src/app/constants';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  previousButton?: string;
  nextButton?: string;
  

  constructor(
    private pokemonService: PokemonFilteredSearchService, 
  ) { }

  ngOnInit(): void {

     this.getPokemons();
     this.getNavigationButtons(POKEMONS_URL);
  }

  getPokemons(): void
  {
    if(!this.pokemons.length){
      this.pokemons  = this.pokemonService.getPokemonsDetails(null);
    }
  }

  getNavigationButtons(url: string): void
  {
    this.pokemonService.getPokemons(url).subscribe(
      (response) => {
        this.previousButton = response.previous;
        this.nextButton = response.next;
      }
    )
  }

  goToNextSetOfResults(): void
  {
    let nextButton = (document.getElementById('next-btn') as HTMLButtonElement).value;
    this.getNavigationButtons(nextButton);
    this.pokemonService.getPokemonsDetails(nextButton);
  }

}
