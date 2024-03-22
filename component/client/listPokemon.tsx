"use client"
import React, { useEffect, useState } from "react";

interface Pokemon {
    name: string,
    url: string
}

export function usePokemon(pageNumber: number) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(pageNumber - 1) * 50}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pageNumber]);

    return pokemons;
}

export default function PokemonList() {
    const [currentPage, setCurrentPage] = useState(1);
    const data = usePokemon(currentPage);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-6">
            {data.map(pokemon => (
                <div key={pokemon.name} className="card w-96 bg-base-100 shadow-xl image-full">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(pokemon.url)}.png`} alt={pokemon.name} />
                    <div className="card-body">
                        <h2 className="card-title">{pokemon.name}</h2>
                        <p>Pokemon number :  {getIdFromUrl(pokemon.url)}  🍳</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">
                                <a href={`/detail/${getIdFromUrl(pokemon.url)}`}>Details</a></button>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="mt-4 flex justify-between">
                <button onClick={prevPage} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>
                </button>
                <button onClick={nextPage} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function getIdFromUrl(url: string): string {
    return url.split("/").slice(-2, -1)[0];
}
