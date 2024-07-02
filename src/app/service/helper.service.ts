import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getPokemonId(param: string): number
  {
    return parseInt(param, 10);
  }

  stringExtract(url: string): number
  {
    return Number(url.split('/')[url.split('/').length - 2]);
  }
}
