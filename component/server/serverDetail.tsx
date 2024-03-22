"use client"
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Metadata } from 'next';

interface Pokemon {
    name: string,
    height: number,
    weight: number,
    types: string[],
    order: number
}

export const metadata: Metadata = {
    title: 'Next.js - Coding Beauty',
    description: 'Next.js Tutorials by Coding Beauty',
};

const DetailOfPokemon: NextPage<{ pokemon: Pokemon | null, id: string }> = ({ pokemon, id }) => {
    const router = useRouter();

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-wrap justify-center gap-6">
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
                        <button className="btn btn-primary" onClick={() => router.push('/client')}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemon: Pokemon = {
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type: { type: { name: string } }) => type.type.name),
            order: data.order
        };
        return { props: { pokemon, id } };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { props: { pokemon: null, id } };
    }
};

export default DetailOfPokemon;
