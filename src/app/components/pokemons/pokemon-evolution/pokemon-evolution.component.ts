import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonFilteredSearchService } from 'src/app/service/pokemon-filtered-search.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css']
})
export class PokemonEvolutionComponent implements OnInit {

  private pokemonEvolutionImg?: string;
  private currentSpecie?: string;
  private firstEvolutionSpecie?: string;
  private secondEvolutionSpecie?: string;

  evolutionLevel?: 
  {
    evolves_to: [
      {
        evolution_details: [
          { min_level: number; }
        ];
        evolves_to: [
          { species: { name: string; }; }
        ];
      }
    ];
    species: { name: string; };
  };

  noPossibleEvolution?: string;
  pokemonImg?: string;
  evolves_to?: string;


  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonFilteredSearchService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {

      this.pokemonService.getPokemonSpecie(this.helperService.getPokemonId(this.route.snapshot.paramMap.get('id')!)).subscribe(
        response => {
          this.getPokemonEvolution(response, this.helperService.getPokemonId(this.route.snapshot.paramMap.get('id')!));
        }
      );
  }

  getPokemonImg(id: number): string
  {
    return this.pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  getPokemonEvolution(id: number, pokemonId: number): void
  {
    let pokemonNameEvolutionId: number;
    let secondEvolutionSpecieId: number;
    let firstEvolutionSpecieId: number;

    this.pokemonService.getEvolutionDetails(id)
      .subscribe( (pokemonEvolution)  => {
        this.currentSpecie = pokemonEvolution.chain.species.name;

        pokemonEvolution.chain.evolves_to.forEach( (evolutionDetails: any) => {
          evolutionDetails.evolves_to.forEach( (evolvesToDetails: any) => { 

            pokemonNameEvolutionId = this.helperService.stringExtract(evolvesToDetails['species']['url']);
            secondEvolutionSpecieId = pokemonNameEvolutionId;
            this.secondEvolutionSpecie = evolvesToDetails['species']['name'];
          
          });

          // first evolution
          pokemonNameEvolutionId = this.helperService.stringExtract(evolutionDetails['species']['url']);
          this.firstEvolutionSpecie = evolutionDetails['species']['name'];
          firstEvolutionSpecieId = pokemonNameEvolutionId;
        });
        
        if(pokemonId === firstEvolutionSpecieId) {
          this.evolves_to = this.secondEvolutionSpecie;
          this.pokemonEvolutionImg = this.getPokemonImg(secondEvolutionSpecieId);
        }else if(pokemonId === secondEvolutionSpecieId){
          this.evolves_to = '';
          this.noPossibleEvolution = 'There is no possible evolution';
        }
        else{
          this.evolves_to = this.firstEvolutionSpecie;
          this.pokemonEvolutionImg = this.getPokemonImg(firstEvolutionSpecieId);
        }

        pokemonEvolution.chain.evolves_to.forEach( (items: {evolution_details: any }) => {
          items.evolution_details.forEach( (details: {min_level: any}) => {
            this.evolutionLevel = details.min_level;
          });
      });
     });
  }

}
