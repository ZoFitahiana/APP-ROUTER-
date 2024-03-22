"use client"
import React, { useState, useEffect } from "react";
import { useUrl } from 'nextjs-current-url';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next.js - Coding Beauty',
    description: 'Next.js Tutorials by Coding Beauty',
};

interface Pokemon {
    name: string,
    height: number,
    weight: number,
    types: string[],
    order: number
}

export function usePokemon() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const { pathname } = useUrl() ?? {};
    const id = pathname ? pathname.substring(8) : "";
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemon({
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    types: data.types.map((type: { type: { name: string } }) => type.type.name),
                    order: data.order
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return pokemon;
}

export default function DetailOfPokemon() {
    const pokemon = usePokemon();
    const { pathname } = useUrl() ?? {};
    const id = pathname ? pathname.substring(8) : "";

    return (
        <div className="flex flex-wrap justify-center gap-6">
            {pokemon && (
                <div key={pokemon.name} className="card w-96 bg-base-100 shadow-xl image-full">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={pokemon.name} />
                    <div className="card-body">
                        <h2 className="card-title">{pokemon.name}</h2>
                        <p>ID: {id}</p>
                        <p>height: {pokemon.height}</p>
                        <p>weight: {pokemon.weight}</p>
                        <p>types: {pokemon.types.join(", ")}</p>
                        <p>order: {pokemon.order}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">
                                <a href="/client">Back</a>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
