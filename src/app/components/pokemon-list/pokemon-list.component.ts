import { Component, OnInit } from '@angular/core';
import { PokemonCRUDService } from '../../pokemon-crud.service';
import { Pokemon } from '../../pokemon.model';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  
  pokemons: Pokemon[] = [];
  pokemonImg!: string;
  public previousButton: any;
  public nextButton: any;
  

  constructor(private pokemonCrudService: PokemonCRUDService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {

     this.showPokemonsWithId();
     this.getNavigationButtons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
}

  showPokemonsWithId() 
  {
    if(!this.pokemons.length){
      this.pokemons  = this.pokemonCrudService.getPokemonImage(null);
    }
  }

  getNavigationButtons(url: string)
  {
    this.pokemonCrudService.getPokemons(url).subscribe(
      (response) => {
        this.previousButton = response.previous;
        this.nextButton = response.next;
      }
    )
  }

  goToNextSetOfResults()
  {
    let nextButton = (document.getElementById('next-btn') as HTMLButtonElement).value;
    this.getNavigationButtons(nextButton);
    this.pokemonCrudService.getPokemonImage(nextButton);
  }

}
