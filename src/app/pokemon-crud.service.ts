import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Pokemon, PokemonAbilities, Pokemons } from './pokemon.model';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonCRUDService {

  private pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  private pokemonByNameUrl = 'https://pokeapi.co/api/v2/pokemon'
  private pokemonsCount!: Pokemons;
  private pokemonImg: any;
  private results: { pokemonsTotal: any }[] = [];
  private res!: number;
  public list: {
   id: number, name: string; url: string, sprites: any 
}[] = [];
  private pokemoTypes: { type: string; color: string }[] = [];
  public bb: [] = [];
  public previousButton: any;
  public nextButton: any;
  public pokemon!: Pokemon;
  public infodata: {sprites: string}[] = [];


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  back_default: any;


  constructor(private http: HttpClient, private messageService: MessageService, private route: ActivatedRoute) { }

  getPokemons(pokemonsUrl: string): Observable<Pokemon> {
    pokemonsUrl = pokemonsUrl.replace('http://localhost:4200/%22','');
    return this.http.get<Pokemon>(pokemonsUrl);
  }

  getTotalNumberOfPokemons(): Observable<any> {
    let count = 0;
    return this.http.get<Pokemons>(`https://pokeapi.co/api/v2/pokemon`)
      .pipe(
        map(pokemonsCount => pokemonsCount['count']), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
        }),
        catchError(this.handleError<Pokemon[]>('getTotalNumberOfPokemons', []))
      );
  }

  getSearchedPokemon(term: string): void {
    if (!term.trim()) {
      return;
    }

    this.http.get<Pokemon>(`${this.pokemonByNameUrl}/${term}`).subscribe(
      response => {
        for (const [k, v] of Object.entries(response)) {
          if (v.name === term) {
            window.location.href = `${this.pokemonByNameUrl}/${term}`;
          }
        }
      },
      catchError(this.handleError<Pokemon[]>('getSearchedPokemon', []))
    );
  }

  getPokemonTypes() {
    var PokemonTypesUrl = 'https://pokeapi.co/api/v2/type';
    return this.http.get<Pokemon>(PokemonTypesUrl);
  }

  getPokemonImg(Id: number): any {
    let imgUrl = '';
    let no = 0;

    this.getTotalNumberOfPokemons().subscribe(
      (response) => {
        no = response;
        //console.log(response);
      }
    )

    this.getPokemon(Id).subscribe(
      response => {
        for (const [k, v] of Object.entries(response.sprites)) {
          if (k === 'back_default') {
            imgUrl = v;
          }
        }
      },
      catchError(this.handleError<Pokemon[]>('getPokemonIdByName', []))
    );

    return imgUrl;

  }

  getPokemonImage(pokemonUrl: string | null): any {

    if(!pokemonUrl){
      pokemonUrl =  this.pokemonsUrl;
    }

    this.getPokemons(pokemonUrl).forEach(item => {
      this.previousButton = item.previous
      item.results.forEach(childrenEntry => {
        this.list.push(
          {
            id: Number(childrenEntry.url.split('/')[childrenEntry.url.split('/').length - 2]),
            name: childrenEntry.name,
            url: childrenEntry.url,
            sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + 
              Number(childrenEntry.url.split('/')[childrenEntry.url.split('/').length - 2]) + 
              '.png'
        });
      });
    });

    return this.list;
  }


  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonByNameUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched Pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  getPokemonLast(id: number): Observable<Pokemon> {
    const url = `${this.pokemonByNameUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(x => {
        this.pokemon.sprites.back_default;
      }),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }


  getPokemonIdByName(name: string): number | undefined | null {
    if (!name.trim()) {
      return null;
    }

    this.http.get<Pokemon>(`${this.pokemonByNameUrl}/${name}`).subscribe(
      response => {
        for (const [k, v] of Object.entries(response)) {
          if (v.name === name) {
            window.location.href = `${this.pokemonByNameUrl}/${name}`;

            return v.id;
          }
        }
      },
      catchError(this.handleError<Pokemon[]>('getPokemonIdByName', []))
    );

    return;
  }

  searchPokemons(term: string): Observable<Pokemon[]> {

    if (!term.trim()) {

      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokemonByNameUrl}/${term}`).pipe(
      tap(
        (x) => {
          for (const [k, v] of Object.entries(x)) {
            if (v.name === term) {
              window.location.href = 'https://pokeapi.co/api/v2/pokemon/' + term;
            }
          }
        }
      ));
  }

  basicSearch(term: string): any {
    let results = this.http.get<Pokemon>(`${this.pokemonByNameUrl}/?name=${term}`);

    return results;
  }

  getPokemonColor(type: string): any {
    let color = 'gray';

    let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
      'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

    if (type === '') {
      return color;
    }

    let PokemonTypesUrl = 'https://pokeapi.co/api/v2/type';

    return this.http.get(PokemonTypesUrl).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(this.handleError<Pokemon>(`something went wrong`))
      )
  }



  getPokemonColour2(type: string): any {
    var colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
      'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

    let pokemoTypes: { type: string; color: string }[] = [];

    this.getPokemonTypes().forEach(item => {
      for (const [key, value] of Object.entries(item.results)) {
        if (value.name === type) {

        }

      }
    });
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

      // TODO: send the error to remote logging infrastructure
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
