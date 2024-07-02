import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemons/pokemon-list/pokemon-list.component'; 
import { DetailsComponent } from './components/pokemons/details/details.component';
import { PokemonSearchComponent } from './components/pokemons/pokemon-search/pokemon-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonEvolutionComponent } from './components/pokemons/pokemon-evolution/pokemon-evolution.component';
import { PokemonDamageComponent } from './components/pokemons/pokemon-damage/pokemon-damage.component'; 
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './service/request-interceptor';
import { HasProductsGuard } from './guards/hasProducts.guards';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    DetailsComponent,
    PokemonSearchComponent,
    PokemonEvolutionComponent,
    PokemonDamageComponent,
    CreateProductComponent,
    ListProductsComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'pokemons',
        component: PokemonListComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      },
      {
        path: 'products',
        component: ListProductsComponent,
        canActivate: [HasProductsGuard]
      },
      {
        path: 'create-product',
        component: CreateProductComponent
      },
      {
        path: '',
        redirectTo: '/pokemons',
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
