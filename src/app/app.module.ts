import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonStatisticsComponent } from './components/pokemon-statistics/pokemon-statistics.component';
import { PokemonProfileComponent } from './components/pokemon-profile/pokemon-profile.component';
import { PokemonEvolutionComponent } from './components/pokemon-evolution/pokemon-evolution.component';
import { PokemonDamageComponent } from './components/pokemon-damage/pokemon-damage.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    HomeComponent,
    DetailsComponent,
    PokemonSearchComponent,
    PokemonStatisticsComponent,
    PokemonProfileComponent,
    PokemonEvolutionComponent,
    PokemonDamageComponent,
    ProductsComponent,
    CreateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'pokemons',
        component: PokemonListComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'create-product',
        component: CreateProductComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
