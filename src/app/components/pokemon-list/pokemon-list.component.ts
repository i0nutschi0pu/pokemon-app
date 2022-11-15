import { Component, OnInit } from '@angular/core';
import { PokemonCRUDService } from '../../pokemon-crud.service';
import { Pokemon } from '../../pokemon.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  
  pokemons: Pokemon[] = [];
  

  constructor(private pokemonCrudService: PokemonCRUDService, private http: HttpClient) { }

  ngOnInit(): void {

   //  this.showPokemons();
     this.showPokemonsWithId();
    // this.pokemonCrudService.getPokemonImage();
}

  showPokemonsWithId() {
    if(!this.pokemons.length){
      this.pokemons  = this.pokemonCrudService.getPokemonImage();
    }
  }
}
