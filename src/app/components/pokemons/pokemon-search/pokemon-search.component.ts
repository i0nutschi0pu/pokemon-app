import { Component, OnInit } from '@angular/core';
import { PokemonCRUDService } from '../../../pokemon-crud.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {

  errors: string[] = [];
  constructor(private pokemonCRUDService: PokemonCRUDService) {}

  search(term: any): void {
    let searchTerm = (document.getElementById("search-box") as HTMLInputElement).value;
    this.pokemonCRUDService.getSearchedPokemon(searchTerm);
  }

  // onEnter(term: string): void {
  //   this.searchTerms.next(term);
  // }

  handleSubmit(e: any, term: any){
    e.preventDefault();
    
    if(typeof term  === 'string'){
      if(term.length < 3){
        this.errors.push(
          'The name should have at least 3 characters',
        );
      }
    }

    if(typeof term  === 'number'){
        this.errors.push(
          'Numeric characters are not allowed',
        );
    }

    if(this.errors.length < 1){
      this.search(term);
    }
  }

  handleKeyUp(e: any, term: any){
   
     if(e.keyCode === 13){
        this.handleSubmit(e, term);
     }
  }

  ngOnInit(): void {
    // this.pokemons$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.pokemonCRUDService.searchPokemons(term)),
  }



          
          

}
