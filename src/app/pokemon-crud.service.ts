import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Pokemon, PokemonAbilities } from './pokemon.model';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonCRUDService {

  private pokemonsUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=30&offset=0.';
  private pokemonByNameUrl = 'https://pokeapi.co/api/v2/pokemon'
  private pokemonImg: any;
  private results: any;
  private res: any;
  public list: {id: number, name: string; url: string}[] = [];
  private pokemoTypes: { type: string; color: string}[] = [];
  public bb: [] = [];


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private messageService: MessageService, private route: ActivatedRoute) {}

      getPokemons2(): Observable<Pokemon>  
      {
        return this.http.get<Pokemon>(this.pokemonsUrl);
      }

      getSearchedPokemon(term: string): void 
      {
          if (!term.trim()) {
            return ;
          }

          this.http.get<Pokemon>(`${this.pokemonByNameUrl}/${term}`).subscribe(
            response => {
                for (const [k, v] of Object.entries(response)) {
                  if(v.name === term){
                      window.location.href = `${this.pokemonByNameUrl}/${term}`;
                  }
                }
            },
            catchError(this.handleError<Pokemon[]>('getSearchedPokemon', []))
        );
    }

    getPokemonTypes()
    {
      var PokemonTypesUrl = 'https://pokeapi.co/api/v2/type';
      return this.http.get<Pokemon>(PokemonTypesUrl);
    }

    getPokemonImage(): any
    {
        var data =  this.getPokemons2();
        let i = 0;
        var res: any[] = [];

        this.getPokemons2().forEach(item => {
          item.results.forEach(childrenEntry => { 
                    
                    this.list.push(
                        {
                          id: Number(childrenEntry.url.split('/')[childrenEntry.url.split('/').length-2]),
                          name: childrenEntry.name, 
                          url: childrenEntry.url,
                        }
                    );
          });
        });

      return this.list;
    }

    getPokemon(id: number): Observable<Pokemon> {
      const url = `${this.pokemonByNameUrl}/${id}`;
     // console.log(url);
      return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log(`fetched Pokemon id=${id}`)),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
    }

    getPokemonIdByName(name: string): number | undefined | null
    {
        if (!name.trim()) {
          return null;
        }

        this.http.get<Pokemon>(`${this.pokemonByNameUrl}/${name}`).subscribe(
          response => {
          // console.log(response);
              for (const [k, v] of Object.entries(response)) {
                if(v.name === name){
                   window.location.href = `${this.pokemonByNameUrl}/${name}`;

                  return v.id;
                }
              }
          },
          catchError(this.handleError<Pokemon[]>('getPokemonIdByName', []))
        );

        return;
    }

    searchPokemons(term: string): Observable<Pokemon[]> 
    {

      if (!term.trim()) {

        return of([]);
      }

     // console.log(`${this.pokemonByNameUrl}/${term}`);
      return this.http.get<Pokemon[]>(`${this.pokemonByNameUrl}/${term}`).pipe(
        tap(
          (x) => {
            for (const [k, v] of Object.entries(x)) {
              if(v.name === term){
               window.location.href = 'https://pokeapi.co/api/v2/pokemon/' + term;
              }
            }
          }
      ));
    }

    basicSearch(term: string): any
    {
      let results = this.http.get<Pokemon>(`${this.pokemonByNameUrl}/?name=${term}`);

      return results;
    }

    getPokemonColor(type: string): any
    {
      let color = 'gray';

      let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

      if(type === ''){
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



    getPokemonColour2(type: string): any
    {
      var colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

      let pokemoTypes: { type: string; color: string}[] = [];

      this.getPokemonTypes().forEach(item => {
          for (const [key, value] of Object.entries(item.results)) { 
          if(value.name === type){

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
