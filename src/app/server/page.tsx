import React from "react";
import SimpleSSRComponent from "../../../component/server/serverListPokemon";

interface Pokemon {
    name: string;
    url: string;
}

let pokemonData: Pokemon[] = [];

const fetchData = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        pokemonData = data.results;
        render();
    } catch (error) {
        console.error('Error fetching data:', error);
        pokemonData = [];
        render();
    }
};

const render = () => {
    forceUpdatePage && forceUpdatePage();
};
let forceUpdatePage: (() => void) | null = null;
export const setForceUpdatePage = (update: () => void) => {
    forceUpdatePage = update;
};

fetchData();

export default function Page() {
    return (
        <div>
            <SimpleSSRComponent pokemonData={pokemonData} />
        </div>
    );
}
