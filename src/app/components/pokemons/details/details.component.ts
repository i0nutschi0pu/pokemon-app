import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonCRUDService } from '../../../pokemon-crud.service';
import { Subject } from 'rxjs/internal/Subject';

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
  pokemonTypes: { name: string; color: string}[] = [];
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
    // this.getPokCol();
    this.getPokemonStatistics();

    this.getPokCol();
    // console.log(this.getPokemonId());
    // this.getPokemonEvolution();
  }

  getPokemonId(): number
  {
    return parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  // getPokemonEvolution()
  // {
  //   this.pokemonService.getEvolutionDetails(this.getPokemonId())
  //     .subscribe( (pokemon) => { 

  //      this.pokemon = pokemon;
  //     // console.log(pokemon)
  //    });
  // }

  // getPokemon(types: { name: string; color: string}[]): void 
  getPokemon(): void 
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    // console.log(types);
    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon) => { 

       this.pokemon = pokemon;
      //  console.log(pokemon.types);

       this.pokemonService.getPokemonColor().subscribe( (pokemonTypes: any) => {
        
          // console.log(pokemonTypes);
          pokemon.types.forEach((itemsV: any, innerIdx: any) =>{
              // console.log(itemsV.type.name);
              // console.log(pokemonTypes.name);
              // console.log(pokemonTypes.find((e: { name: string; }) => e.name === itemsV.type.name));

              this.pokemonTypes.push(
                pokemonTypes.find((e: { name: string; }) => e.name === itemsV.type.name)
              );

              // console.log(pokemonTypes.name.includes(itemsV.type.name));

          });
        });

      //  types.forEach((itemsV: any, innerIdx: any) =>{
        
        
      // });
      // console.log(pokemon)
     });
  }

  getPokemonStatistics()
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon) => {

        this.pokemonImg = String(pokemon.sprites.front_default)

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

  getPokCol()
  {

    var subject = new Subject<{ name: string; color: string}[]>();
    let pokemonTps: { name: string; color: string}[];
    // console.log(this.pokemonService.getPokemonColor());


    // let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
    //   'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
    //   'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

    // this.pokemonService.getPokemonColor().subscribe((data: { results: any; forEach: (arg0: (data: any) => void) => void; }) => {

    // this.pokemonService.getPokemonColor().subscribe( (data: any) => {
        
    //       // console.log(data);
    //       // data.results.forEach((itemsV: any, innerIdx: any) =>{

    //       //   this.pokemonTypes.push(
    //       //       {
    //       //         name: itemsV.name,
    //       //         color: colors[innerIdx]
    //       //       }
    //       //   );
    //       //   pokemonTps = this.pokemonTypes;

    //       //   subject.next(pokemonTps);
            
    //       // });
    // });

    return subject.asObservable();
  }


  // getPokemonType(): any
  // {
  //   const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  //   let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
  //     'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
  //     'silver', 'teal', 'white', 'yellow', 'brown', 'magenta', 'kaki'];

  //   /*
  //      I declared this default type in order to show the functionality, although 
  //      I could also check in the template if type type exists in the array of types and then assgin 
  //      a random color;
  //   */


  //   // let type = 'poison';

  //   this.pokemonService.getPokemon(id)
  //     .subscribe( (pokemon)  => {

  //       pokemon.types.forEach( (itemsV: {type: any}, innerIdx) => {
  //         // console.log(itemsV);
  //         // console.log(innerIdx);
  //         this.pokemonTypes.push(
  //               {
  //                 name: itemsV.type.name,
  //                 color: colors[Math.floor(Math.random() * colors.length)]
  //               }
  //           );
  //       //   type = items.type.name;
          
  //       //  return type;
  //     });
  //    });

  //     // return type;
  // }

  goBack(): void {
    this.location.back();
  }

}
