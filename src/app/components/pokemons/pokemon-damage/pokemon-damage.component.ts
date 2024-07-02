import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonFilteredSearchService } from 'src/app/service/pokemon-filtered-search.service';
import { Pokemon } from 'src/app/model/pokemon.interfaces';
import { forkJoin} from 'rxjs';
import { HelperService } from 'src/app/service/helper.service'; 

@Component({
  selector: 'app-pokemon-damage',
  templateUrl: './pokemon-damage.component.html',
  styleUrls: ['./pokemon-damage.component.css']
})
export class PokemonDamageComponent implements OnInit {

  private pokemon?: Pokemon;
  isSpecial: boolean = false;
  isPhysical: boolean = false;
  isStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonFilteredSearchService,
    private helperService: HelperService,
  ) {}

  ngOnInit(): void {
     this.getPokemonMoves();
  }

  getPokemonMoves(): void
  {
    let currentPokemonMovesIds: number[]=[];
    let specialDamageMovesIds: number[]=[];
    let physicalDamageMovesIds: number[]=[];
    let statusDamageMovesIds: number[]=[];

    forkJoin([
      this.pokemonService.getPokemon(this.helperService.getPokemonId(this.route.snapshot.paramMap.get('id')!)),
      this.pokemonService.getMovesForSpecialDamageClass(),
      this.pokemonService.getMovesForPhysicalDamageClass(),
      this.pokemonService.getMovesForStatusDamageClass()
    ]).subscribe((res: any) => {

        this.pokemon = res[0];

        res[0].moves.forEach( (moves: any) => {
          currentPokemonMovesIds.push(this.helperService.stringExtract(moves.move.url));
        });

        res[1].moves.forEach( (moves: any) => {
          specialDamageMovesIds.push(this.helperService.stringExtract(moves.url));
        });

        res[2].moves.forEach( (moves: any) => {
          physicalDamageMovesIds.push(this.helperService.stringExtract(moves.url));
        });

        res[3].moves.forEach( (moves: any) => {
          statusDamageMovesIds.push(this.helperService.stringExtract(moves.url));
        });
        
        currentPokemonMovesIds.forEach( (moves: any) => {

          if(specialDamageMovesIds.includes(moves)){
            this.isSpecial =  true;
            return;
          }
  
          if(physicalDamageMovesIds.includes(moves)){
            this.isPhysical =  true;
            return;
          }
  
          if(statusDamageMovesIds.includes(moves)){
            this.isStatus =  true;
            return;
          }
        })
      
      });
  }

}

