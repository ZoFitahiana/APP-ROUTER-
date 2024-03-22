import React from "react";
import PokemonList from "../../../component/server/serverListPokemon";

interface Pokemon {
    name: string;
    url: string;
}

interface ServerPageProps {
    pokemons: Pokemon[];
}

export default function ServerPage({ pokemons }: ServerPageProps) {
    return (
        <>
            <PokemonList pokemons={pokemons} />
        </>
    );
}
