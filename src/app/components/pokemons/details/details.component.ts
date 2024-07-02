import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../model/pokemon.interfaces';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonFilteredSearchService } from 'src/app/service/pokemon-filtered-search.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pokemon?: Pokemon;
  pokemonType?: string;
  pokemonAbilities: { name: string;}[] = [];
  pokemonColor?: string;
  pokemonTypes: { name: string; color: string}[] = [];
  pokemonStatistics: { name: string; base_stat: number;}[] = [];
  pokemonImg?: string;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonFilteredSearchService,
    private location: Location,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    this.getPokemonAbilities();
    this.getPokemonStatistics();
  }

  getPokemon(): void 
  {

     forkJoin([
      this.pokemonService.getPokemon(this.helperService.getPokemonId(this.route.snapshot.paramMap.get('id')!)),
      this.pokemonService.getPokemonColor(),
    ]).subscribe((res: any) => {
        this.pokemon = res[0];

        res[0].types.forEach((pokemonTypeName: {type: {name: string}}) =>{
          this.pokemonTypes.push(
            res[1].find((e: { name: string; }) => e.name === pokemonTypeName.type.name)
          );

      });
      });
  }

  getPokemonStatistics(): void
  {

    this.pokemonService.getPokemon(this.helperService.getPokemonId(this.route.snapshot.paramMap.get('id')!))
      .subscribe( (pokemon) => {

        this.pokemonImg = String(pokemon.sprites.front_default);

        pokemon.stats.forEach(items => {
            for (const [key, statisticsName] of Object.entries(items['stat'])) { 

               if(key === 'name'){
                 this.pokemonStatistics.push(
                   {
                     name: String(statisticsName),
                     base_stat: Number(items['base_stat'])
                   }
               );
              }
            }
        });
     });
  }

  getPokemonAbilities(): void
  {
    this.pokemonService.getPokemon(this.helperService.getPokemonId(this.route.snapshot.paramMap.get('id')!))
      .subscribe( (pokemon) => {

       pokemon.abilities.forEach(abilities => {
          for (const [key, abilitieName] of Object.entries(abilities['ability'])) { 
            if(key === 'name'){
              this.pokemonAbilities.push(
                {
                  name: String(abilitieName),
                }
            );
            }
          }
      });
     });
  }

  goBack(): void {
    this.location.back();
  }

}
