import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonCRUDService } from '../../pokemon-crud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pokemon: Pokemon | undefined;
  pokemonBackgroundColor!: string; 
  pokemonType!: string;
  test!: number;
  pokemonAbs: { name: string;}[] = [];
  pokeAb: any = {};
  pokemonColor!: string;
  pokemonTypes: { name: string;}[] = [];
  pokemonStatistics: { name: string; base_stat: number;}[] = [];
  pokemonImg!: string;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonCRUDService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    this.getPokemonAbilities();
    this.getPokCol(this.getPokemonType());
    this.getPokemonStatistics();
  }

  getPokemon(): void 
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon) => { 

       this.pokemon = pokemon;
       console.log(pokemon)
     });
  }

  getPokemonStatistics()
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon) => {

        this.pokemonImg = String(pokemon.sprites.back_default)

       pokemon.stats.forEach(items => {
            for (const [key, value] of Object.entries(items['stat'])) { 

               if(key === 'name'){
                 this.pokemonStatistics.push(
                   {
                     name: String(value),
                     base_stat: Number(items['base_stat'])
                   }
               );
              }
              
            }
      });
     });
  }

  getPokemonAbilities()
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon) => {

       pokemon.abilities.forEach(items => {
            for (const [key, value] of Object.entries(items['ability'])) { 
              if(key === 'name'){
                this.pokemonAbs.push(
                  {
                    name: String(value),
                  }
              );
              }
              
            }
      });
     });
  }

  getPokCol(type: string)
  {
    if(type === ''){
        return '';
      }

    let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

    this.pokemonService.getPokemonColor('grass').subscribe((data: { results: any; forEach: (arg0: (data: any) => void) => void; }) => {
      let color = '';

          data.results.forEach((item2: { name: any; }) => {
            if(item2.name ===  type){
              this.pokemonColor = colors[Math.floor(Math.random() * colors.length)];
            }
            
          });
    });
  }


  getPokemonType(): any
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    /*
       I declared this default type in order to show the functionality, although 
       I could also check in the template if type type exists in the array of types and then assgin 
       a random color;
    */


    let type = 'poison';

    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon)  => {

        pokemon.types.forEach( (items: {type: any}) => {
          this.pokemonTypes.push(
                {
                  name: items.type.name
                }
            );
          type = items.type.name;
          
         return type;
      });
     });

      return type;
  }

  goBack(): void {
    this.location.back();
  }

}
