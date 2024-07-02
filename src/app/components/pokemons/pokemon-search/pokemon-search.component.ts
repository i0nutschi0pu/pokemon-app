import { Component, OnInit } from '@angular/core';
import { PokemonFilteredSearchService } from 'src/app/service/pokemon-filtered-search.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {

  errors: string[] = [];
  
  constructor(private pokemonService: PokemonFilteredSearchService) {}

  search(term: string | number): void {
    let searchTerm = (document.getElementById("search-box") as HTMLInputElement).value;
    this.pokemonService.getSearchedPokemon(searchTerm);
  }

  handleSubmit(e: any, term: string | number): void
  {
    e.preventDefault();
    this.errors = [];
    
    if(typeof term  === 'string'){
      if(term.length < 3){
        this.errors.push(
          'The name should have at least 3 characters',
        );
      }
    }

    if(isNaN(Number(term)) === false){
        this.errors.push(
          'Numeric characters are not allowed',
        );
    }

    if(this.errors.length < 1){
      this.search(term);
    }
  }

  handleKeyUp(e: any, term: string | number)
  {
   
     if(e.keyCode === 13){
        this.handleSubmit(e, term);
     }
  }

  ngOnInit(): void {
  }
}
