export interface Pokemon {
    next: any;
    previous: any;
    results: Pokemon[];
}

export interface PokemonAbilities {
    types: [];
}

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
    sprites: {back_default: any};
}


export interface Pokemons {
    count: number;
}



