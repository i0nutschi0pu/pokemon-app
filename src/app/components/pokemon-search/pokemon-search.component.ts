import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Pokemon } from '../../pokemon.model';
import { PokemonCRUDService } from '../../pokemon-crud.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {

  constructor(private pokemonCRUDService: PokemonCRUDService) {}

  search(term: string): void {
    let searchTerm = (document.getElementById("search-box") as HTMLInputElement).value;
    this.pokemonCRUDService.getSearchedPokemon(searchTerm);
  }

  // onEnter(term: string): void {
  //   this.searchTerms.next(term);
  // }

  handleSubmit(e: any, term: string){
    e.preventDefault();
    this.search(term);
  }

  handleKeyUp(e: any, term: string){
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
