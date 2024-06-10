import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonEvolution } from '../../../pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonCRUDService } from '../../../pokemon-crud.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css']
})
export class PokemonEvolutionComponent implements OnInit {

  pokemonName!: string
  pokemonEvolution!: PokemonEvolution;
  pokemonImg!: string;
  pokemonEvolutionImg!: string;
  evolutionLevel!: 
  { evolves_to: 
    [ 
      { evolution_details: 
        [
          {min_level:  number;}
        ], 
        evolves_to: 
        [
          {species: {name: string}} 
        ]
      }
    ], 
    species: {name: string} 
  };
  evolves_to!: string | null;
  pokemonNameEvolution!: string;
  pokemonEvolutionId!: number;
  evolutionSpecieId!: number;
  currentSpecie!: string;
  firstEvolutionSpecie!: string;
  secondEvolutionSpecie!: string;
  noPossibleEvolution!: string;


  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonCRUDService,
  ) {}

  ngOnInit(): void {
   
      // this.getPokemonImg(this.getPokemonId());
      // this.getPokemonEvolutionId().subscribe((r) => {
      //   Number(r);
      //   this.getPokemonEvolution(r);
      //   }
      // )



      // this.getPokemonEvolutionId().subscribe((r) => 
      //   {
      //     Number(r);
      //     this.getPokemonEvolution(r).subscribe((response: any) => {
      //       this.getPokemonImg(response);
      //     })
          
      //   }
      // );
      // console.log(this.getPokemonId());

      this.pokemonService.getPokemonSpecie(this.getPokemonId()).subscribe(
        response => {
          this.getPokemonEvolution(response, this.getPokemonId());
        }
      );

      // this.pokemonService.getPokemonSpecie(this.getPokemonId()).subscribe(
      //   response => {
      //     this.getPokemonEvolution(response).subscribe((data: any) => {
      //       this.getPokemonImg(data);
      //     })
          
      //   }
      // );
      
    
    

    


    // this.getPokemonEvolutionId().subscribe((r)=>r);
    // console.log(Number(this.getPokemonEvolutionId().subscribe( (r)=> r ) ) );
    // console.log(parseInt(this.getPokemonEvolutionId().subscribe((r) => r) as unknown as string));

     
  }

  getPokemonId(): number
  {
    return parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  getPokemonEvolutionId()
  {
    var subject = new Subject<number>();
    let pokemonEvolutionId: number;

    this.pokemonService.getPokemonSpecie(this.getPokemonId()).subscribe(
      response => {
        // console.log(response);

        pokemonEvolutionId =  Number(response.evolution_chain.url.split('/')[response.evolution_chain.url.split('/').length - 2]);
        subject.next(pokemonEvolutionId);
      }
    );

    return subject.asObservable();
  }

  // getPokemonEvolutionId()
  // {
  //   var subject = new Subject<number>();
  //   let pokemonEvolutionId: number;

  //   this.pokemonService.getPokemonSpecie(this.getPokemonId()).subscribe(
  //     response => {

  //       pokemonEvolutionId =  Number(response.evolution_chain.url.split('/')[response.evolution_chain.url.split('/').length - 2]);
  //       subject.next(pokemonEvolutionId);
  //     }
  //   );

  //   return subject.asObservable();
  // }

  getPokemonImg(Id: number): any
  {

    var subject = new Subject<string>();
    let pokemonNameEvolution: string;

    this.pokemonService.getPokemon(Id).subscribe(
      response => {
        pokemonNameEvolution = response.name;
        subject.next(pokemonNameEvolution);
        // this.pokemonEvolution = pokemonEvolution;
        this.pokemonName = response.name;

        for (const [k, v] of Object.entries(response.sprites)) {
          if (k === 'front_default') {
            return this.pokemonImg = v;
          }

          
        }
      }
    );

    return subject.asObservable();
  }

  // getPokemonEvolution()
  // {
  //   this.pokemonService.getEvolutionDetails(this.getPokemonId())
  //     .subscribe( (pokemonEvolution) => { 

  //      this.pokemonEvolution = pokemonEvolution;
  //     // console.log(pokemon)
  //    });
  // }

  getPokemonEvolution(id: any, pokemonId: number): any
  {
    // var subject = new Subject<number>();
    let pokemonNameEvolutionId: number;
    let secondEvolutionSpecieId: number;
    let firstEvolutionSpecieId: number;

    let level = 1;
    this.pokemonService.getEvolutionDetails(id)
      .subscribe( (pokemonEvolution)  => {
        this.currentSpecie = pokemonEvolution.chain.species.name;
        // console.log(this.currentSpecie );

        pokemonEvolution.chain.evolves_to.forEach( (lists: any) => {
          lists.evolves_to.forEach( (evols: any) => { // second evolution
            // console.log(evols );
            pokemonNameEvolutionId = Number(evols['species']['url'].split('/')[evols['species']['url'].split('/').length - 2]);
            this.pokemonEvolutionImg = this.getPokemonImg(pokemonNameEvolutionId);
            secondEvolutionSpecieId = pokemonNameEvolutionId;
            // subject.next(pokemonNameEvolutionId);
            this.secondEvolutionSpecie = evols['species']['name'];
            // console.log(secondEvolutionSpecieId);
          
          });

          // first evolution
          pokemonNameEvolutionId =  Number(lists['species']['url'].split('/')[lists['species']['url'].split('/').length - 2]);
          this.pokemonEvolutionImg = this.getPokemonImg(pokemonNameEvolutionId)
          // subject.next(pokemonNameEvolutionId);
          this.firstEvolutionSpecie = lists['species']['name'];
          firstEvolutionSpecieId = pokemonNameEvolutionId;
          // console.log(firstEvolutionSpecieId);
        });

        // console.log(this.firstEvolutionSpecie );
        // console.log(this.secondEvolutionSpecie );
        
        if(pokemonId === firstEvolutionSpecieId) {
          this.evolves_to = this.secondEvolutionSpecie;
        }else if(pokemonId === secondEvolutionSpecieId){
          this.evolves_to = null;
          this.noPossibleEvolution = 'There is no evolution possible';
        }
        else{
          this.evolves_to = this.firstEvolutionSpecie;
        }

        // this.evolves_to = pokemonEvolution.chain.evolves_to.species.name;


        pokemonEvolution.chain.evolves_to.forEach( (items: {evolution_details: any, }) => {
          // console.log(items.evolution_details);
          items.evolution_details.forEach( (details: {min_level: any}) => {
            // console.log(details.min_level);
            this.evolutionLevel = details.min_level;
          });
      });
     });

    //  console.log(subject.asObservable());
  }

}
