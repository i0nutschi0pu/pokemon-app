import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDamage, PokemonEvolution, Pokemons } from '../model/pokemon.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { POKEMONS_URL, POKEMON_DAMAGE_FIRST_CLASS_URL, POKEMON_DAMAGE_SECOND_CLASS_URL, POKEMON_DAMAGE_THIRD_CLASS_URL, 
  POKEMON_EVOLUTIONS_URL, 
  POKEMON_IMG_URL, POKEMON_SPECIES_URL, POKEMON_TYPE_URL, POKEMON_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PokemonFilteredSearchService {

  pokemonsDetails: {id: number, name: string; url: string, sprites: any }[] = [];
  previousButton: []=[];
  pokemon?: Pokemon;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService, private route: ActivatedRoute) { 
  }

  getPokemons(pokemonsUrl: string): Observable<Pokemons> {
    return this.http.get<Pokemons>(pokemonsUrl);
  }

  getSearchedPokemon(term: string): void 
  {
    if (!term.trim()) {
      return;
    }

    this.http.get<Pokemon>(`${POKEMON_URL}/${term}`).subscribe(
      response => {
        
        if(response){
          window.location.href =  window.location.origin + '/details/' +  `${response.id}`;
        }
        
      },
      catchError(this.handleError<Pokemon[]>('getSearchedPokemon', []))
    );
  }

  getPokemonsDetails(pokemonUrl: string | null): any
  {
    if(!pokemonUrl){
      pokemonUrl =  POKEMONS_URL;
    }

    this.getPokemons(pokemonUrl).forEach(pokemons => {
      this.previousButton = pokemons.previous;

      pokemons.results.forEach(pokemonsList => {
        this.pokemonsDetails.push(
          {
            id: Number(pokemonsList.url.split('/')[pokemonsList.url.split('/').length - 2]),
            name: pokemonsList.name,
            url: pokemonsList.url,
            sprites: POKEMON_IMG_URL + 
              Number(pokemonsList.url.split('/')[pokemonsList.url.split('/').length - 2]) + 
              '.png'
        });
      });
    });

    return this.pokemonsDetails;
  }


  getPokemon(id: number): Observable<Pokemon> 
  {
    const url = `${POKEMON_URL}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched Pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  getPokemonColor(): any 
  {
    let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

    let types: { name: string; color: string}[] = [];

    return this.http.get(POKEMON_TYPE_URL).
      pipe(
        map((pokemonTypes: any) => {
          pokemonTypes.results.forEach((pokemonTypesName: {name: string}, pokemonTypesIndex: number) =>{

            types.push(
                {
                  name: pokemonTypesName.name,
                  color: colors[pokemonTypesIndex]
                }
            );            
          });

          return types;
        }), catchError(this.handleError<Pokemon>(`something went wrong`))
      )
  }

  getMovesForStatusDamageClass() : Observable<PokemonDamage> {
    return this.http.get<PokemonDamage>(POKEMON_DAMAGE_FIRST_CLASS_URL).pipe(
      tap(_ => this.log(`fetched moves for 1st damage class`)),
      catchError(this.handleError<PokemonDamage>(`getMovesForStatusDamageClass`))
    );
  }

  getMovesForPhysicalDamageClass() : Observable<PokemonDamage> {
    return this.http.get<PokemonDamage>(POKEMON_DAMAGE_SECOND_CLASS_URL).pipe(
      tap(_ => this.log(`fetched moves for 2nd damage class`)),
      catchError(this.handleError<PokemonDamage>(`getMovesForStatusDamageClass`))
    );
  }

  getMovesForSpecialDamageClass() : Observable<any> {
    return this.http.get<PokemonDamage>(POKEMON_DAMAGE_THIRD_CLASS_URL).pipe(
      tap(_ => this.log(`fetched moves for 3rd damage class`)),
      catchError(this.handleError<PokemonDamage>(`getMovesForStatusDamageClass`))
    );
  }

  getPokemonSpecie(id: number): Observable<any> {
    const url = `${POKEMON_SPECIES_URL}/${id}`;
    let pokemonEvolutionId: Number;
    return this.http.get<any>(url)
    .pipe(
      map((pokemonSpecie: {evolution_chain: {url: string}}) => {
        pokemonEvolutionId =  Number(pokemonSpecie.evolution_chain.url.split('/')[pokemonSpecie.evolution_chain.url.split('/').length - 2]);

        return pokemonEvolutionId;
      }),  catchError(this.handleError<any>(`getPokemon id=${id}`))
    )
  }

  getEvolutionDetails(id: number): Observable<PokemonEvolution> {
    const url = `${POKEMON_EVOLUTIONS_URL}/${id}`;
    return this.http.get<PokemonEvolution>(url).pipe(
      tap(_ => this.log(`fetched Pokemon evolution id=${id}`)),
      catchError(this.handleError<PokemonEvolution>(`getPokemon id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // add logs to loggind service if available
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }
}
