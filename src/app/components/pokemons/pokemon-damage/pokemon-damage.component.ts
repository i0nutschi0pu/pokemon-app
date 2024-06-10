import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PokemonCRUDService } from 'src/app/pokemon-crud.service';
import { Pokemon } from 'src/app/pokemon.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-damage',
  templateUrl: './pokemon-damage.component.html',
  styleUrls: ['./pokemon-damage.component.css']
})
export class PokemonDamageComponent implements OnInit {

  pokemon!: Pokemon
  evolves_to!: string;
  moves!: [move: {url: string}];
  statusDamageMoves!: [{url: string}];
  physicalDamageMoves!: [{url: string}];
  specialDamageMoves!: [{url: string}];
  special!: string;
  physical!: string;
  status!: string;


  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonCRUDService,
  ) {}

  ngOnInit(): void {
     this.getPokemonMoves();
     this.getMovesForStatusDamageClass();
     this.getMovesForSpecialDamageClass();
    //  console.log(this.getMovesForSpecialDamageClassF());
    //  this.getMovesForSpecialDamageClassF().subscribe((r)=>console.log(r));
    //  this.getMovesForSpecialDamageClassF().subscribe((r)=> r);
    //  this.getarray();
    //  console.log(this.pokemonService.getTotalNumberOfPokemons());
  }


  getPokemonId(): number
  {
    return parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  getPokemonMovesF() 
  {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    var subject = new Subject<any>();
    let thingsArray: number[]=[];
    this.pokemonService.getPokemon(id)
    .subscribe( (pokemon) => { 

        pokemon.moves.forEach( (urls: any) => {
          // totalQuestions=moves.url;
          // console.log(totalQuestions);
          thingsArray.push(Number(urls.move.url.split('/')[urls.move.url.split('/').length - 2]));
          
      });
      subject.next(thingsArray);
    //  console.log(this.pokemon.moves);
   });
   
    
    return subject.asObservable();
  }

  getPokemonMoves() 
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.pokemonService.getPokemon(id)
      .subscribe( (pokemon) => { 
       this.pokemon = pokemon;

       pokemon.moves.forEach( (urls: any) => {
        // console.log(lists['species']['name']);
        // this.moves = urls.move.url;

        // this.moves.push(urls.move.url);

        // console.log(urls.move.url);
        // console.log(Number(urls.move.url.split('/')[urls.move.url.split('/').length - 2]));
      });

      //  console.log(this.pokemon.moves);
     });
  }

  getMovesForStatusDamageClass()
  {
      var subject = new Subject<any>();
      let thingsArray: number[]=[];
      this.pokemonService.getMovesForStatusDamageClass()
      .subscribe( (damage) => { 

        damage.moves.forEach( (moves: any) => {
          // totalQuestions=moves.url;
          // console.log(totalQuestions);
          thingsArray.push(Number(moves.url.split('/')[moves.url.split('/').length - 2]));
          
      });
      subject.next(thingsArray);
      //  console.log(this.pokemon.moves);
    });

    this.getPokemonMovesF().subscribe((r)=> 
      
        r.forEach( (moves: any) => {
          if(thingsArray.includes(moves)){
            this.status =  'status';
            return this.status;
          }
        })
      );
     
    return subject.asObservable();
  }

  getMovesForPhysicalDamageClass()
  {
    var subject = new Subject<any>();
    let thingsArray: number[]=[];
    this.pokemonService.getMovesForPhysicalDamageClass()
      .subscribe( (damage) => { 

        damage.moves.forEach( (moves: any) => {
          // totalQuestions=moves.url;
          // console.log(totalQuestions);
          thingsArray.push(Number(moves.url.split('/')[moves.url.split('/').length - 2]));
          
      });
      subject.next(thingsArray);
      //  console.log(this.pokemon.moves);
     });

     this.getPokemonMovesF().subscribe((r)=> 
      
        r.forEach( (moves: any) => {
          if(thingsArray.includes(moves)){
            this.physical =  'physical';
            console.log(this.physical);
            return this.physical;
          }
        })
      );
     
    return subject.asObservable();
  }

  // getMovesForSpecialDamageClass()
  // {
  //   let results =  this.pokemonService.getMovesForSpecialDamageClass()
  //     .subscribe( (damage) => { 

  //       damage.moves.forEach( (moves: any) => {
  //         // console.log(lists['species']['name']);
  //         this.moves = moves.url;

  //         // this.statusDamageMoves.push(moves.url);
  //         // console.log(urls.move.url);
  //         // console.log(Number(moves.url.split('/')[moves.url.split('/').length - 2]));
  //       });
  //     //  console.log(this.pokemon.moves);
  //    });
  //    return this.moves;
  // }

  getMovesForSpecialDamageClass()
  {
      var subject = new Subject<any>();
      let thingsArray: number[]=[];
      this.pokemonService.getMovesForSpecialDamageClass()
      .subscribe( (damage) => { 

          damage.moves.forEach( (moves: any) => {
            // totalQuestions=moves.url;
            // console.log(totalQuestions);
            thingsArray.push(Number(moves.url.split('/')[moves.url.split('/').length - 2]));
            
        });
        subject.next(thingsArray);
      
     });

      this.getPokemonMovesF().subscribe((r)=> 
      
        r.forEach( (moves: any) => {
          if(thingsArray.includes(moves)){
            this.special =  'special';
            return this.special;
          }
        })
      );
     
    return subject.asObservable();
  }

}
