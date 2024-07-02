
export interface Pokemon {
    name: string;
    url:  string;
    id: number;
    height: number;
    weight: number;
    types: [];
    abilities: [];
    stats: [];
    ability: string;
    evolution: PokemonEvolution;
    sprites: {front_default: string};
    moves: [{url: string}];
    species: {name: string};
}

export interface Pokemons {
    count: number;
    next: any;
    previous: any;
    results: Pokemon[];
}

export interface PokemonAbilities {
    types: [];
}

export interface PokemonEvolution {
    id: number;
    chain: {evolves_to: [{ evolution_details: [{min_level:  number;}] }], species: {name: string} };
    minLevel: number;
}

export interface PokemonSpecie{
    id: number;
    evolution_chain: {url: string};
}

export interface PokemonDamage{
    id: number;
    moves: [{url: string}];
}