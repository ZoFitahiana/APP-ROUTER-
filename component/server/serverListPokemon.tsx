import React from 'react';

interface Props {
    pokemonData: {
        name: string;
        url: string;
    }[];
}

export default function SimpleSSRComponent(props: Props) {
    const { pokemonData } = props;

    return (
        <div className="flex flex-wrap justify-center gap-6">
            {pokemonData.map(pokemon => (
                <div key={pokemon.name} className="card w-96 bg-base-100 shadow-xl image-full">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(pokemon.url)}.png`} alt={pokemon.name} />
                    <div className="card-body">
                        <h2 className="card-title">{pokemon.name}</h2>
                        <p>Pokemon number: {getIdFromUrl(pokemon.url)} 🍳</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">
                                <a href="#">Details</a>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon");
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        const pokemonData = jsonData.results;
        return {
            props: {
                pokemonData
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                pokemonData: []
            }
        };
    }
}

function getIdFromUrl(url: string) {
    return url.split("/").slice(-2, -1)[0];
}
