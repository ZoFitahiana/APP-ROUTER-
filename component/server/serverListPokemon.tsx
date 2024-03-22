import React from "react";

interface Pokemon {
    name: string,
    url: string
}

export default function PokemonList() {
    const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const pageNumber = 1;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(pageNumber - 1) * 50}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const pokemonsData: Pokemon[] = data.results.map((pokemon: any) => ({
                    name: pokemon.name,
                    url: pokemon.url
                }));
                setPokemons(pokemonsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-6">
            {pokemons.map(pokemon => (
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
        </div>
    );
}

function getIdFromUrl(url: string): string {
    return url.split("/").slice(-2, -1)[0];
}
