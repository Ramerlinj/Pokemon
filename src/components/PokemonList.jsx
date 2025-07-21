
import { useState } from "react";
import usePokemon  from "../hooks/usePokemon"

const PokemonList = () => {


    const [search, setSearch] = useState('')
    const [numsPokemon, setNumsPokemon] = useState(1)
    const {pokemon, loading, error} = usePokemon(numsPokemon)
    
    const handleInput = (e) =>{
        setSearch(e.target.value)
    }
    const handleClick = () =>{
       setNumsPokemon((i) => i+1)
    }

    const filtered = pokemon.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search));


    return (
        <>
            <input type="text"
            placeholder="bulbasaur or 1"
            value={search}
            onChange={handleInput}
            className="border-1"
            
            />

            {loading && (
                <h2>Carcando</h2>
            )}
            {error && (
                <h2>No se ha encontrado el pokemon</h2>
            )}

           
            <div className="">
                {filtered.map((pokemon) => (
                    <>
                        <p key={pokemon.id}>{pokemon.name}</p>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
                    </>
                        ))}

                   {filtered.length === 0 && !loading && <p>No se encontraron Pokémon</p>}             
                    <button className="bg-amber-100 text-black w-10" onClick={handleClick}>Ver más</button>
                </div>
        </>
  );
};

export default PokemonList


