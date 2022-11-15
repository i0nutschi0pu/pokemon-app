export interface Pokemon {
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


